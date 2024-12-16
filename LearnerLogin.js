import React, { useState } from 'react';
import { useNavigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Learner.css';
import './Transitions.css';

const LearnerLogin = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Dummy credentials
        if (email === 'kothasahithi15@gmail.com' && password === 'sahi') {
            onLogin();
        } else {
            setError('Invalid email or password!');
        }
    };

    return (
        <div className="login-container">
            <h1>Learner Login</h1>
            <form onSubmit={handleLogin}>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

const LearnerDashboard = () => {
    return (
        <>
            <header>
                <h1>UPSKILL</h1>
                <nav>
                    <a href="#">Home</a>
                    <a href="#">Courses</a>
                    <a href="#">Career Help</a>
                    <a href="#" className="sign-in">Sign In</a>
                </nav>
            </header>
            <div className="container">
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
                    <h3>Popular</h3>
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
        </>
    );
};

const Learner = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        navigate('/learner-dashboard');
    };

    return (
        <Routes>
            <Route
                path="/"
                element={<LearnerLogin onLogin={handleLoginSuccess} />}
            />
            <Route path="/learner-dashboard" element={<LearnerDashboard />} />
        </Routes>
    );
};

export default Learner;