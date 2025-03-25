import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes along with Route
import './App.css';
import Home from './Components/Home/Home';
import ContactUs from './Components/ContactUs/ContactUs';
import SellerDashboard from './Components/SellerDash/SellerDashboard';
import SellerRegistration from './Components/SellerRegistration/SellerRegistration';
import SellerProfile from './Components/SellerProfile/SellerProfile';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<ContactUs />} />
         <Route path="/dashboard" element={<SellerDashboard />} />
         <Route path="/register-seller" element={<SellerRegistration />} />
         <Route path="/seller-profile" element={<SellerProfile />} />
         
      </Routes>
    </div>
  );
}

export default App;