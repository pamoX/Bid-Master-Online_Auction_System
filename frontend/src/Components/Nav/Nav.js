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
          {/* Assuming "/coooo" was a typo, removing it; replace if intentional */}
          <Link to="/login">Login</Link>
        </div>
      </nav>

      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <Link to="/BidDashboard" onClick={toggleSidebar}>
            <i className="fas fa-tachometer-alt"></i> Bid Dashboard
          </Link>
          <Link to="/BidFeedbackPage" onClick={toggleSidebar}>
            <i className="fas fa-comment"></i> Bid Feedback
          </Link>
          <Link to="/bid-now" onClick={toggleSidebar}>
            <i className="fas fa-gavel"></i> Bid Now
          </Link>
          <Link to="/inspection-panel" onClick={toggleSidebar}>
            <i className="fas fa-clipboard-check"></i> Inspection Panel
          </Link>
          <Link to="/shipping" onClick={toggleSidebar}>
            <i className="fas fa-truck"></i> Shipping
          </Link>
          <Link to="/bidder-profile" onClick={toggleSidebar}>
            <i className="fas fa-user"></i> Bidder Profile
          </Link>
          <Link to="/payment" onClick={toggleSidebar}>
            <i className="fas fa-credit-card"></i> Payment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;