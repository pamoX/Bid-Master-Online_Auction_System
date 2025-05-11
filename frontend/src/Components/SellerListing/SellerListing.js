import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerListing.css';
import Nav from '../Nav/Nav';
import axios from 'axios';

function SellerListing() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/items');
      setListings(response.data.items || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching listings:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleStatusChange = async (listingId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/items/${listingId}/status`, {
        status: newStatus,
      });
      alert(`Listing status updated to ${newStatus}`);
      fetchListings();
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    }
  };

  const handleAddNew = () => {
    navigate('/add-item');
  };

  if (loading) {
    return (
      <div className="seller-container">
        <Nav />
        <div className="loading">Loading listings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="seller-container">
        <Nav />
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="seller-container">
      <Nav />
      <div className="seller-header">
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <h1>My Listings</h1>
        <button className="add-listing-btn" onClick={handleAddNew}>Add New Listing</button>
      </div>

      <div className="table-container">
        <table className="listings-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Item Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-listings">No listings available.</td>
              </tr>
            ) : (
              listings.map((listing) => (
                <tr key={listing._id}>
                  <td>
                    <img
                      src={
                        listing.image?.startsWith('/Uploads')
                          ? `http://localhost:5000${listing.image}`
                          : `https://via.placeholder.com/50?text=${encodeURIComponent(listing.name)}`
                      }
                      alt={listing.name}
                      className="listing-thumbnail"
                    />
                  </td>
                  <td>{listing.name}</td>
                  <td className="description-cell">
                    {listing.description?.substring(0, 50)}...
                  </td>
                  <td>${parseFloat(listing.price).toFixed(2)}</td>
                  <td>{listing.status}</td>
                  <td className="actions-cell">
                    <button
                      className="approve-btn"
                      onClick={() => handleStatusChange(listing._id, 'Approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleStatusChange(listing._id, 'Rejected')}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SellerListing;
