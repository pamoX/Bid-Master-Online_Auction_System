import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes along with Route
import './App.css';
import Home from './Components/Home/Home';
import ContactUs from './Components/ContactUs/ContactUs';
import SellerDashboard from './Components/SellerDash/SellerDashboard';
import SellerRegistration from './Components/SellerRegistration/SellerRegistration';
import SellerProfile from './Components/SellerProfile/SellerProfile';
import AboutUs from './Components/AboutUs/AboutUs';
import Terms from './Components/Terms/Terms';
import SellerListings from './Components/SellerListing/SellerListing';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs/>}/>
         <Route path="/seller-dashboard" element={<SellerDashboard />} />
         <Route path="/register-seller" element={<SellerRegistration />} />
         <Route path="/seller-profile" element={<SellerProfile />} />
         <Route path="/terms" element={<Terms />} />
         <Route path="/seller-registration" element={<SellerRegistration />} />
         <Route path="/seller-listing" element={<SellerListings/>}/>
         
      </Routes>
    </div>
  );
}

export default App;