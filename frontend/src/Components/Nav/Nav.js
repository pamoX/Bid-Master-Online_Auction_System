import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const [auctionDropdown, setAuctionDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="nav-container">
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

          <div
            className="dropdown"
            onMouseEnter={() => setAuctionDropdown(true)}
            onMouseLeave={() => setAuctionDropdown(false)}
          >
            <button className="dropdown-btn">Auction</button>
            {auctionDropdown && (
              <div className="dropdown-content">
                <Link to="/selling">Selling</Link>
                <Link to="/bidding">Bidding</Link>
                <Link to="/shipping">Shipping</Link>
              </div>
            )}
          </div>

          <Link to="/contact-us">Contact Us</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>

      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <Link to="/seller-dashboard" onClick={toggleSidebar}>
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </Link>
          <Link to="/register-seller" onClick={toggleSidebar}>
            <i className="fas fa-user-plus"></i> Seller Registration
          </Link>
          <Link to="/bidding-page" onClick={toggleSidebar}>
            <i className="fas fa-gavel"></i> Bidding Page
          </Link>
          <Link to="/seller-profile" onClick={toggleSidebar}>
            <i className="fas fa-plus-circle"></i> Seller Profile
          </Link>
          <Link to="/inspection-report" onClick={toggleSidebar}>
            <i className="fas fa-clipboard-check"></i> Inspection Report
          </Link>
          <Link to="/logout" onClick={toggleSidebar}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;