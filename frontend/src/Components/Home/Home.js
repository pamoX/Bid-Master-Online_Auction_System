import React from 'react';
import './Home.css';
import Nav from '../Nav/Nav'; // Adjust the import path as needed

const HomePage = () => {
  // Example: Adding a simple click handler for the button
  const handleGetStarted = () => {
    alert('Welcome to BidMaster! Ready to start bidding?');
    // You could replace this with navigation or an API call in a real app
  };

  return (
    <div className="homepage">
      <Nav /><br/><br/><br/><br/>
      {/* Header Section */}
      <header className="header">
        <h1>BidMaster</h1>
        <p>Your Auction Mastery, Our Friendly Touch</p>
      </header>

      {/* Hero Section */}
      <section className="hero">
      <h2>Discover the Joy of Effortless Auctions</h2>
      <p>Unleash your bidding spirit! Dive into a world where exploring, bidding, and managing auctions is simple, serene, and delightfully seamless.</p>
        <button className="cta-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h3>Easy Bidding</h3>
          <p>Place bids effortlessly and track your progress.</p>
        </div>
        <div className="feature-card">
          <h3>Real-Time Updates</h3>
          <p>Stay informed with live auction updates.</p>
        </div>
        <div className="feature-card">
          <h3>Secure Transactions</h3>
          <p>Your payments are safe with us.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;