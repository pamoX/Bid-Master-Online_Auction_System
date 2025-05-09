import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ItemManager.css';
import Nav from '../Nav/Nav';

function ItemManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    setLoading(true);
    fetch('http://localhost:5000/items')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch items');
        }
        return res.json();
      })
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching items:', err);
        setError(err.message);
        setLoading(false);
      });
  };

  const handleEdit = (item) => {
    navigate(`/edit-item/${item._id}`, { state: { item } });
  };

  const handleDelete = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      fetch(`http://localhost:5000/items/${itemId}`, {
        method: 'DELETE',
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to delete item');
          }
          return res.json();
        })
        .then(() => {
          alert('Item deleted successfully');
          // Refresh the items list
          fetchItems();
        })
        .catch(err => {
          console.error('Error deleting item:', err);
          alert('Failed to delete item');
        });
    }
  };

  const handleStatusChange = (itemId, newStatus) => {
    fetch(`http://localhost:5000/items/${itemId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to update status');
        }
        return res.json();
      })
      .then(() => {
        alert(`Item status updated to ${newStatus}`);
        fetchItems();
      })
      .catch(err => {
        console.error('Error updating status:', err);
        alert('Failed to update status');
      });
  };

  const handleAddNew = () => {
    navigate('/item-form');
  };

  if (loading) return <div className="manager-container"><Nav /><div className="loading">Loading items...</div></div>;
  if (error) return <div className="manager-container"><Nav /><div className="error">Error: {error}</div></div>;

  // Update the handleView function in ItemManager.js:
const handleView = (item) => {
  navigate(`/item/${item._id}`);
};


  return (
    <div className="manager-container">
      <Nav />
      <div className="manager-header">
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <h1>Item Management</h1>
        <button className="add-item-btn" onClick={handleAddNew}>Add New Item</button>
      </div>
      
      <div className="table-container">
        <table className="items-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-items">No items available.</td>
              </tr>
            ) : (
              items.map(item => (
                <tr key={item._id}>
                  <td>
                    <img 
                      src={item.image.startsWith('/uploads') 
                        ? `http://localhost:5000${item.image}` 
                        : `https://via.placeholder.com/50?text=${encodeURIComponent(item.name)}`} 
                      alt={item.name} 
                      className="item-thumbnail" 
                    />
                  </td>
                  <td>{item.name}</td>
                  <td className="description-cell">{item.description.substring(0, 50)}...</td>
                  <td>${parseFloat(item.price).toFixed(2)}</td>
                  <td>
                    <select 
                      value={item.status} 
                      onChange={(e) => handleStatusChange(item._id, e.target.value)}
                      className={`status-select status-${item.status.toLowerCase()}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                
                  <td className="actions-cell">
                    <button className="view-btn" onClick={() => handleView(item)}>View</button>
                    <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
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

export default ItemManager;