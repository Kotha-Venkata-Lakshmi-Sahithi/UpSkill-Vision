import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Login';
import InstructorLogin from './components/InstructorLogin';
import InstructorDashboard from './components/InstructorDashboard';
import SignUp from './components/SignUp';
import ManagerLogin from './components/ManagerLogin';
import ManagerDashboard from './components/ManagerDashboard';
// Correct named import for ManagerLogin

import LearnerLogin from './components/LearnerLogin';
import LearnerDashboard from './components/LearnerDashboard';
import HRLogin from './components/HRLogin';
import HRDashboard from './components/HRDashboard';
import ForgotPassword from './components/ForgotPassword';
import './App.css';

  function App() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Example GET request to fetch initial data from your backend
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/data');
                setData(response.data);
            } catch (err) {
                setError('Failed to fetch data');
            }
        };

        fetchData();
    }, []);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/instructor/*" element={<InstructorLogin />} />
                <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/manager" element={<ManagerLogin />} />
                <Route path="/manager-dashboard" element={<ManagerDashboard />} />               
                <Route path="/learner" element={<LearnerLogin />} />
                <Route path="/learner-dashboard" element={<LearnerDashboard />} />
                <Route path="/hr/*" element={<HRLogin />} />
                <Route path="/hr-dashboard" element={<HRDashboard />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
        </Router>
    );
}

export default App;
