import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ role, isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <h3>Dashboard Navigation</h3>
      {/* Role-Based Sidebar Navigation */}
      {role === "sl" && (
        <>
          <Link to="/manage-products">Manage Products</Link>
          <Link to="/orders">View Orders</Link>
        </>
      )}
      {role === "bid" && (
        <>
          <Link to="/bids">Your Bids</Link>
          <Link to="/view-auctions">View Auctions</Link>
        </>
      )}
      {role === "ship" && (
        <>
          <Link to="/shipping-tasks">Shipping Tasks</Link>
          <Link to="/manage-shipping">Manage Shipping</Link>
        </>
      )}
      {role === "hr" && (
        <>
          <Link to="/employees">HR Management</Link>
          <Link to="/employee-reports">Employee Reports</Link>
        </>
      )}
      {role === "im" && (
        <>
          <Link to="/inspectionDashboard">Dashboard</Link>
          <Link to="/rejectItems">Reject Items</Link>
          <Link to="/biddingPage">Bidding</Link>
          <Link to="/inspectionReport">Inspection Report</Link>
        </>
      )}
    </div>
  );
}

export default Sidebar;
