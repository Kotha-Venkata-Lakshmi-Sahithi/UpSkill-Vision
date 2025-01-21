import requests
from flask import Blueprint, jsonify, request
from datetime import datetime, timedelta
from models import Course, Resource, db
from flask_mail import Message
from extensions import mail

course_routes = Blueprint('course_routes', __name__)

AUTH_SERVICE_URL = 'http://localhost:5001'  # Replace with the actual URL of auth_service

@course_routes.route('/api/courses/create', methods=['POST'])
def create_course():
    data = request.get_json()
    required_fields = ['course_id', 'course_title', 'description', 'instructor_name', 'start_date', 'status']

    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"error": f"{field.replace('_', ' ').capitalize()} is required."}), 400

    if Course.query.filter_by(course_id=data['course_id']).first():
        return jsonify({"error": "Course ID already exists."}), 400

    try:
        start_date = datetime.strptime(data['start_date'], '%Y-%m-%d').date()
    except ValueError:
        return jsonify({"error": "Invalid start date format. Use YYYY-MM-DD."}), 400

    try:
        duration_weeks = int(data.get('duration_weeks', 4))
    except ValueError:
        return jsonify({"error": "Duration weeks must be a valid integer."}), 400

    end_date = start_date + timedelta(weeks=duration_weeks)

    new_course = Course(
        course_id=data['course_id'],
        course_title=data['course_title'],
        description=data['description'],
        video_link=data.get('video_link'),
        pdf_link=data.get('pdf_link'),
        instructor_name=data['instructor_name'],
        start_date=start_date,
        end_date=end_date,
        status=data['status']
    )

    try:
        db.session.add(new_course)
        resources = []
        if 'video_link' in data and data['video_link']:
            resources.append(
                Resource(
                    title=f"{data['course_title']} Video",
                    resource_type="Video",
                    url=data['video_link'],
                    course_id=data['course_id']
                )
            )
        if 'pdf_link' in data and data['pdf_link']:
            resources.append(
                Resource(
                    title=f"{data['course_title']} PDF",
                    resource_type="PDF",
                    url=data['pdf_link'],
                    course_id=data['course_id']
                )
            )

        db.session.add_all(resources)
        db.session.commit()

        if data['status'] == 'Published':
            # Fetch users from auth service
            response = requests.get(f'{AUTH_SERVICE_URL}/api/users')
            if response.status_code != 200:
                return jsonify({"error": "Failed to fetch user data from auth service."}), 500

            users = response.json()
            recipient_emails = [user['email'] for user in users if 'email' in user]
            send_course_notification(recipient_emails, new_course)

        return jsonify({"message": f"Course {'published' if data['status'] == 'Published' else 'saved as draft'} successfully!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

def send_course_notification(emails, course):
    subject = f"New Course Published: {course.course_title}"
    body = f"""
    A new course titled "{course.course_title}" has been published.
    Start Date: {course.start_date}
    End Date: {course.end_date}

    Check it out on the platform!
    """
    
    for email in emails:
        try:
            msg = Message(subject, sender='bl.en.u4cse22276@bl.students.amrita.edu', recipients=[email])
            msg.body = body
            mail.send(msg)
        except Exception as e:
            print(f"Error sending email to {email}: {str(e)}")
