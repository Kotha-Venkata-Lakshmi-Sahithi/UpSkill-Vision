import React from 'react';
import './InstructorDashboard.css';

function InstructorDashboard() {
    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <a href="#">Dashboard</a>
                <a href="#">Course Management</a>
                <a href="#">Participant Progress</a>
                <a href="#">Notifications</a>
                <a href="#">Settings</a>
                <a href="#">Logout</a>
            </div>
            <div className="main-content">
                <h2>Welcome Back, Instructor!</h2>
                <div className="cards">
                    <div className="card">
                        <h3>Create New Course</h3>
                        <button>Start →</button>
                    </div>
                    <div className="card">
                        <h3>Manage Existing Courses</h3>
                        <button>View →</button>
                    </div>
                    <div className="card">
                        <h3>Monitor Learner Progress</h3>
                        <button>Track →</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InstructorDashboard;
