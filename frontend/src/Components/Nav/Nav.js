import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css"; // Import CSS file

const Nav = () => {
  const [auctionDropdown, setAuctionDropdown] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="logo">
        <Link to="/">
          <img src="/favicon.ico" alt="AuctionApp Logo" />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search auctions..." />
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about-us">About Us</Link>

        {/* Auction Dropdown */}
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
  );
};

export default Nav;