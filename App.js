// File: App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import InstructorLogin from './components/InstructorLogin';
import InstructorDashboard from './components/InstructorDashboard';
import SignUp from './components/SignUp'; // Import the SignUp component
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/instructor" element={<InstructorLogin />} />
                <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
                <Route path="/signup" element={<SignUp />} /> {/* Add this route */}
            </Routes>
        </Router>
    );
}

export default App;
