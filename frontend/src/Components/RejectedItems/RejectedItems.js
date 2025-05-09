import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav';
import './RejectedItems.css';

function RejectedItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state || {};
  const [reason, setReason] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rejectedItems, setRejectedItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Log the rejection reason
    console.log(`Item ${item?.id} rejected with reason: ${reason}`);
    // Add the rejected item to the list with the reason
    setRejectedItems([
      ...rejectedItems,
      { ...item, status: 'Rejected', rejectionReason: reason },
    ]);
    // Mark the form as submitted
    setIsSubmitted(true);
  };

  return (
    <div className="rejected-items-container">
      <Nav />
      <div className="rejected-items-content">
        <h1>Reject Item</h1>
        {item ? (
          <div className="item-details">
            <h2>Item Details</h2>
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Price:</strong> ${item.price}</p>
            <p><strong>Status:</strong> {item.status}</p>
            {isSubmitted ? (
              <div className="confirmation-message">
                <h3>Rejection Submitted</h3>
                <p><strong>Reason for Rejection:</strong> {reason}</p>
                <button
                  className="cancel-btn"
                  onClick={() => navigate('/display-items')}
                >
                  Back to Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rejection-form">
                <div className="form-group">
                  <label htmlFor="reason">Reason for Rejection</label>
                  <textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="button-group">
                  <button type="submit" className="submit-btn">Submit Rejection</button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => navigate('/display-items')}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <p>No item details available.</p>
        )}
        <div className="rejected-items-table">
          <h2>All Rejected Items</h2>
          {rejectedItems.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Rejection Reason</th>
                </tr>
              </thead>
              <tbody>
                {rejectedItems.map((rejectedItem) => (
                  <tr key={rejectedItem.id}>
                    <td>{rejectedItem.id}</td>
                    <td>{rejectedItem.name}</td>
                    <td>{rejectedItem.description}</td>
                    <td>${rejectedItem.price}</td>
                    <td>{rejectedItem.status}</td>
                    <td>{rejectedItem.rejectionReason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No items have been rejected yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RejectedItems;