import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./BidNowBidder.css";

const BidNowBidder = () => {
  const { itemId } = useParams();
  const [currentBid, setCurrentBid] = useState(0);
  const [startingPrice, setStartingPrice] = useState(100); // Default starting price
  const [bidInput, setBidInput] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [outbidAlert, setOutbidAlert] = useState(false);
  const [newBid, setNewBid] = useState(null);
  const [bidHistory, setBidHistory] = useState([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [auctionEnded, setAuctionEnded] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [itemDetails, setItemDetails] = useState({
    title: "Default Item",
    description: "This is a default item description",
    images: ["/BidImages/default.jpg"],
    currentPrice: 100,
    startingPrice: 100
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem('userId') || 'testuser';

  // Fetch highest bid and bid history
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!itemId) return;

        // Fetch current highest bid
        const bidResponse = await axios.get(`http://localhost:5000/api/bid-now/highest/${itemId}`);
        if (bidResponse.data && bidResponse.data.bidAmount) {
          setCurrentBid(bidResponse.data.bidAmount);
        }

        // Fetch bid history
        const historyResponse = await axios.get(`http://localhost:5000/api/bid-now/item/${itemId}`);
        setBidHistory(historyResponse.data);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load bid data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
    
    // Set up polling for bid updates
    const pollInterval = setInterval(fetchData, 5000); // Poll every 5 seconds
    return () => clearInterval(pollInterval);
  }, [itemId]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setAuctionEnded(true);
      checkWinStatus();
    }
  }, [timeLeft]);

  const checkWinStatus = async () => {
    try {
      if (!itemId) return;

      const response = await axios.get(`http://localhost:5000/api/bid-now/highest/${itemId}`);
      if (response.data && response.data.userId === currentUserId) {
        setHasWon(true);
      }
    } catch (err) {
      console.error("Error checking win status:", err);
    }
  };

  const placeBid = async () => {
    const bidValue = parseInt(bidInput);
    if (bidValue && bidValue > currentBid) {
      try {
        // Place bid in bid system
        const response = await axios.post('http://localhost:5000/api/bid-now', {
          itemId,
          userId: currentUserId,
          bidAmount: bidValue
        });

        setCurrentBid(bidValue);
        setConfirmation(true);
        setOutbidAlert(false);
        setBidInput("");
        
        // Update bid history
        setBidHistory(prev => [...prev, response.data]);

        // Clear confirmation after 3 seconds
        setTimeout(() => setConfirmation(false), 3000);
      } catch (err) {
        console.error("Error placing bid:", err);
        alert("Failed to place bid. Please try again.");
      }
    } else {
      alert("Please enter a bid higher than the current one!");
    }
  };

  const handlePayNow = () => {
    navigate("/payment");
  };

  // Format time remaining
  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}m ${seconds}s`;
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="BidNowBidderWrapper">
      <main className="BidNowBidderMain">
        <div className="BidNowBidderLeft">
          <h1>{itemDetails.title}</h1>
          <div className="BidNowBidderImageGallery">
            {itemDetails.images && itemDetails.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Item view ${index + 1}`}
                className="BidNowBidderZoomable"
              />
            ))}
          </div>
          <div className="BidNowBidderDescription">
            <h2>Description</h2>
            <p>{itemDetails.description}</p>
          </div>
          
          {/* Bid History Section */}
          <div className="BidNowBidderHistory">
            <h2>Auction History</h2>
            <div className="BidNowBidderHistoryList">
              {bidHistory.map((bid, index) => (
                <div 
                  key={index} 
                  className={`BidNowBidderHistoryItem ${bid.userId === currentUserId ? 'your-bid' : ''}`}
                >
                  <span className="bid-amount">${bid.bidAmount}</span>
                  <span className="bid-user">{bid.userId === currentUserId ? 'You' : 'User ' + bid.userId.slice(-4)}</span>
                  <span className="bid-time">{new Date(bid.bidTimestamp).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="BidNowBidderRight">
          <div className="BidNowBidderTimer">
            <h2>Time Remaining</h2>
            <p>{formatTimeLeft()}</p>
          </div>

          <div className="BidNowBidderPrices">
            <div className="starting-price">
              <h3>Starting Price</h3>
              <p>${startingPrice}</p>
            </div>
            <div className="current-bid">
              <h3>Current Highest Bid</h3>
              <p>${currentBid}</p>
            </div>
          </div>

          {!auctionEnded && (
            <div className="BidNowBidderBidForm">
              <input
                type="number"
                value={bidInput}
                onChange={(e) => setBidInput(e.target.value)}
                placeholder="Enter your bid"
                min={currentBid + 1}
              />
              <button onClick={placeBid}>Place Bid</button>
            </div>
          )}

          {/* Notifications */}
          {confirmation && (
            <div className="BidNowBidderNotification success">
              <p>Your bid of ${bidInput} has been placed successfully!</p>
            </div>
          )}

          {outbidAlert && (
            <div className="BidNowBidderNotification warning">
              <p>You have been outbid! Current highest bid: ${newBid}</p>
            </div>
          )}

          {/* Auction End Status */}
          {auctionEnded && (
            <div className={`BidNowBidderEndStatus ${hasWon ? 'success' : 'failure'}`}>
              {hasWon ? (
                <>
                  <h2>🎉 Congratulations!</h2>
                  <p>You won the auction with a bid of ${currentBid}!</p>
                  <button className="pay-now-button" onClick={handlePayNow}>
                    Proceed to Payment
                  </button>
                </>
              ) : (
                <>
                  <h2>Auction Ended</h2>
                  <p>Sorry, you didn't win this auction. Better luck next time!</p>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BidNowBidder;