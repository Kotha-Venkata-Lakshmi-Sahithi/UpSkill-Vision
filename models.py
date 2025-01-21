# course_services/models.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
db = SQLAlchemy()

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.String(100), unique=True, nullable=False)
    course_title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    video_link = db.Column(db.String(255), nullable=True)
    pdf_link = db.Column(db.String(255), nullable=True)
    instructor_name = db.Column(db.String(100), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(50), nullable=False)

    resources = db.relationship('Resource', backref='course', lazy=True)

class Resource(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    resource_type = db.Column(db.String(50), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    course_id = db.Column(db.String(100), db.ForeignKey('course.course_id'), nullable=False)

    def __repr__(self):
        return f'<Resource {self.title}>'

# Additional models can be added here if needed
