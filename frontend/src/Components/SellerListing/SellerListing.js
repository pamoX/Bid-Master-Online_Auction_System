import React, { useState, useEffect, useRef } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import "./SellerListing.css";

const ITEMS_URL = "http://localhost:5000/items";
const UPDATE_ITEM_STATUS_URL = "http://localhost:5000/items/status";

const fetchItems = async () => {
  try {
    const res = await axios.get(ITEMS_URL);
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch items");
  }
};

function ItemListing() {
  const [items, setItems] = useState([]);
  const [popup, setPopup] = useState({ message: "", type: "", visible: false });
  const [loading, setLoading] = useState({});
  const popupTimeout = useRef(null);

  const showPopup = (message, type) => {
    if (popupTimeout.current) clearTimeout(popupTimeout.current);
    setPopup({ message, type, visible: true });
    popupTimeout.current = setTimeout(() => {
      setPopup({ message: "", type: "", visible: false });
    }, 3000);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const itemsData = await fetchItems();
        console.log("Fetched items:", itemsData);
        setItems(itemsData.items.map(item => ({
          ...item,
          status: item.status || "Pending"
        })) || []);
        showPopup(
          itemsData.items?.length > 0 ? "Items loaded successfully!" : "No items pending approval.",
          itemsData.items?.length > 0 ? "success" : "info"
        );
      } catch (error) {
        showPopup("Failed to load items. Please try again.", "error");
        console.error("Fetch items error:", error);
      }
    };
    loadData();
  }, []);

  const handleItemStatus = async (itemId, status) => {
    const action = status === "Approved" ? "approve" : "reject";
    if (!window.confirm(`Are you sure you want to ${action} this item?`)) {
      showPopup(`Action cancelled: Item not ${action}ed.`, "info");
      return;
    }

    setLoading(prev => ({ ...prev, [itemId]: true }));

    try {
      console.log("Sending payload:", { itemId, status });
      const response = await axios.post(UPDATE_ITEM_STATUS_URL, { itemId, status });
      console.log("Response:", response.data);
      const updatedItems = await fetchItems(); // Re-fetch to ensure consistency
      setItems(updatedItems.items.map(item => ({
        ...item,
        status: item.status || "Pending"
      })) || []);
      showPopup(`Item ${status} successfully!`, "success");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        `Failed to ${action} item. Please try again.`;
      showPopup(errorMessage, "error");
      console.error("Status update error:", error.response || error);
    } finally {
      setLoading(prev => ({ ...prev, [itemId]: false }));
    }
  };

  return (
<<<<<<< Updated upstream
    <div className="item-listing">
      <Nav />
      <br />
      <br />
      <br />
      <div>
        <h2 className="listing-header">Item Listing Management</h2>
        <div className="items-table-container">
          {items.length > 0 ? (
            <table className="items-table">
=======
    <div className="seller-listings-page">
      <Nav /><br/><br/>
      <h1>Item Listings</h1>
      <p>Manage your auction listings below.</p>

      <div className="navigation-links">
        <Link to="/create-listing">Create Listing</Link>
        <Link to="/live-bids">Live Bids</Link>
        <Link to="/seller-dashboard">Dashboard</Link>
      </div>

      <div className="grid-container">
        <div className="card listings-container">
          <h2>Your Listings</h2>
          <div className="filter-section">
            <label>Filter by Status: </label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Draft">Draft</option>
              <option value="Live">Live</option>
              <option value="Ended">Ended</option>
            </select>
          </div>
          {sortedListings.length === 0 ? (
            <p>No listings available.</p>
          ) : (
            <table className="listings-table">
>>>>>>> Stashed changes
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => {
                  console.log("Rendering item:", item._id, "Status:", item.status);
                  return (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>${item.price}</td>
                      <td>{item.description}</td>
                      <td>{item.status}</td>
                      <td>
                        <button
                          className="approve-btn"
                          onClick={() => {
                            console.log("Approve clicked for item:", item._id);
                            handleItemStatus(item._id, "Approved");
                          }}
                          disabled={item.status === "Approved" || loading[item._id]}
                        >
                          {loading[item._id] && item.status !== "Approved" ? "Approving..." : "Approve"}
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => {
                            console.log("Reject clicked for item:", item._id);
                            handleItemStatus(item._id, "Rejected");
                          }}
                          disabled={item.status === "Rejected" || loading[item._id]}
                        >
                          {loading[item._id] && item.status !== "Rejected" ? "Rejecting..." : "Reject"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No items available for review.</p>
          )}
        </div>
      </div>

      {popup.visible && (
        <div className={`popup-message ${popup.type}`}>
          <span>{popup.message}</span>
        </div>
      )}
    </div>
  );
}

export default ItemListing;