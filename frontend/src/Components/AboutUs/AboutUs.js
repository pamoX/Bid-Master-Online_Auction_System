import React from 'react';
import Nav from "../Nav/Nav";
import './AboutUs.css'; // Import the CSS file

function AboutUs() {
  return (
    <div className="container">
      <Nav />
      
      {/* Main Title and Tagline */}
      <div className="header">
        <br></br>
        <br></br>
        <br></br>
        <h1 className="title">About Us</h1>
        <p className="tagline">
          Welcome to BidMaster—your go-to spot for exciting auctions and unbeatable deals! 
          We are all about bringing buyers and sellers together in a fun, secure, and easy-to-use platform.
        </p>
      </div>

      {/* Content Sections */}
      <div className="content-wrapper">
        {/* Our Mission Section */}
        <section className="section">
          <h2 className="section-title">Our Mission</h2>
          <p className="section-text">
            At BidMaster, our mission is to build a trusted marketplace that empowers everyone. 
            Whether you are chasing rare finds, everyday items, or selling to the highest bidder, 
            we have got your back. We are here to help you bid smart, sell with confidence, and 
            enjoy the ride—because auctions should be accessible, enjoyable, and fair for all, 
            no matter what you are into.
          </p>
        </section>

        {/* Our Story Section */}
        <section className="section">
          <h2 className="section-title">Our Story</h2>
          <p className="section-text">
            Founded in 2025, we kicked off with a simple goal: to create a seamless and 
            thrilling online auction experience. Since then, we have grown into a vibrant, 
            community-driven platform that thrives on transparency, fairness, and innovation. 
            Our team—packed with tech enthusiasts, auction experts, and customer champs—delivers 
            a system loaded with real-time bidding, detailed item insights, and stellar support. 
            From collectibles to gadgets, furniture to fashion, we make every auction fast, fun, 
            and rewarding. Thanks for being part of our journey—let’s keep the excitement going!
          </p>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;