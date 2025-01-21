from flask import Blueprint, request, jsonify
from models import db, User, Role, PasswordReset
from werkzeug.security import generate_password_hash
import random
import smtplib
from werkzeug.security import check_password_hash
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
from sqlalchemy import func
from sqlalchemy import func
from flask import current_app


auth_routes = Blueprint('auth_routes', __name__)


@auth_routes.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    required_fields = ['full_name', 'email', 'password', 'confirm_password', 'phone_number', 'country', 'role']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"error": f"{field.replace('_', ' ').capitalize()} is required."}), 400

    # Additional validation logic here...

    hashed_password = generate_password_hash(data['password'])
    role = Role.query.filter_by(name=data.get('role', 'Learner')).first()
    if not role:
        return jsonify({"error": "Role not found!"}), 400

    new_user = User(
        full_name=data['full_name'],
        email=data['email'],
        password=hashed_password,
        phone_number=data['phone_number'],
        country=data['country'],
        role_id=role.id,
        is_approved=False
    )

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "Signup successful, waiting for HR approval..."}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@auth_routes.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')


    if not email:
        return jsonify({"error": "Email is required."}), 400

    # Check if the email exists
    user = User.query.filter(func.lower(User.email) == func.lower(email)).first()
    if not user:
        return jsonify({"error": "Email not found."}), 400

    # Generate OTP (6-digit)
    otp = str(random.randint(100000, 999999))

    # Store OTP in database
    otp_record = PasswordReset.query.filter_by(email=user.email).first()
    if otp_record:
        otp_record.otp = otp
        otp_record.created_at = datetime.utcnow()
        otp_record.is_verified = False
    else:
        otp_record = PasswordReset(email=user.email, otp=otp)
        db.session.add(otp_record)

    try:
        db.session.commit()

        # Send OTP to user's email
        send_otp_email(user.email, otp)
        return jsonify({"message": "OTP sent to your email address."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# Function to Send OTP Email
def send_otp_email(to_email, otp):
    subject = "Your OTP for Password Reset"
    body = f"Your OTP for password reset is: {otp}"

    message = MIMEMultipart()
    message["From"] = current_app.config['MAIL_USERNAME']
    message["To"] = to_email
    message["Subject"] = subject
    message.attach(MIMEText(body, "plain"))

    try:
        # Connect to SMTP server
        server = smtplib.SMTP(current_app.config['MAIL_SERVER'], current_app.config['MAIL_PORT'])
        server.starttls()  # Secure the connection
        server.login(current_app.config['MAIL_USERNAME'], current_app.config['MAIL_PASSWORD'])
        server.sendmail(current_app.config['MAIL_USERNAME'], to_email, message.as_string())
        print("OTP sent successfully!")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        server.quit()

# Reset Password Route
@auth_routes.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data.get('email')
    otp = data.get('otp')
    new_password = data.get('new_password')
    confirm_new_password = data.get('confirm_new_password')

    # Check if all required fields are present
    if not all([email, otp, new_password, confirm_new_password]):
        return jsonify({"error": "All fields are required."}), 400

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

    # Check if OTP is expired (valid for 10 minutes)
    if (datetime.utcnow() - otp_record.created_at) > timedelta(minutes=10):
        return jsonify({"error": "OTP expired."}), 400

    # Verify OTP
    if otp_record.is_verified:
        return jsonify({"error": "OTP already used."}), 400

    # Reset password
    user = User.query.filter_by(email=email).first()
    if user:
        user.password = generate_password_hash(new_password)
        otp_record.is_verified = True

        try:
            db.session.commit()
            return jsonify({"message": "Password reset successful."}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    else:
        return jsonify({"error": "User not found."}), 404

@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required."}), 400

    # Check if user exists
    user = User.query.filter(func.lower(User.email) == func.lower(email)).first()

    if user and check_password_hash(user.password, password):  # Check if password matches
        # Check if user is approved
        if not user.is_approved:
            return jsonify({"error": "Your account is awaiting approval from HR."}), 403

        role = user.role.name  # Get the user's role name

        # Redirect to the correct dashboard based on the role
        if role == "Learner":
            return jsonify({"message": "Login successful", "user_id": user.id, "redirect": "/learner_dashboard"})
        elif role == "Manager":
            return jsonify({"message": "Login successful","user_id": user.id,  "redirect": "/manager_dashboard"})
        elif role == "Instructor":
            return jsonify({"message": "Login successful","user_id": user.id,  "redirect": "/instructor_dashboard"})
        elif role == "HR":
            return jsonify({"message": "Login successful", "user_id": user.id, "redirect": "/hr_dashboard"})
    else:
        return jsonify({"error": "Invalid email or password."}), 400

@auth_routes.route('/approve_user', methods=['POST'])
def approve_user():
    # For testing, manually accept a 'role' parameter from the request body
    data = request.get_json()
    
    # Check if the 'role' field in the request is 'HR' (bypassing actual session or JWT)
    role = data.get('role')
    
    if role != 'HR':
        return jsonify({"error": "You must have the 'HR' role to approve or reject users."}), 403
    
    user_id = data.get('user_id')
    action = data.get('action')
    
    if not user_id or not action:
        return jsonify({"error": "user_id and action are required."}), 400
    
    if action not in ['approve', 'reject']:
        return jsonify({"error": "Action must be either 'approve' or 'reject'."}), 400
    
    user = User.query.get(user_id)
    
    if user:
        # Update the user's approval status based on the action
        if action == 'approve':
            user.is_approved = True
            db.session.commit()
            return jsonify({"message": f"User {user.full_name} approved successfully."}), 200
        elif action == 'reject':
            user.is_approved = False
            db.session.commit()
            return jsonify({"message": f"User {user.full_name} rejected successfully."}), 200
    else:
        return jsonify({"error": "User not found."}), 404
    
@auth_routes.route('/pending_users', methods=['POST'])
def get_pending_users():
    data = request.get_json()

    # Check if the role is provided in the request and ensure it's 'HR'
    if not data.get('role') or data['role'] != 'HR':
        return jsonify({"error": "You must have the 'HR' role to view pending users."}), 403

    # Query users who are not approved yet (is_approved = False)
    pending_users = User.query.filter_by(is_approved=False).all()

    # If no pending users found
    if not pending_users:
        return jsonify({"message": "No pending users for approval."}), 200

    # Prepare the response data with user details
    users_data = []
    for user in pending_users:
        users_data.append({
            "user_id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "phone_number": user.phone_number,
            "country": user.country,
            "role": user.role.name,
        })

    return jsonify({"pending_users": users_data}), 200

@auth_routes.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = [
        {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "role": user.role.name
        }
        for user in users
    ]
    return jsonify(user_list), 200
    
