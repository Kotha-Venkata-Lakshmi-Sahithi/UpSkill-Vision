import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [country, setCountry] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userType, setUserType] = useState('learner');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const validatePassword = (pwd) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(pwd);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

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

        if (!firstName || !lastName) {
            setError('First name and last name are required.');
            return;
        }

        setError('');
        setSuccess('Account created successfully! Redirecting...');

        setTimeout(() => {
            if (userType === 'learner') {
                navigate('/learner');
            } else if (userType === 'instructor') {
                navigate('/instructor');
            } else if (userType === 'manager') {
                navigate('/manager');
            } else if (userType === 'hr-admin') {
                navigate('/hr-admin');
            }
        }, 2000);
    };

    return (
        <div className="container">
            <div className="form-section">
                <h1>UpSkill Vision - Your Learning Path</h1>
                <p style={{ textAlign: 'center' }}>
                    Create a user account for further works or to access the courses
                </p>
                <div className="tab-container">
                    <button
                        className={`tab ${userType === 'learner' ? 'active' : ''}`}
                        onClick={() => setUserType('learner')}
                    >
                        LEARNER
                    </button>
                    <button
                        className={`tab ${userType === 'manager' ? 'active' : ''}`}
                        onClick={() => setUserType('manager')}
                    >
                        MANAGER
                    </button>
                    <button
                        className={`tab ${userType === 'hr-admin' ? 'active' : ''}`}
                        onClick={() => setUserType('hr-admin')}
                    >
                        HR ADMIN
                    </button>
                    <button
                        className={`tab ${userType === 'instructor' ? 'active' : ''}`}
                        onClick={() => setUserType('instructor')}
                    >
                        INSTRUCTOR
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
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
                    <input
                        type="tel"
                        placeholder="Mobile Number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                    <div className="remember-container">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <button type="submit" className="button">
                        Get Started
                    </button>
                    <div className="signin-link">
                        Already a user? <a href={`/${userType}`}>Sign in</a>
                    </div>
                </form>
            </div>
            <div className="image-section"></div>
        </div>
    );
};

export default SignUp;
