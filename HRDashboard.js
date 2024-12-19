import React from 'react';
import './HrAdmin.css';

const HRDashboard = () => {
    return (
        <div className="dashboard-container">
            <header>
                <h1>HR Dashboard</h1>
                <nav>
                    <a href="/hr-dashboard">Home</a>
                    <a href="/employee-management">Employee Management</a>
                    <a href="/recruitment">Recruitment</a>
                    <a href="/payroll">Payroll</a>
                    <a href="/settings">Settings</a>
                    <a href="/logout">Logout</a>
                </nav>
            </header>
            <div className="dashboard-content">
                <h2>Welcome Back, HR Manager</h2>
                <p>Manage employee details, recruitment, and payroll here.</p>
            </div>
        </div>
    );
};

export default HRDashboard;
