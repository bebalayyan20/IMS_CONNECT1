import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Home.css'; // Custom CSS for styling

function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // You can add any logic to clear authentication data if necessary
        navigate("/"); // Redirect to login page
    };

    return (
        <div className="home-container">
            {/* Navigation Bar */}
            <nav className="navbar">
                <h2 className="navbar-title">IMS Connect</h2>
                <div className="navbar-links">
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    <Link to="/submit-idea" className="nav-link">Submit Ideas</Link>
                    <Link to="/view-ideas" className="nav-link">View Ideas</Link>
                    <Link to="/profile" className="nav-link">My Profile</Link>
                    <Link to="/rewards" className="nav-link">My Rewards</Link>
                    <button className="nav-link logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="main-content">
                <h1>Welcome to IMS Connect</h1>
                <p className="welcome-text">
                    Explore your dashboard, submit and view creative ideas, and manage your profile and rewards.
                </p>
            </div>
        </div>
    );
}

export default Home;
