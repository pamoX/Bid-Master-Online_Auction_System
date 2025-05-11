import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav';
import './ItemForm.css';

function EditItem() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    startingPrice: '',
    biddingEndTime: '',
    image: null,
    additionalImages: [],
    status: 'Pending',
  });
  
  const [previewUrl, setPreviewUrl] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [additionalPreviews, setAdditionalPreviews] = useState([]);
  const [currentAdditionalImages, setCurrentAdditionalImages] = useState([]);

  useEffect(() => {
    if (state && state.item) {
      const item = state.item;
      setFormData({
        name: item.name || '',
        description: item.description || '',
        price: item.price || '',
        startingPrice: item.startingPrice || item.price || '',
        biddingEndTime: item.biddingEndTime ? new Date(item.biddingEndTime).toISOString().substr(0, 16) : '',
        status: item.status || 'Pending',
        image: null,
        additionalImages: []
      });
      
      if (item.image) {
        setCurrentImage(item.image.startsWith('/uploads') 
          ? `http://localhost:5000${item.image}` 
          : `https://via.placeholder.com/150?text=${encodeURIComponent(item.name)}`);
      }

      if (item.additionalImages && item.additionalImages.length > 0) {
        const additionalImageUrls = item.additionalImages.map(img => 
          img.startsWith('/uploads') 
            ? `http://localhost:5000${img}` 
            : `https://via.placeholder.com/150?text=Additional`
        );
        setCurrentAdditionalImages(additionalImageUrls);
      }
      
      setLoading(false);
    } else {
      fetch(`http://localhost:5000/items/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch item');
          return res.json();
        })
        .then(item => {
          setFormData({
            name: item.name || '',
            description: item.description || '',
            price: item.price || '',
            startingPrice: item.startingPrice || item.price || '',
            biddingEndTime: item.biddingEndTime ? new Date(item.biddingEndTime).toISOString().substr(0, 16) : '',
            status: item.status || 'Pending',
            image: null,
            additionalImages: []
          });
          
          if (item.image) {
            setCurrentImage(item.image.startsWith('/uploads') 
              ? `http://localhost:5000${item.image}` 
              : `https://via.placeholder.com/150?text=${encodeURIComponent(item.name)}`);
          }

          if (item.additionalImages && item.additionalImages.length > 0) {
            const additionalImageUrls = item.additionalImages.map(img => 
              img.startsWith('/uploads') 
                ? `http://localhost:5000${img}` 
                : `https://via.placeholder.com/150?text=Additional`
            );
            setCurrentAdditionalImages(additionalImageUrls);
          }
          
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching item:', err);
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id, state]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'image' && files && files[0]) {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
      const fileReader = new FileReader();
      fileReader.onload = () => setPreviewUrl(fileReader.result);
      fileReader.readAsDataURL(file);
    } else if (name === 'additionalImages' && files && files.length > 0) {
      if (files.length > 4) {
        alert('You can only upload up to 4 additional images');
        return;
      }
      setFormData(prev => ({
        ...prev,
        [name]: Array.from(files)
      }));
      const previews = [];
      for (let i = 0; i < files.length; i++) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          previews.push(fileReader.result);
          if (previews.length === files.length) setAdditionalPreviews([...previews]);
        };
        fileReader.readAsDataURL(files[i]);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('description', formData.description);
    submitData.append('price', formData.price);
    submitData.append('startingPrice', formData.startingPrice || formData.price);
    submitData.append('status', formData.status);
    if (formData.biddingEndTime) {
      submitData.append('biddingEndTime', new Date(formData.biddingEndTime).toISOString());
    }
    if (formData.image) {
      submitData.append('image', formData.image);
    }
    if (formData.additionalImages && formData.additionalImages.length > 0) {
      for (let i = 0; i < formData.additionalImages.length; i++) {
        submitData.append('additionalImages', formData.additionalImages[i]);
      }
    }

    fetch(`http://localhost:5000/items/${id}`, {
      method: 'PUT',
      body: submitData
    })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(() => {
      alert('Item updated successfully!');
      navigate('/item-manager');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to update item');
    });
  };

  if (loading) return <div className="item-form-container"><Nav /><div className="item-loading">Loading item data...</div></div>;
  if (error) return <div className="item-form-container"><Nav /><div className="item-error">Error: {error}</div></div>;

  return (
    <div className="item-form-container">
      <Nav />
      <div className="item-form-content">
        <div className="item-illustration-container">
          <div className="item-illustration-bg">
            <div className="item-desk-illustration"></div>
          </div>
        </div>
        <div className="item-form-wrapper">
          <h1 className="item-form-title">Edit Item</h1>
          <form onSubmit={handleSubmit}>
            <div className="item-form-group">
              <label htmlFor="name">Item Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="item-form-group">
              <label htmlFor="description">Item Description</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div className="item-form-group">
              <label htmlFor="price">Item Price ($)</label>
              <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} min="0" step="0.01" required />
            </div>
            <div className="item-form-group">
              <label htmlFor="startingPrice">Starting Bid Price ($)</label>
              <input type="number" id="startingPrice" name="startingPrice" value={formData.startingPrice} onChange={handleChange} min="0" step="0.01" placeholder="Default is Item Price" />
            </div>
            <div className="item-form-group">
              <label htmlFor="biddingEndTime">Bidding End Time</label>
              <input type="datetime-local" id="biddingEndTime" name="biddingEndTime" value={formData.biddingEndTime} onChange={handleChange} />
            </div>
            <div className="item-form-group">
              <label htmlFor="status">Status</label>
              <select id="status" name="status" value={formData.status} onChange={handleChange} required>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="item-form-group">
              <label htmlFor="image">Main Item Image</label>
              <input type="file" id="image" name="image" accept="image/*" onChange={handleChange} />
              {previewUrl ? (
                <div className="item-image-preview">
                  <p>New image preview:</p>
                  <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />
                </div>
              ) : currentImage ? (
                <div className="item-image-preview">
                  <p>Current image:</p>
                  <img src={currentImage} alt="Current" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />
                </div>
              ) : null}
            </div>
            <div className="item-form-group">
              <label htmlFor="additionalImages">Additional Images (Up to 4)</label>
              <input type="file" id="additionalImages" name="additionalImages" accept="image/*" onChange={handleChange} multiple />
              {additionalPreviews.length > 0 ? (
                <div className="item-additional-previews">
                  <p>New additional images:</p>
                  {additionalPreviews.map((preview, index) => (
                    <img key={index} src={preview} alt={`Preview ${index + 1}`} style={{ maxWidth: '22%', maxHeight: '100px', marginTop: '10px', marginRight: '3%' }} />
                  ))}
                </div>
              ) : currentAdditionalImages.length > 0 ? (
                <div className="item-additional-previews">
                  <p>Current additional images:</p>
                  {currentAdditionalImages.map((imgUrl, index) => (
                    <img key={index} src={imgUrl} alt={`Additional ${index + 1}`} style={{ maxWidth: '22%', maxHeight: '100px', marginTop: '10px', marginRight: '3%' }} />
                  ))}
                </div>
              ) : null}
            </div>
            <div className="item-form-buttons">
              <button type="button" className="item-cancel-btn" onClick={() => navigate('/item-manager')}>Cancel</button>
              <button type="submit" className="item-submit-btn">Update Item</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditItem;
