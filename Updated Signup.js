import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const validatePassword = (pwd) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(pwd);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validatePassword(password)) {
            setError(
                'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.'
            );
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setError('');
        alert('Account created successfully!');
        
    };

    return (
        <div className="container">
            <div className="form-section">
                <h1>UpSkill Vision - Your Learning Path</h1>
                <p style={{ textAlign: 'center' }}>
                    Create a user account for further works or to access the courses
                </p>
                <div className="tab-container">
                    <button className="tab">LEARNER</button>
                    <button className="tab">MANAGER</button>
                    <button className="tab">HR ADMIN</button>
                    <button className="tab">INSTRUCTOR</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email address" required />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <input type="tel" placeholder="Mobile Number" required />
                    <input type="text" placeholder="Country" required />
                    <div className="remember-container">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="button">
                        Get Started
                    </button>
                    <div className="signin-link">
                        Already a user? <a href="/Home">Sign in</a>
                    </div>
                </form>
            </div>
            <div className="image-section"></div>
        </div>
    );
};

export default SignUp;
