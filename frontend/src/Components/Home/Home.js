import React, { useState, useEffect } from 'react';
import './Home.css';
import Nav from '../Nav/Nav'; // Adjust the import path as needed

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds for demo

  const auctionImages = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1505691938895-48d05119c283?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  ];

  const handleGetStarted = () => {
    alert('Welcome to BidMaster! Ready to start bidding?');
  };

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % auctionImages.length);
    }, 5000);
    return () => clearInterval(imageInterval);
  }, [auctionImages.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 3600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleNextImage = () => setCurrentImageIndex((prev) => (prev + 1) % auctionImages.length);
  const handlePrevImage = () => setCurrentImageIndex((prev) => prev === 0 ? auctionImages.length - 1 : prev - 1);

  return (
    <div className="homepage">
      <Nav />
      <br/><br/><br/><br/>
      {/* Header Section */}
      <header className="header">
        <h1 className="header-title">BidMaster</h1>
        <p className="header-subtitle">Your Auction Mastery, Our Friendly Touch</p>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h2 className="hero-title">Discover the Joy of Effortless Auctions</h2>
        <div className="auction-showcase">
          <button className="carousel-btn prev" onClick={handlePrevImage}>❮</button>
          <div className="image-container">
            <img 
              src={auctionImages[currentImageIndex]} 
              alt={`Auction item ${currentImageIndex + 1}`} 
              className="carousel-image"
            />
            <div className="bid-overlay">
              <div className="countdown">
                <span>Time Left: </span>
                <span className="timer">{formatTime(timeLeft)}</span>
              </div>
              <button className="bid-now">Bid Now</button>
            </div>
          </div>
          <button className="carousel-btn next" onClick={handleNextImage}>❯</button>
          <div className="carousel-dots">
            {auctionImages.map((_, index) => (
              <span 
                key={index}
                className={`dot ${currentImageIndex === index ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
        <p className="hero-text">Unleash your bidding spirit! Dive into a world where exploring, bidding, and managing auctions is simple, serene, and delightfully seamless.</p>
        <button className="cta-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="features">
        {[
          { title: 'Easy Bidding', desc: 'Place bids effortlessly and track your progress.' },
          { title: 'Real-Time Updates', desc: 'Stay informed with live auction updates.' },
          { title: 'Secure Transactions', desc: 'Your payments are safe with us.' },
        ].map((feature, index) => (
          <div key={index} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;