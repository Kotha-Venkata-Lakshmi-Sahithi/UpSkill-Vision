import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Login';
import InstructorLogin from './components/InstructorLogin';
import InstructorDashboard from './components/InstructorDashboard';
import SignUp from './components/SignUp';
import { ManagerLogin, ManagerDashboard } from './components/Manager'; // Import Manager components
import LearnerLogin from './components/LearnerLogin'; // Import Learner Login
import LearnerDashboard from './components/LearnerDashboard'; // Import Learner Dashboar // Import HR Admin Login
import HRAdminDashboard from './components/HrAdmin'; // Import HR Admin Dashboard
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
                <Route path="/learner" element={<LearnerLogin />} /> {/* Add Learner Login */}
                <Route path="/learner-dashboard" element={<LearnerDashboard />} /> {/* Add Learner Dashboard */}
            
                <Route path="/hradmin-dashboard" element={<HRAdminDashboard />} /> {/* Add HR Admin Dashboard */}
            </Routes>
        </Router>
    );
}

export default App;
