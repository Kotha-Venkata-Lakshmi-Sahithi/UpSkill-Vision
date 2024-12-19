import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///D:/m/database.db'  # Your database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


# Database Models
class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
    role = db.relationship('Role', backref=db.backref('users', lazy=True))


class PasswordReset(db.Model):
    __tablename__ = 'password_resets'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), db.ForeignKey('users.email'), nullable=False)
    otp = db.Column(db.String(6), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user = db.relationship('User', backref=db.backref('password_resets', lazy=True))


# Routes for SignUp, Login, etc.
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    required_fields = ['full_name', 'email', 'password', 'confirm_password', 'phone_number', 'country', 'role']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"error": f"{field.replace('_', ' ').capitalize()} is required."}), 400

    password = data['password']
    confirm_password = data['confirm_password']
    if password != confirm_password:
        return jsonify({"error": "Passwords do not match!"}), 400

    if len(password) < 8 or not any(c.isupper() for c in password) or not any(c.isdigit() for c in password) or not any(
            c in '!@#$%^&*()_+' for c in password):
        return jsonify({
                           "error": "Password must be at least 8 characters long, contain a digit, a special character, and an uppercase letter."}), 400

    phone_number = data['phone_number']
    if len(phone_number) != 10 or not phone_number.isdigit():
        return jsonify({"error": "Phone number must be exactly 10 digits."}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email is already registered."}), 400

    hashed_password = generate_password_hash(password)

    role_name = data.get('role', 'Learner')  # Default role is "Learner"
    role = Role.query.filter_by(name=role_name).first()
    if not role:
        return jsonify({"error": f"Role '{role_name}' not found!"}), 400

    new_user = User(
        full_name=data['full_name'],
        email=data['email'],
        password=hashed_password,
        phone_number=data['phone_number'],
        country=data['country'],
        role_id=role.id
    )

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "Signup successful, waiting for HR approval..."}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


# Forgot Password Route
@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')

    # Check if the email exists
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "Email not found."}), 400

    # Generate OTP (6-digit)
    otp = str(random.randint(100000, 999999))

    # Store OTP in database
    otp_record = PasswordReset.query.filter_by(email=email).first()
    if otp_record:
        otp_record.otp = otp
        otp_record.created_at = datetime.utcnow()
    else:
        otp_record = PasswordReset(email=email, otp=otp)
        db.session.add(otp_record)

    try:
        db.session.commit()

        # Send OTP to user's email
        send_otp_email(email, otp)
        return jsonify({"message": "OTP sent to your email address."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


def send_otp_email(to_email, otp):
    smtp_server = "smtp.office365.com"
    port = 587
    sender_email = "bl.en.u4cse22276@bl.students.amrita.edu"  # Your Outlook email
    password = "ogeodhti"  # Your Outlook email password

    subject = "Your OTP for Password Reset"
    body = f"Your OTP for password reset is: {otp}"

    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = to_email
    message["Subject"] = subject
    message.attach(MIMEText(body, "plain"))

    try:
        # Connect to SMTP server
        server = smtplib.SMTP(smtp_server, port)
        server.starttls()  # Secure the connection
        server.login(sender_email, password)
        server.sendmail(sender_email, to_email, message.as_string())
        print("OTP sent successfully!")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        server.quit()


# Reset Password Route
@app.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data.get('email')
    otp = data.get('otp')
    new_password = data.get('new_password')
    confirm_new_password = data.get('confirm_new_password')

    # Check if passwords match
    if new_password != confirm_new_password:
        return jsonify({"error": "Passwords do not match!"}), 400

    # Validate password strength
    if len(new_password) < 8 or not any(c.isupper() for c in new_password) or not any(
            c.isdigit() for c in new_password) or not any(c in '!@#$%^&*()_+' for c in new_password):
        return jsonify({
                           "error": "Password must be at least 8 characters long, contain a digit, a special character, and an uppercase letter."}), 400

    # Find OTP record in database
    otp_record = PasswordReset.query.filter_by(email=email, otp=otp).first()
    if not otp_record:
        return jsonify({"error": "Invalid OTP."}), 400

    # Check if OTP is expired (valid for 5 minutes)
    if datetime.utcnow() - otp_record.created_at > timedelta(minutes=5):
        return jsonify({"error": "OTP has expired."}), 400

    # Hash new password
    hashed_password = generate_password_hash(new_password)

    # Update user password
    user = User.query.filter_by(email=email).first()
    user.password = hashed_password

    try:
        db.session.commit()
        return jsonify({"message": "Password has been reset successfully!"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


# Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Check if user exists
    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):  # Check if password matches
        role = user.role.name  # Get the user's role name

        # Based on the role, send back a response
        if role == "Learner":
            return jsonify({"message": "Login successful", "redirect": "/learner_dashboard"})
        elif role == "Manager":
            return jsonify({"message": "Login successful", "redirect": "/manager_dashboard"})
        elif role == "Instructor":
            return jsonify({"message": "Login successful", "redirect": "/instructor_dashboard"})
        elif role == "HR":
            return jsonify({"message": "Login successful", "redirect": "/hr_dashboard"})
    else:
        return jsonify({"error": "Invalid email or password."}), 400





if __name__ == '__main__':
    app.run(debug=True)