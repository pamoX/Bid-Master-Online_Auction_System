import React, { useState, useEffect } from "react";
import "./BidDashboard.css";
import { useNavigate } from "react-router-dom";

const BidDashboard = () => {
  const navigate = useNavigate();

  // image paths for the carousel
  const images = [
    "/images/Bidder/shutterstock.jpg",
    "/images/Bidder/antiq.jpg",
    "/images/Bidder/tele.jpg",
    "/images/Bidder/antifurnit.jpg",
    "/images/Bidder/watch.jpg",
  ];

  // state to control which image is shown
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1);

  // state to hold time and date
  const [currentTime, setCurrentTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
    period: "AM",
    date: "",
  });

  // auction status
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);

  // current bid value
  const [currentBid, setCurrentBid] = useState(250);

  // checkbox state
  const [isConfirmed, setIsConfirmed] = useState(false);

  // history of previous bids
  const [bidHistory, setBidHistory] = useState([
    { bidder: "Lahiruni", amount: 200, time: "10:00 AM" },
    { bidder: "Durangi", amount: 220, time: "10:05 AM" },
    { bidder: "Poornima", amount: 250, time: "10:10 AM" },
  ]);

  // automatic image transition every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setImageOpacity(0);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setImageOpacity(1);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  // updates the clock and checks auction end time
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      hours = String(hours).padStart(2, "0");
      const date = now.toLocaleDateString();

      setCurrentTime({ hours, minutes, seconds, period, date });

      const endTime = new Date("April 1, 2025 12:00:00").getTime();
      if (now.getTime() > endTime) {
        setIsAuctionEnded(true);
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // when button is clicked, show alert and go to items page
  const handleSeeAuctionsClick = () => {
    alert("Redirecting to auctions page...");
    navigate("/items-gallery");
  };

  return (
    <div className="biddashboard-bid-dashboard-container">
      <header className="biddashboard-bid-header">
        <h1>Welcome To BidMaster</h1>
        <div className="biddashboard-bid-bidder-info">
          welcome back <span>Poornima</span>
        </div>
      </header>

      <div className="biddashboard-bid-main-content">
        {/* image carousel */}
        <div className="biddashboard-bid-image-carousel">
          <img
            src={images[currentImageIndex]}
            alt="Auction Item"
            style={{ opacity: imageOpacity, transition: "opacity 0.5s ease" }}
          />
          <div className="biddashboard-bid-image-nav">
            {images.map((_, index) => (
              <span
                key={index}
                className={`biddashboard-bid-dot ${index === currentImageIndex ? "biddashboard-bid-active" : ""}`}
                onClick={() => {
                  setImageOpacity(0);
                  setTimeout(() => {
                    setCurrentImageIndex(index);
                    setImageOpacity(1);
                  }, 500);
                }}
              />
            ))}
          </div>
        </div>

        {/* auction details */}
        <div className="biddashboard-bid-auction-details">
          <h2>Current Auction: Vintage Watch</h2>
          <p>
            a rare vintage watch from 1960, preserved in perfect condition. this exquisite timepiece features a classic design, intricate craftsmanship, and a timeless appeal. ideal for collectors and watch enthusiasts.
          </p>
          <p>
            current bid: <span>${currentBid.toFixed(2)}</span>
          </p>
          <p>
            status: <span>{isAuctionEnded ? "ended" : "live"}</span>
          </p>
        </div>

        {/* bid interaction section */}
        <div className="biddashboard-bid-bid-section-advanced">
          {/* current date and time */}
          <div className="biddashboard-bid-countdown">
            <h3>Current Date & Time</h3>
            <div className="biddashboard-digital-clock">
              <div className="biddashboard-time">
                <span>{currentTime.hours}</span>:<span>{currentTime.minutes}</span>:
                <span>{currentTime.seconds}</span> <span>{currentTime.period}</span>
              </div>
              <div className="biddashboard-date">{currentTime.date}</div>
            </div>
          </div>

          {/* bid confirmation and button */}
          <div className="biddashboard-bid-input">
            <div className="biddashboard-bid-bidder-test">
              <input
                type="checkbox"
                id="bid-confirm"
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
                disabled={isAuctionEnded}
              />
              <label htmlFor="bid-confirm">i confirm</label>
            </div>
            <button
              className="biddashboard-bid-bid-now-btn"
              onClick={handleSeeAuctionsClick}
            >
              see auctions
            </button>
            {/*
            // Button to go to BidFeedbackUsers page (uncomment to use)
            // <button
            //   className="biddashboard-bid-feedback-btn"
            //   onClick={() => navigate('/bid-feedback')}
            // >
            //   Go to Bid Feedback
            // </button>
            */}
          </div>

          {/* bid history list */}
          <div className="biddashboard-bid-history">
            <h3>Bid History</h3>
            <ul>
              {bidHistory.map((bid, index) => (
                <li key={index}>
                  {bid.bidder} bid ${bid.amount.toFixed(2)} at {bid.time}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidDashboard;
