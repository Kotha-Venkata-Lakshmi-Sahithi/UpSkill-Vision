import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import './SignUp.css';
import { useNavigate, useLocation } from 'react-router-dom';
import './Transitions.css';

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
    const [inProp, setInProp] = useState(true);
    const navigate = useNavigate();
    const location = useLocation(); // To track the current route

    useEffect(() => {
        // Check the current URL path to set the active tab based on the route
        const path = location.pathname;
        if (path.includes('learner')) {
            setUserType('learner');
        } else if (path.includes('manager')) {
            setUserType('manager');
        } else if (path.includes('hr-admin')) {
            setUserType('hr-admin');
        } else if (path.includes('instructor')) {
            setUserType('instructor');
        }
    }, [location]);

    const validatePassword = (pwd) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(pwd);
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
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
        // API request for signup
        try {
            const response = await fetch('http://127.0.0.1:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    full_name: `${firstName} ${lastName}`,
                    email,
                    password,
                    confirm_password: confirmPassword,
                    phone_number: mobile,
                    country,
                    role: userType,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess(result.message);
                setTimeout(() => {
                    if (userType === 'learner') {
                        navigate('/learner');
                    } else if (userType === 'instructor') {
                        navigate('/instructor');
                    } else if (userType === 'manager') {
                        navigate('/manager');
                    } else if (userType === 'hradmin') {
                        navigate('/hradmin');
                    }
                }, 2000);
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('An error occurred while signing up. Please try again.');
        }
    };

    return (
        <CSSTransition in={inProp} timeout={700} classNames="fade" unmountOnExit>
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
                            className={`tab ${userType === 'hradmin' ? 'active' : ''}`}
                            onClick={() => setUserType('hradmin')}
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
        </CSSTransition>
    );
};

export default SignUp;
