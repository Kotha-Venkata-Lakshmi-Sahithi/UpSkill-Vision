import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Login';
import InstructorLogin from './components/InstructorLogin';
import InstructorDashboard from './components/InstructorDashboard';
import SignUp from './components/SignUp';
import { ManagerLogin, ManagerDashboard } from './components/Manager';
import LearnerLogin from './components/LearnerLogin';
import LearnerDashboard from './components/LearnerDashboard';
import  HRLogin from './components/HRLogin'; 
import  HRDashboard from './components/HRDashboard';
import ForgotPassword from './components/ForgotPassword';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/instructor" element={<InstructorLogin />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/manager" element={<ManagerLogin />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/learner" element={<LearnerLogin />} />
        <Route path="/learner-dashboard" element={<LearnerDashboard />} />
        <Route path="/HR" element={<HRLogin />} />
        <Route path="/hr-dashboard" element={<HRDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
