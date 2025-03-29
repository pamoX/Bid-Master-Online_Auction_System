// frontend/src/Components/RejectedItems/RejectedItems.js
import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import './RejectedItems.css';

const RejectedItems = () => {
  // State for the list of rejected items
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', reason: 'Poor Quality', date: '2025-03-24' },
    { id: 2, name: 'Item 2', reason: 'Incomplete Description', date: '2025-03-23' },
  ]);

  // State to manage the edit form visibility and the item being edited
  const [editItemId, setEditItemId] = useState(null);
  const [editReason, setEditReason] = useState('');

  // Handle delete action
  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Handle edit feedback action (open the edit form)
  const handleEditFeedback = (item) => {
    setEditItemId(item.id);
    setEditReason(item.reason); // Pre-fill the textbox with the current reason
  };

  // Handle saving the updated feedback
  const handleSaveFeedback = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, reason: editReason } : item
      )
    );
    setEditItemId(null); // Close the edit form
    setEditReason(''); // Reset the textbox
  };

  // Handle canceling the edit
  const handleCancelEdit = () => {
    setEditItemId(null);
    setEditReason('');
  };

  return (
    <div className="rejected-items">
      <Nav />
      <br />
      <br />
      <br />
      <h1>Rejected Items</h1>

      {/* Table of Rejected Items */}
      <table>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Name</th>
            <th>Rejection Reason</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.reason}</td>
              <td>{item.date}</td>
              <td>
                <button
                  onClick={() => handleEditFeedback(item)}
                  className="action-btn edit-btn"
                >
                  Edit Feedback
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="action-btn delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Feedback Form (shown when Edit Feedback is clicked) */}
      {editItemId && (
        <div className="edit-form-container">
          <h2>Edit Rejection Reason</h2>
          <div className="form-group">
            <label>Rejection Reason:</label>
            <textarea
              value={editReason}
              onChange={(e) => setEditReason(e.target.value)}
              required
            />
          </div>
          <button
            onClick={() => handleSaveFeedback(editItemId)}
            className="submit-btn"
          >
            Save
          </button>
          <button onClick={handleCancelEdit} className="cancel-btn">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default RejectedItems;