import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../Nav/Nav";
import "./SellerListing.css";

const ITEMS_URL = "http://localhost:5000/items";

function ListItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState({ message: "", type: "", visible: false });

  // Function to show popup with a message and type (success/error)
  const showPopup = (message, type) => {
    setPopup({ message, type, visible: true });
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setPopup({ message: "", type: "", visible: false });
    }, 3000);
  };

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${ITEMS_URL}/${id}`);
        setItem(response.data.items);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching item details:", err);
        setError("Failed to load item details. Please try again.");
        setLoading(false);
      }
    };

    if (id) {
      fetchItemDetails();
    }
  }, [id]);

  const handleAccept = async () => {
    try {
      // Here you would implement your accept logic
      // For example, update the item status in the database
      await axios.put(`${ITEMS_URL}/${id}`, { status: "accepted" });
      showPopup("Item accepted successfully!", "success");
      // Optionally navigate back to dashboard after a delay
      setTimeout(() => navigate("/seller-dashboard"), 2000);
    } catch (err) {
      console.error("Error accepting item:", err);
      showPopup("Failed to accept item. Please try again.", "error");
    }
  };

  const handleReject = async () => {
    try {
      // Here you would implement your reject logic
      await axios.put(`${ITEMS_URL}/${id}`, { status: "rejected" });
      showPopup("Item rejected.", "info");
      // Optionally navigate back to dashboard after a delay
      setTimeout(() => navigate("/seller-dashboard"), 2000);
    } catch (err) {
      console.error("Error rejecting item:", err);
      showPopup("Failed to reject item. Please try again.", "error");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${ITEMS_URL}/${id}`);
        showPopup("Item deleted successfully!", "success");
        // Navigate back to dashboard after a delay
        setTimeout(() => navigate("/seller-dashboard"), 2000);
      } catch (err) {
        console.error("Error deleting item:", err);
        showPopup("Failed to delete item. Please try again.", "error");
      }
    }
  };

  if (loading) return <div className="loading">Loading item details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!item) return <div className="not-found">Item not found</div>;

  return (
    <div className="list-item-page">
      <Nav />
      <div className="item-details-container">
        <h2>Item Details</h2>
        
        <div className="item-details">
          <div className="item-image-container">
            {item.image && (
              <img 
                src={`http://localhost:5000/${item.image}`} 
                alt={item.title} 
                className="item-full-image"
              />
            )}
          </div>
          
          <div className="item-info">
            <h3>{item.title}</h3>
            
            <div className="item-meta">
              <p><strong>Starting Bid:</strong> ${item.startingBid?.toFixed(2)}</p>
              <p><strong>Listed:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
              {item.updatedAt && item.updatedAt !== item.createdAt && (
                <p><strong>Last Updated:</strong> {new Date(item.updatedAt).toLocaleDateString()}</p>
              )}
            </div>
            
            <div className="item-description">
              <h4>Description</h4>
              <p>{item.description}</p>
            </div>
            
            <div className="action-buttons">
              <button 
                className="accept-button"
                onClick={handleAccept}
              >
                Accept Item
              </button>
              
              <button 
                className="reject-button"
                onClick={handleReject}
              >
                Reject Item
              </button>
              
              <button 
                className="delete-button"
                onClick={handleDelete}
              >
                Delete Item
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Popup Message */}
      {popup.visible && (
        <div className={`popup-message ${popup.type}`}>
          <span>{popup.message}</span>
        </div>
      )}
    </div>
  );
}

export default ListItem;