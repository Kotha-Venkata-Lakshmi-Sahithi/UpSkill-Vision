import React from 'react';
import './Learner.css';

const LearnerDashboard = () => {
    return (
        <div className="dashboard-container">
            <header>
                <h1>UPSKILL</h1>
                <nav>
                    <a href="#">Home</a>
                    <a href="#">Courses</a>
                    <a href="#">Career Help</a>
                    <a href="#">Sign Out</a>
                </nav>
            </header>
            <div className="dashboard-content">
                <div className="welcome">
                    <h2>Welcome Back, Learner</h2>
                </div>
                <div className="cards">
                    <div className="card">
                        <h3>Live Courses</h3>
                        <button>View</button>
                    </div>
                    <div className="card">
                        <h3>Recorded Courses</h3>
                        <button>View</button>
                    </div>
                    <div className="card">
                        <h3>Notes & Books</h3>
                        <button>View</button>
                    </div>
                </div>
                <div className="popular">
                    <h3>Popular Courses</h3>
                </div>
                <div className="courses">
                    <div className="course">
                        <img src="https://via.placeholder.com/150" alt="Database Management Systems" />
                        <p>Database Management Systems</p>
                        <p>By UPSKILL</p>
                    </div>
                    <div className="course">
                        <img src="https://via.placeholder.com/150" alt="Operating Systems" />
                        <p>Operating Systems</p>
                        <p>By UPSKILL</p>
                    </div>
                    <div className="course">
                        <img src="https://via.placeholder.com/150" alt="Machine Learning" />
                        <p>Machine Learning</p>
                        <p>By UPSKILL</p>
                    </div>
                    <div className="course">
                        <img src="https://via.placeholder.com/150" alt="Artificial Intelligence" />
                        <p>Artificial Intelligence</p>
                        <p>By UPSKILL</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearnerDashboard;
