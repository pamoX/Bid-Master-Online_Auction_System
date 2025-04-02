import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ role, isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
   
      {/* Role-Based Sidebar Navigation */}
      {role === "sl" && (
        <>
          <Link to="/sellerDashboard">Seller Dashboard</Link>
          <Link to="/sellerManagement">Seller Management</Link>
          <Link to="/itemListing">Item Listing</Link>
          <Link to="/sellerReviews">Reviews and Ratings</Link>

        </>
      )}
      {role === "bid" && (
        <>
          <Link to="/bidderDashboard">Bidder Dashboard</Link>
          <Link to="/bidManagement">Bid Management</Link>
          <Link to="/shipping">Shipping</Link>
          <Link to="/payment">Payment</Link>
        </>
      )}
      {role === "ship" && (
        <>
          <Link to="/shippingDashboard">Shipping Dashboard</Link>
          <Link to="/manageShipping">Manage Shipping</Link>
          <Link to="/complaintManagement">Complaint Management</Link>
          <Link to="/asignShipment">Asign Shipment</Link>
        </>
      )}
      {role === "hr" && (
        <>
          <Link to="/employeeDashboard">Employee Management</Link>
          <Link to="/employeeReports">Employee Reports</Link>
          <Link to="/trackPerformance">Track Performance</Link>
          <Link to="/payroll">Payroll</Link>
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
