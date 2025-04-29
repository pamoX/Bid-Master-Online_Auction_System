import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./Components/Home/Home";
import Nav from "./Components/Nav/Nav";
import Footer from "./Components/Footer/Footer"
// Bidder profile
import BidderProfile from './Components/BidderProfile/BidderProfile';
import EditBidderProfile from './Components/BidderProfile/EditBidderProfile';
// Bidder ship
import BidShipProfile from './Components/BidShipUsers/BidShipProfile';
import BidShipUsersDetails from './Components/BidShipUsers/BidShipUsersDetails';
import BidShipSuccess from "./Components/BidShipUsers/BidShipSuccess";
// Bidder feedback
import BidFeedbackPage from './Components/BidFeedbackUsers/BidFeedbackPage';
// Bidder pay
import Checkout from './Components/Payment/Checkout.js';
import Success from './Components/Payment/Success.js';
import Cancel from './Components/Payment/Cancel.js';
// Bidder dashboard
import BidDashboard from './Components/BidDashboard/BidDashboard';
// BidNowBidder component
import BidNowBidder from './Components/BidNowBidder/BidNowBidder';

const Placeholder = ({ pageName }) => <h2>{pageName} Page (Under Construction)</h2>;

function App() {
  return (
    <div className="App">
      <Nav />
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainhome" element={<Home />} />

          {/* Bidder profile */}
          <Route path="/bidder-profile" element={<BidderProfile />} />
          <Route path="/edit-bidder-profile" element={<EditBidderProfile />} />
          <Route path="/BidderProfile" element={<BidderProfile />} />

          {/* Bidder ship details */}
          <Route path="/BidShipProfile" element={<BidShipProfile />} />
          <Route path="/bid-ship-users-details" element={<BidShipUsersDetails />} />
          <Route path="/bid-ship-success" element={<BidShipSuccess />} />
          <Route path="/shipping" element={<BidShipProfile />} />

          {/* Bid feedback details */}
          <Route path="/BidFeedbackPage" element={<BidFeedbackPage />} />

          {/* Payment */}
          <Route path="/payment" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />

          {/* Bidder dashboard */}
          <Route path="/BidDashboard" element={<BidDashboard />} />

          {/* BidNowBidder route */}
          <Route path="/bid-now/:itemId?" element={<BidNowBidder />} />

          <Route path="/about-us" element={<Placeholder pageName="About Us" />} />
          <Route path="/selling" element={<Placeholder pageName="Selling" />} />
          <Route path="/bidding" element={<Placeholder pageName="Bidding" />} />
          <Route path="/contact-us" element={<Placeholder pageName="Contact Us" />} />
          <Route path="/profile" element={<Placeholder pageName="Profile" />} />
          <Route path="/login" element={<Placeholder pageName="Login" />} />
          <Route path="/register-bidder" element={<Placeholder pageName="Register Bidder" />} />
          <Route path="/inspection-panel" element={<Placeholder pageName="Inspection Panel" />} />
          <Route path="/Shipping" element={<Placeholder pageName="Shipping" />} />
          <Route path="/logout" element={<Placeholder pageName="Logout" />} />
          <Route path="/terms" element={<Placeholder pageName="Terms" />} />
          <Route path="/privacy-policy" element={<Placeholder pageName="Privacy Policy" />} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </React.Fragment>
      <Footer></Footer>
    </div>
  );
}

export default App;