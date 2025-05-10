import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Item.css";

function Item({ item, onRefresh }) {
  const navigate = useNavigate();
  
  // Extract timestamp from MongoDB ObjectId if available
  const getDateFromId = (id) => {
    if (id && id.length >= 24) {
      // Extract timestamp from MongoDB ObjectId (first 4 bytes of ObjectId)
      const timestamp = parseInt(id.substring(0, 8), 16);
      return new Date(timestamp * 1000).toLocaleDateString();
    }
    return "Unknown date";
  };
  
  // Handle delete item
  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:5000/items/${item._id}`);
        // If onRefresh is provided, call it to refresh the item list
        if (typeof onRefresh === 'function') {
          onRefresh();
        }
        // Show temporary success message
        alert("Item deleted successfully!");
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Failed to delete item. Please try again.");
      }
    }
  };

  return (
    <div className="item-card">
      {/* Status badge - if implemented */}
      {item.status && (
        <div className={`status-indicator status-${item.status}`}>
          {item.status}
        </div>
      )}
      
      <div className="item-image">
        {item.image ? (
          <img
            src={`http://localhost:5000/${item.image}`}
            alt={item.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/150?text=No+Image";
            }}
          />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>
      
      <div className="item-content">
        <h3>{item.title}</h3>
        <p className="item-description-short">
          {item.description?.length > 80
            ? `${item.description.substring(0, 80)}...`
            : item.description}
        </p>
        <div className="item-meta">
          <p className="item-price">Starting Bid: ${item.startingBid?.toFixed(2)}</p>
          <p className="item-date">
            {item.createdAt
              ? `Listed: ${new Date(item.createdAt).toLocaleDateString()}`
              : `ID Date: ${getDateFromId(item._id)}`}
          </p>
        </div>
        
        <div className="item-actions">
          <Link to={`/items/${item._id}`} className="view-details-btn">
            View Details
          </Link>
          
          <div className="item-buttons">
            <Link to={`/items/edit/${item._id}`} className="edit-btn">
              Update
            </Link>
            <button onClick={handleDelete} className="delete-btn">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;