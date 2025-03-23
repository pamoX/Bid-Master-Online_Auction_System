import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes along with Route
import './App.css';
import Home from './Components/Home/Home';
import ContactUs from './Components/ContactUs/ContactUs';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </div>
  );
}

export default App;