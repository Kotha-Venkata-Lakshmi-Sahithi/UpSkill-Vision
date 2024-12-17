import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './InstructorLogin.css';

function InstructorLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === 'kothasahithi15@gmail.com' && password === 'sahi') {
            navigate('/instructor-dashboard'); // Redirect to dashboard
        } else {
            alert('Invalid email or password!');
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h1>Instructor Login</h1>
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
        
                    <button type="submit">Login</button>
                </form>
                <div className="forgot-password-link">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
            </div>
        </div>
    );
}

export default InstructorLogin;
