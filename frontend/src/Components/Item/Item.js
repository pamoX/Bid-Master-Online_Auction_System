import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Item.css';
import axios from 'axios'; 

function Item(props) {
  const { _id, title, description, startingBid } = props.item;
  const navigate = useNavigate(); 

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5000/items/${_id}`)
        .then(res => res.data)
        .then(() => navigate("/")) 
        .then(() => navigate("/seller-dashboard")); 
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="item-card">
      <p>ID: {_id}</p>
      <h1 className="item-title">Title: {title}</h1>
      <p className="item-description">Description: {description}</p>
      <p className="item-price">Starting Bid: ${startingBid}</p>
      <div className="item-actions">
        <Link to={`/seller-dashboard/${_id}`}>Update</Link>
        <button className="delete-btn" onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
}

export default Item;