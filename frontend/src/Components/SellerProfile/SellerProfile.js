import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import './SellerProfile.css';
import axios from 'axios';

const SellerProfile = () => {
  const [sellerData, setSellerData] = useState({
    name: 'Lakshi Sewwandi',
    email: 'lakshi@gmail.com',
    phone: '0769325412',
    address: '65/4, Maharagama, Lane Street',
    paymentMethod: 'PayPal: lakshi@gmail.com',
  });

  const [salesData, setSalesData] = useState({
    totalSales: 0,
    successfulAuctions: 0,
    pendingPayments: 0,
    earnings: { daily: 0, monthly: 0, yearly: 0 },
  });

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [timeFilter, setTimeFilter] = useState('monthly');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...sellerData });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [liveBids, setLiveBids] = useState([]); // New state for live bids
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSellerData();
    fetchSalesData();
    fetchReviews();
    setupWebSocket(); // Initialize WebSocket for live bids

    // Cleanup WebSocket on component unmount
    return () => {
      if (window.ws) {
        window.ws.close();
      }
    };
  }, [timeFilter]);

  const fetchSellerData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/seller/profile');
      setSellerData(response.data);
      setFormData(response.data);
    } catch (error) {
      setMessage('Error fetching profile data');
    } finally {
      setLoading(false);
    }
  };

  const fetchSalesData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/seller/sales?filter=${timeFilter}`);
      setSalesData(response.data);
    } catch (error) {
      setMessage('Error fetching sales data');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/seller/reviews');
      setReviews(response.data);
      const avgRating = response.data.reduce((acc, review) => acc + review.rating, 0) / response.data.length;
      setAverageRating(avgRating || 0);
    } catch (error) {
      setMessage('Error fetching reviews');
    } finally {
      setLoading(false);
    }
  };

  // Initialize WebSocket for live bids
  const setupWebSocket = () => {
    const ws = new WebSocket('ws://your-websocket-url/seller/bids'); // Replace with your WebSocket URL
    window.ws = ws;

    ws.onopen = () => {
      console.log('WebSocket connected');
      // Optionally send seller ID to subscribe to their bids
      ws.send(JSON.stringify({ sellerId: sellerData._id })); // Adjust based on your API
    };

    ws.onmessage = (event) => {
      const bidData = JSON.parse(event.data);
      setLiveBids((prevBids) => {
        const updatedBids = [...prevBids.filter((bid) => bid.itemId !== bidData.itemId), bidData];
        return updatedBids.sort((a, b) => b.bidAmount - a.bidAmount); // Sort by highest bid
      });
    };

    ws.onerror = (error) => {
      setMessage('Error connecting to live bids');
      console.error(error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      // Optionally attempt to reconnect
      setTimeout(setupWebSocket, 5000);
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put('/api/seller/profile', formData);
      setSellerData({ ...formData });
      setIsEditing(false);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await axios.put('/api/seller/password', passwordData);
      setMessage('Password updated successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage('Error updating password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="seller-profile-page">
      <Nav />
      <br /><br/><br/><br/>
      <h1>Seller Profile</h1>
      {loading && <p className="loading">Loading...</p>}
      {message && <p className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</p>}

      <div className="dashboard-grid">
        {/* Live Bids Section */}
        <div className="live-bids-container grid-item embossed-card">
          <h2>Live Bids</h2>
          {liveBids.length > 0 ? (
            <div className="bids-list">
              {liveBids.map((bid) => (
                <div key={bid.itemId} className="bid-item">
                  <p><strong>Item:</strong> {bid.itemName}</p>
                  <p><strong>Current Bid:</strong> ${bid.bidAmount.toLocaleString()}</p>
                  <p><strong>Bidder:</strong> {bid.bidderName}</p>
                  <p><strong>Time:</strong> {new Date(bid.bidTime).toLocaleTimeString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-bids">No live bids currently</p>
          )}
        </div>

        {/* Sales Overview */}
        <div className="sales-container grid-item embossed-card">
          <h2>Sales Overview</h2>
          <div className="time-filter">
            {['daily', 'monthly', 'yearly'].map((filter) => (
              <button
                key={filter}
                className={timeFilter === filter ? 'active' : ''}
                onClick={() => setTimeFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
          <div className="sales-stats">
            <p><strong>Total Sales:</strong> ${salesData.totalSales.toLocaleString()}</p>
            <p><strong>Auctions:</strong> {salesData.successfulAuctions.toLocaleString()}</p>
            <p><strong>Pending:</strong> ${salesData.pendingPayments.toLocaleString()}</p>
            <p><strong>Earnings:</strong> ${salesData.earnings[timeFilter].toLocaleString()}</p>
          </div>
        </div>

        {/* Profile Information */}
        <div className="profile-container grid-item embossed-card">
          <h2>Your Details</h2>
          {!isEditing ? (
            <div className="profile-display">
              <p><strong>Name:</strong> {sellerData.name}</p>
              <p><strong>Email:</strong> {sellerData.email}</p>
              <p><strong>Phone:</strong> {sellerData.phone}</p>
              <p><strong>Address:</strong> {sellerData.address}</p>
              <p><strong>Payment:</strong> {sellerData.paymentMethod}</p>
              <button onClick={() => setIsEditing(true)} disabled={loading}>
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSaveChanges} className="profile-form">
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea name="address" value={formData.address} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Payment</label>
                <input type="text" name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} required />
              </div>
              <div className="form-buttons">
                <button type="submit" disabled={loading}>Save</button>
                <button type="button" onClick={() => setIsEditing(false)} disabled={loading}>Cancel</button>
              </div>
            </form>
          )}
        </div>

        {/* Ratings and Reviews */}
        <div className="reviews-container grid-item embossed-card">
          <h2>Your Reputation</h2>
          <p className="rating-summary">
            <strong>Rating:</strong> {averageRating.toFixed(1)} / 5 ({reviews.length})
          </p>
          <div className="reviews-list">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="review-item">
                  <p><strong>{review.buyerName}</strong> - {review.rating}/5 ★</p>
                  <p>{review.comment}</p>
                  <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p className="no-reviews">No reviews yet</p>
            )}
          </div>
        </div>

        {/* Password Section */}
        <div className="password-container grid-item embossed-card">
          <h2>Change Password</h2>
          <form onSubmit={handlePasswordSubmit} className="password-form">
            <div className="form-group">
              <label>Current</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="form-group">
              <label>New</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button type="submit" disabled={loading}>Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;