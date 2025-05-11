import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ItemDetails.css';

const ItemDetails = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/items/${itemId}`);
        setItem(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching item details:', err);
        setError('Failed to load item details');
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  const handlePlaceBid = () => {
    navigate(`/bid-now/${itemId}`);
  };

  if (loading) return <div className="loading">Loading item details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!item) return <div className="error">Item not found</div>;

  return (
    <div className="item-details-container">
      <div className="item-details-content">
        <div className="item-image-section">
          <img 
            src={item.image.startsWith('/uploads')
              ? `http://localhost:5000${item.image}`
              : `https://via.placeholder.com/400?text=${encodeURIComponent(item.name)}`}
            alt={item.name}
            className="item-main-image"
          />
        </div>

        <div className="item-info-section">
          <h1 className="item-name">{item.name}</h1>
          <p className="item-description">{item.description}</p>
          
          <div className="item-pricing">
            <div className="price-info">
              <h3>Starting Price</h3>
              <p className="price">${parseFloat(item.startingPrice || item.price).toFixed(2)}</p>
            </div>
            
            {item.biddingEnds && (
              <div className="bidding-info">
                <h3>Bidding Ends</h3>
                <p>{new Date(item.biddingEnds).toLocaleString()}</p>
              </div>
            )}
          </div>

          {item.status === 'Approved' && (
            <button 
              className="place-bid-button"
              onClick={handlePlaceBid}
            >
              Place Bid
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails; 