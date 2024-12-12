import React from 'react';
import './SignUp.css';

const SignUp = () => {
    return (
        <div className="container">
            <div className="form-section">
                <h1>UpSkill Vision - Your Learning Path</h1>
                <p style={{ textAlign: 'center' }}>Create a user account for further works or to access the courses</p>
                <div className="tab-container">
                    <button className="tab">LEARNER</button>
                    <button className="tab">MANAGER</button>
                    <button className="tab">HR ADMIN</button>
                    <button className="tab">INSTRUCTOR</button>
                </div>
                <form>
                    <input type="email" placeholder="Email address" required />
                    <input type="password" placeholder="Password" required />
                    <input type="password" placeholder="Confirm Password" required />
                    <input type="tel" placeholder="Mobile Number" required />
                    <input type="text" placeholder="Country" required />
                    <div className="remember-container">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <button type="submit" className="button">Get Started</button>
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
