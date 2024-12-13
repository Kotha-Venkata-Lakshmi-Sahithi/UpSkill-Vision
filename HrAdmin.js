import React, { useState } from "react";
import "./HrAdmin.css";

const Sidebar = ({ onNavigate }) => {
  return (
    <div className="sidebar">
      <div className="logo">LOGO</div>
      <a href="#" className="highlight" onClick={() => onNavigate("login")}>HR Admin</a>
      <a href="#" onClick={() => onNavigate("dashboard")}>Training Process</a>
      <a href="#">Reports</a>
      <a href="#">Roles</a>
      <a href="#">Permissions</a>
      <a href="#">Logout</a>
    </div>
  );
};

const Header = () => {
  return (
    <div className="header">
      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">Career Help</a>
        <a href="#">About Us</a>
      </div>
    </div>
  );
};

const Card = ({ title }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <button>View →</button>
    </div>
  );
};

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "kothasahithi15@gmail.com" && password === "sahi") {
      onLogin(true);
    } else {
      alert("Invalid email or password");
    }
  };
  return (
    <div className="login-container">
      <h2>HR Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="main-content">
      <Header />
      <h2>Welcome Back Admin!</h2>
      <div className="cards">
        <Card title="Manage User" />
        <Card title="Monitor Training" />
        <Card title="Configure Permission" />
      </div>
    </div>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleLogin = (status) => {
    setIsLoggedIn(status);
    if (status) {
      setCurrentPage("dashboard");
    }
  };

  const handleNavigate = (page) => {
    if (page === "login") {
      setIsLoggedIn(false);
      setCurrentPage("login");
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <div className="app">
      <Sidebar onNavigate={handleNavigate} />
      {currentPage === "login" && !isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default App;
