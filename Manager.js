import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Manager.css';

const ManagerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Dummy validation
        if (email === 'kothasahithi15@gmail.com' && password === 'sahi') {
            navigate('/manager-dashboard');
        } else {
            setError('Invalid email or password!');
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

const ManagerDashboard = () => {
    return (
        <div className="dashboard">
            <div className="sidebar">
                <div className="logo">UPSKILL</div>
                <a href="#">Dashboard</a>
                <a href="#">Team Performance</a>
                <a href="#">User Management</a>
                <a href="#">Notifications</a>
                <a href="#">Settings</a>
                <a href="#">Logout</a>
            </div>
            <div className="main-content">
                <div className="header">
                    <div className="nav-links">
                        <a href="#">Home</a>
                        <a href="#">Career Help</a>
                        <a href="#">About Us</a>
                    </div>
                </div>
                <h2>Welcome Back Manager</h2>
                <div className="cards">
                    <div className="card">
                        <h3>Team Performance</h3>
                        <button>View &rarr;</button>
                    </div>
                    <div className="card">
                        <h3>Manage Users</h3>
                        <button>Manage &rarr;</button>
                    </div>
                    <div className="card">
                        <h3>Generate Reports</h3>
                        <button>Generate &rarr;</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { ManagerLogin, ManagerDashboard };


