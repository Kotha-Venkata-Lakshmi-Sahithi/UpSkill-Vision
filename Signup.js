import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
        navigate('/instructor'); 
    };

    return (
        <div className="container">
            <div className="form-section">
                <h1>Create Your Account</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email Address" required />
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
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
