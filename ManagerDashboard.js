import React from 'react';
import './Manager.css';

const ManagerDashboard = () => {
    return (
        <div className="dashboard">
            <div className="sidebar">
                <div className="logo">UPSKILL</div>
                <a href="#">Dashboard</a>
                <a href="#">Team Performance</a>
                <a href="#">User Management</a>
                <a href="#">Notifications</a>
                <a href="#">Settings</a>
                <a href="#">Logout</a>
            </div>
            <div className="main-content">
                <h2>Welcome Back, Manager</h2>
                <div className="cards">
                    <div className="card">
                        <h3>Team Performance</h3>
                        <button>View &rarr;</button>
                    </div>
                    <div className="card">
                        <h3>Manage Users</h3>
                        <button>Manage &rarr;</button>
                    </div>
                    <div className="card">
                        <h3>Generate Reports</h3>
                        <button>Generate &rarr;</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;
