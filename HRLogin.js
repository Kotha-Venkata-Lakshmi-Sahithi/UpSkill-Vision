import React, { useState } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import './HrAdmin.css';

const HRLogin = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
                navigate('/hr-dashboard');
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
            <h1>HR Login</h1>
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <div className="forgot-password-link">
                <Link to="/forgot-password">Forgot Password?</Link>
            </div>
        </div>
    );
};

const HRDashboard = () => {
    return (
        <div className="dashboard">
            <h1>HR Dashboard</h1>
            <p>Welcome to your dashboard!</p>
        </div>
    );
};

const HR = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        navigate('/hr-dashboard');
    };

    return (
        <Routes>
            <Route
                path="/"
                element={<HRLogin onLogin={handleLoginSuccess} />}
            />
            <Route path="/hr-dashboard" element={<HRDashboard />} />
        </Routes>
    );
};

export default HR;