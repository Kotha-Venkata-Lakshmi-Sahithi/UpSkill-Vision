import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)


db_dir = 'D:/f' 


if not os.path.exists(db_dir):
    os.makedirs(db_dir)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(db_dir, 'database.db')  
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

def initialize_database():
    """
    Initialize the database and pre-populate roles if they don't exist.
    """
    with app.app_context():
       
        db.create_all()

        roles = ['Learner', 'HR', 'Manager', 'Instructor']
        for role_name in roles:
            if not Role.query.filter_by(name=role_name).first():
                db.session.add(Role(name=role_name))

        try:
            db.session.commit()  
            print("Database initialized successfully with roles and tables.")
        except Exception as e:
            db.session.rollback()
            print(f"An error occurred while initializing the database: {e}")

if __name__ == "__main__":
    initialize_database()
