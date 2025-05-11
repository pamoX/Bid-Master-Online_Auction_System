import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav/Nav";
import Item from "../Item/Item";
import axios from "axios";
import "./SellerDashboard.css";
import Footer from "../Footer/Footer";

const ITEMS_URL = "http://localhost:5000/items";

function SellerDashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, accepted, rejected
  const [popup, setPopup] = useState({ message: "", type: "", visible: false });

  // Function to show popup with a message and type (success/error)
  const showPopup = (message, type) => {
    setPopup({ message, type, visible: true });
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setPopup({ message: "", type: "", visible: false });
    }, 3000);
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(ITEMS_URL);
      setItems(response.data.items || []);
      setLoading(false);

      // Show success popup if items are loaded
      if (response.data.items && response.data.items.length > 0) {
        showPopup("Items loaded successfully!", "success");
      } else {
        showPopup("No items available.", "info");
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      showPopup("Failed to load items. Please try again.", "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Filter items based on selected filter
  const filteredItems = () => {
    if (filter === "all") return items;
    return items.filter(item => item.status === filter);
  };

  return (
    <div className="seller-dashboard">
      <Nav />
      <br/><br/><br/><br/>
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h2>Seller Dashboard</h2>
          <Link to="/add-item" className="add-item-btn">+ Add New Item</Link>
        </header>

        <div className="filter-controls">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`} 
            onClick={() => setFilter('all')}
          >
            All Items
          </button>
          <button 
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`} 
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-btn ${filter === 'accepted' ? 'active' : ''}`} 
            onClick={() => setFilter('accepted')}
          >
            Accepted
          </button>
          <button 
            className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`} 
            onClick={() => setFilter('rejected')}
          >
            Rejected
          </button>
        </div>

        {loading ? (
          <div className="loading-spinner">Loading items...</div>
        ) : (
          <div className="items-grid">
            {filteredItems().length > 0 ? (
              filteredItems().map((item) => (
                <div key={item._id} className="item-grid-cell">
                  <Item item={item} />
                </div>
              ))
            ) : (
              <div className="no-items-message">
                <p>No {filter !== 'all' ? filter : ''} items found.</p>
              </div>
            )}
          </div>
        )}
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

export default SellerDashboard;