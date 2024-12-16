import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HrAdmin.css';

// HR Login Component
const HRLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setIsAnimating(true);

        setTimeout(() => {
            if (email === 'admin@example.com' && password === 'password123') {
                navigate('/hr_dashboard');  
            } else {
                setError('Invalid email or password!');
                setIsAnimating(false);
            }
        }, 500);
    };

    return (
        <div className={`login-container ${isAnimating ? 'fade-out' : 'fade-in'}`}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default HRLogin;
