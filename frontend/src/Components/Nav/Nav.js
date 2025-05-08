import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import Sidebar from "../Sidebar/Sidebar";
import NotificationBell from "../NotificationBell/NotificationBell";

function Nav() {
  const [notifications, setNotifications] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username;

  // Fetch notifications - memoized to avoid eslint warning
  const fetchNotifications = useCallback(async () => {
    if (!username) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/notifications/${username}`);
      setNotifications(res.data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  }, [username]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div>
      {/* Top Navbar */}
      <nav className="navbar">
        {/* Logo */}
        <div className="logo">
          <NavLink to="/home">
            <img src="/favicon.ico" alt="AuctionApp Logo" className="logo-img" />
          </NavLink>
        </div>

       

        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search auctions..." />
          <button className="search-btn">Search</button>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          <NavLink to="/home" activeClassName="active">Home</NavLink>
          <NavLink to="/aboutUs" activeClassName="active">About Us</NavLink>
          <NavLink to="/contactUs" activeClassName="active">Contact Us</NavLink>

          {!user ? (
            <NavLink to="/login" className="login-btn">Login</NavLink>
          ) : (
            <>
              <NavLink to="/profile" activeClassName="active">Profile</NavLink>
              <NotificationBell username={username} fetchNotifications={fetchNotifications} />
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </nav>

      {/* Sidebar */}
      <Sidebar role={user ? user.username.split("_")[0] : "guest"} isOpen={isSidebarOpen} />
    </div>
  );
}

export default Nav;
