import React, { useState } from 'react';
import { useNavigate, BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Manager.css';

const ManagerLogin = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Successful login
                onLogin();
            } else {
                // Error response from the backend
                setError(data.message || 'Invalid email or password!');
            }
        } catch (error) {
            // Network or server error
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h1>Manager Login</h1>
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
                <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            </form>
            <div className="forgot-password-link">
                <Link to="/forgot-password">Forgot Password?</Link>
            </div>
        </div>
    );
};

const ManagerDashboard = () => {
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
                    <h2>Welcome Back, Manager</h2>
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

const Manager = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        navigate('/manager-dashboard')
    };

    return (
        <Routes>
            <Route
                path="/"
                element={<ManagerLogin onLogin={handleLoginSuccess} />}
            />
            <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        </Routes>
    );
};

export default Manager;
