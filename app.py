# course_services/app.py
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from models import db, Course, Resource  # Import models
from extensions import mail
from course_routes import course_routes  # Import routes

# Initialize the Flask app
app = Flask(__name__)

# Ensure the 'db' directory exists
db_dir = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'db')
if not os.path.exists(db_dir):
    os.makedirs(db_dir)

# App configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(db_dir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAIL_SERVER'] = 'smtp.office365.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'bl.en.u4cse22276@bl.students.amrita.edu'  # Replace with your email
app.config['MAIL_PASSWORD'] = 'ogeodhti'  # Replace with your email password
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

# Initialize extensions
db.init_app(app)
mail = Mail(app)

# Register the blueprint for course routes
app.register_blueprint(course_routes)

# Create tables if they don't exist
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(port=5002)
