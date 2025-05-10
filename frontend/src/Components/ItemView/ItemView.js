import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav';
import './ItemView.css';

function ItemView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  
  useEffect(() => {
    fetch(`http://localhost:5000/items/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch item');
        }
        return res.json();
      })
      .then(data => {
        setItem(data);
        setMainImage(data.image.startsWith('/uploads') 
          ? `http://localhost:5000${data.image}` 
          : `https://via.placeholder.com/400x300?text=${encodeURIComponent(data.name)}`);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching item:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);
  
  useEffect(() => {
    let timer;
    if (item && item.biddingEndTime) {
      timer = setInterval(() => {
        const now = new Date();
        const end = new Date(item.biddingEndTime);
        const diff = end - now;
        
        if (diff <= 0) {
          setTimeLeft('Bidding ended');
          clearInterval(timer);
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          
          setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [item]);
  
  const handleThumbnailClick = (imgSrc) => {
    setMainImage(imgSrc);
  };
  
  const handlePlaceBid = () => {
    alert('Bid placed! This would typically open a bidding form.');
    // navigate('/place-bid/' + id);  // For future implementation
  };
  
  if (loading) return <div className="item-view-container"><Nav /><div className="loading">Loading item details...</div></div>;
  if (error) return <div className="item-view-container"><Nav /><div className="error">Error: {error}</div></div>;
  if (!item) return <div className="item-view-container"><Nav /><div className="not-found">Item not found</div></div>;

  return (
    <div className="item-view-container">
      <Nav />
      <br/><br/><br/><br/>
      <div className="item-view-content">
        <div className="item-images-section">
          <div className="main-image-container">
            <img src={mainImage} alt={item.name} className="main-image" />
          </div>
          <div className="thumbnails-container">
            <div 
              className={`thumbnail ${mainImage === (item.image.startsWith('/uploads') ? `http://localhost:5000${item.image}` : `https://via.placeholder.com/400x300?text=${encodeURIComponent(item.name)}`) ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(item.image.startsWith('/uploads') ? `http://localhost:5000${item.image}` : `https://via.placeholder.com/400x300?text=${encodeURIComponent(item.name)}`)}
            >
              <img 
                src={item.image.startsWith('/uploads')
                  ? `http://localhost:5000${item.image}`
                  : `https://via.placeholder.com/150?text=${encodeURIComponent(item.name)}`}
                alt={item.name}
                className="item-image"
              />
            </div>
            {item.additionalImages && item.additionalImages.map((img, index) => (
              <div 
                key={index} 
                className={`thumbnail ${mainImage === `http://localhost:5000${img}` ? 'active' : ''}`}
                onClick={() => handleThumbnailClick(`http://localhost:5000${img}`)}
              >
                <img src={`http://localhost:5000${img}`} alt={`${item.name} ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="item-details-section">
          <h1 className="item-title">{item.name}</h1>
          
          <div className="item-price-info">
            <div className="price-container">
              <h3>Starting Price</h3>
              <p className="starting-price">${parseFloat(item.startingPrice || item.price).toFixed(2)}</p>
            </div>
            
            <div className="bid-timer-container">
              <h3>Bidding Ends In</h3>
              <p className="bid-timer">{timeLeft}</p>
            </div>
          </div>
          
          <div className="item-description-container">
            <h3>Description</h3>
            <div className="item-description">
              {item.description.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="bid-button" onClick={handlePlaceBid}>Place Bid</button>
            <button className="back-button" onClick={() => navigate('/items-gallery')}>Back to Gallery</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemView;