import React from 'react';
import './BidShipSuccess.css';

const BidShipSuccess = () => {
  // Handler for the button (you can customize this)
  const handleShippingLogisticsClick = () => {
    alert('Navigating to Shipping and Logistics Details...');
    // Example: You can use React Router to navigate
    // history.push('/shipping-logistics');
  };

  return (
    <div className="bid-ship-success-container">
      <h1>We Recorded Your Details!</h1>
      <p>Happy Auctioning!</p>
      <button
        className="shipping-logistics-btn"
        onClick={handleShippingLogisticsClick}
      >
        Shipping and Logistics Details
      </button>
    </div>
  );
};

export default BidShipSuccess;