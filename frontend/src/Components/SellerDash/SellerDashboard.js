import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from '../Nav/Nav';
import "./SellerDashboard.css";

const SellerDashboard = () => {
  const [items, setItems] = useState([
    { id: 1, title: "Vintage Watch", description: "A classic timepiece", startingBid: 100 },
    { id: 2, title: "Antique Vase", description: "Porcelain vase", startingBid: 150 },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    startingBid: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing item
      setItems(items.map(item => 
        item.id === formData.id ? { ...item, ...formData } : item
      ));
      setIsEditing(false);
    } else {
      // Add new item
      const newItem = {
        id: items.length + 1,
        title: formData.title,
        description: formData.description,
        startingBid: parseFloat(formData.startingBid),
      };
      setItems([...items, newItem]);
    }
    // Reset form
    setFormData({ id: null, title: "", description: "", startingBid: "" });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="seller-dashboard-page">
      <Nav /><br/><br/>
      <div className="seller-dashboard-container">
        <h2>Seller Dashboard</h2>

        {/* Item List */}
        <div className="item-list">
          <h3>Your Items</h3>
          {items.length === 0 ? (
            <p>No items listed yet.</p>
          ) : (
            <table className="item-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Starting Bid</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>${item.startingBid}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(item)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Add/Edit Form */}
        <div className="item-form">
          <h3>{isEditing ? "Edit Item" : "Add New Item"}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Item Title"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Item Description"
                required
              />
            </div>
            <div className="form-group">
              <label html glycogenFor="startingBid">Starting Bid ($)</label>
              <input
                type="number"
                id="startingBid"
                name="startingBid"
                value={formData.startingBid}
                onChange={handleInputChange}
                placeholder="Starting Bid"
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <button type="submit" className="submit-btn">
              {isEditing ? "Update Item" : "Add Item"}
            </button>
            {isEditing && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({ id: null, title: "", description: "", startingBid: "" });
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;