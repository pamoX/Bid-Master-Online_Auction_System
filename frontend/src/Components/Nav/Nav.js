// frontend/src/Components/Nav.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    // Add logout logic here (e.g., clear auth token)
    navigate("/logout");
    toggleSidebar();
  };

  return (
    <div className="nav-container">
      {/* Upper Navbar */}
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img src="/favicon.ico" alt="AuctionApp Logo" />
          </Link>
        </div>

        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>

        <div className="search-bar">
          <input type="text" placeholder="Search auctions..." />
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about-us">About Us</Link>

          <Link to="/contact-us">Contact Us</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <Link to="/dashboard" onClick={toggleSidebar}>
            Dashboard
          </Link>
          <Link
            to={{ pathname: "/add-report", state: { showForm: true } }}
            onClick={toggleSidebar}
          >
            Add report
          </Link>
          <Link to="/flagged-items" onClick={toggleSidebar}>
            Reports Dashboard
          </Link>
          <Link to="/reject-items" onClick={toggleSidebar}>
            Reject Items
          </Link>
          <Link to="/inspection-report" onClick={toggleSidebar}>
            Inspection Report...
          </Link>
          <button onClick={handleLogout} className="sidebar-btn">
            LogOut...
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;

