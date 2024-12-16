from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///D:/f/database.db'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)


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

    if len(password) < 8 or not any(c.isupper() for c in password) or not any(c.isdigit() for c in password) or not any(c in '!@#$%^&*()_+' for c in password):
        return jsonify({"error": "Password must be at least 8 characters long, contain a digit, a special character, and an uppercase letter."}), 400

    
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
        # Add other roles here
        else:
            return jsonify({"message": "Role not found", "redirect": "/error"})
    else:
        return jsonify({"message": "Invalid email or password"}), 401


@app.route('/get_users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = [
        {
            'id': user.id,
            'full_name': user.full_name,
            'email': user.email,
            'phone_number': user.phone_number,
            'country': user.country,
            'role_id': user.role_id,
            'role': user.role.name
        }
        for user in users
    ]
    return jsonify(user_list)


@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "OK"}), 200

@app.route('/hr')
def hr_dashboard():
    return render_template('dashboard.html') 

if __name__ == "__main__":
    app.run(debug=True)
