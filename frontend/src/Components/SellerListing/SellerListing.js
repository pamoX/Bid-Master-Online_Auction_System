import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SellerListing.css";
import Nav from "../Nav/Nav";
import axios from "axios";
import Footer from "../Footer/Footer";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function SellerListing() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buttonLoading, setButtonLoading] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/items`);
      setListings(response.data.items || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching listings:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleStatusChange = async (listingId, newStatus) => {
    try {
      setButtonLoading((prev) => ({ ...prev, [listingId]: newStatus }));
      await axios.patch(`${API_BASE_URL}/items/${listingId}/status`, {
        status: newStatus.toLowerCase(),
      });
      setListings((prevListings) =>
        prevListings.map((listing) =>
          listing._id === listingId
            ? { ...listing, status: newStatus.toLowerCase() }
            : listing
        )
      );
      // No need to call fetchListings since we're updating state directly
    } catch (err) {
      console.error("Error updating status:", err);
      alert(`Failed to update status: ${err.message}`);
    } finally {
      setButtonLoading((prev) => ({ ...prev, [listingId]: null }));
    }
  };

  const handleAddNew = () => {
    navigate("/add-item");
  };

  if (loading) {
    return (
      <div className="SellerListing-page">
        <Nav />
        <div className="SellerListing-loading" aria-live="polite">
          Loading listings...
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="SellerListing-page">
        <Nav />
        <div className="SellerListing-error" aria-live="assertive">
          Error: {error}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="SellerListing-page">
      <Nav />
      <br/><br/><br/><br/>
      <div className="SellerListing-header">
        <h1>My Listings</h1>
        <button
          className="SellerListing-add-listing-btn"
          onClick={handleAddNew}
          aria-label="Add new listing"
        >
          Add New Listing
        </button>
      </div>

      <div className="SellerListing-table-container">
        <table className="SellerListing-table" aria-label="Seller listings table">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Item Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.length === 0 ? (
              <tr>
                <td colSpan="6" className="SellerListing-no-listings">
                  No listings available.
                </td>
              </tr>
            ) : (
              listings.map((listing) => (
                <tr key={listing._id}>
                  <td>
                    <img
                      src={
                        listing.image
                          ? `${API_BASE_URL}/${listing.image}`
                          : "https://via.placeholder.com/50?text=No+Image"
                      }
                      alt={listing.title}
                      className="SellerListing-listing-thumbnail"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/50?text=No+Image";
                      }}
                    />
                  </td>
                  <td>{listing.title}</td>
                  <td className="SellerListing-description-cell">
                    {listing.description?.length > 50
                      ? `${listing.description.substring(0, 50)}...`
                      : listing.description || "No description"}
                  </td>
                  <td>${parseFloat(listing.startingBid).toFixed(2)}</td>
                  <td>
                    {listing.status
                      ? listing.status.charAt(0).toUpperCase() +
                        listing.status.slice(1)
                      : "Pending"}
                  </td>
                  <td className="SellerListing-actions-cell">
                    <button
                      className="SellerListing-approve-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(listing._id, "Accepted");
                      }}
                      disabled={
                        buttonLoading[listing._id] ||
                        listing.status === "accepted"
                      }
                      aria-label={`Approve listing ${listing.title}`}
                    >
                      {buttonLoading[listing._id] === "Accepted"
                        ? "Approving..."
                        : "Approve"}
                    </button>
                    <button
                      className="SellerListing-reject-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(listing._id, "Rejected");
                      }}
                      disabled={
                        buttonLoading[listing._id] ||
                        listing.status === "rejected"
                      }
                      aria-label={`Reject listing ${listing.title}`}
                    >
                      {buttonLoading[listing._id] === "Rejected"
                        ? "Rejecting..."
                        : "Reject"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <br/><br/><br/><br/>
      <Footer />
    </div>
  );
}

export default SellerListing;