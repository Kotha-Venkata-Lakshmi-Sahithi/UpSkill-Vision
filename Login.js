import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container fade-in">
      <div className="form-section">
        <h1>UpSkill Vision - Your Learning Path</h1>
        <p>Login</p>
        <div className="role-buttons">
          <button onClick={() => navigate('/learner')}>LEARNER</button>
          <button onClick={() => navigate('/manager')}>MANAGER</button>
          <button onClick={() => navigate('/hr')}>HR ADMIN</button>
          <button onClick={() => navigate('/instructor')}>INSTRUCTOR</button>
        </div>
        <div className="signin">
          Don't have an account? <a href="/signup">Sign Up</a>
        </div>
      </div>
      <div className="image-section">
        <img
          src="https://www.talintinternational.com/wp-content/uploads/2023/07/Employee-Skill-Training-Upskilling-Reskilling-and-Beyond-social-image-1.png"
          alt="Upskilling"
        />
      </div>
    </div>
  );
};

export default Home;
