import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import './SellerProfile.css';

const SellerProfile = () => {
  // Sample initial seller data (corrected address syntax)
  const [sellerData, setSellerData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Auction Lane, Bid City, BC 45678', // Fixed typo
    paymentMethod: 'PayPal: john.doe@paypal.com',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...sellerData });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  // Simulate fetching data from backend (replace with actual API call)
  useEffect(() => {
    // Example: fetchSellerProfile().then(data => setSellerData(data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Simulate API call to update seller profile
    setSellerData({ ...formData });
    setIsEditing(false);
    setMessage('Profile updated successfully!');
    // In a real app: updateSellerProfile(formData).then(() => setMessage(...));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('New password and confirmation do not match.');
      return;
    }
    // Simulate API call to change password
    setMessage('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    // In a real app: changePassword(passwordData).then(() => setMessage(...));
  };

  return (
    <div className="seller-profile-page">
        <Nav/>
      <h1>Seller Profile</h1>
      <p>View and update your seller information below.</p>

      {/* Profile Information */}
      <div className="profile-container">
        <h2>Your Details</h2>
        {message && <p className="message">{message}</p>}
        
        {!isEditing ? (
          <div className="profile-display">
            <p><strong>Name:</strong> {sellerData.name}</p>
            <p><strong>Email:</strong> {sellerData.email}</p>
            <p><strong>Phone:</strong> {sellerData.phone}</p>
            <p><strong>Address:</strong> {sellerData.address}</p>
            <p><strong>Payment Method:</strong> {sellerData.paymentMethod}</p>
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          </div>
        ) : (
          <form onSubmit={handleSaveChanges} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method</label>
              <input
                type="text"
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                placeholder="e.g., PayPal: email@example.com"
                required
              />
            </div>
            <div className="form-buttons">
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>

      {/* Change Password Section */}
      <div className="password-container">
        <h2>Change Password</h2>
        <form onSubmit={handlePasswordSubmit} className="password-form">
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default SellerProfile;