import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav';
import './ItemForm.css';

function ItemForm() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const item = state?.item || {};

  const [formData, setFormData] = useState({
    id: id || '',
    name: item.name || '',
    description: item.description || '',
    price: item.price || '',
    startingPrice: item.startingPrice || '',
    biddingEndTime: item.biddingEndTime ? new Date(item.biddingEndTime).toISOString().substr(0, 16) : '',
    image: null,
    additionalImages: []
  });
  
  const [previewUrl, setPreviewUrl] = useState(null);
  const [additionalPreviews, setAdditionalPreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'image' && files && files[0]) {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
      
      // Create a preview URL for the image
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
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
      
      // Create preview URLs for additional images
      const previews = [];
      for (let i = 0; i < files.length; i++) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          previews.push(fileReader.result);
          if (previews.length === files.length) {
            setAdditionalPreviews([...previews]);
          }
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
    
    // Create FormData object to handle file upload
    const submitData = new FormData();
    submitData.append('id', formData.id);
    submitData.append('name', formData.name);
    submitData.append('description', formData.description);
    submitData.append('price', formData.price);
    submitData.append('startingPrice', formData.startingPrice || formData.price);
    submitData.append('status', 'Approved');
    
    if (formData.biddingEndTime) {
      submitData.append('biddingEndTime', new Date(formData.biddingEndTime).toISOString());
    }
    
    // Ensure image is properly appended
    if (formData.image) {
      submitData.append('image', formData.image);
    }
    
    if (formData.additionalImages && formData.additionalImages.length > 0) {
      formData.additionalImages.forEach((file, index) => {
        submitData.append('additionalImages', file);
      });
    }
    
    fetch('http://localhost:5000/items', {
      method: 'POST',
      body: submitData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      alert('Item submitted successfully!');
      navigate('/items-gallery');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to submit item');
    });
  };

  return (
    <div className="item-container">
      <Nav />
      <div className="item-content">
        <div className="illustration-container">
          <div className="illustration-bg">
            <div className="desk-illustration"></div>
          </div>
        </div>
        <div className="item-wrapper">
          <h1 className="item-title">Item Approval Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="item-group">
              <label htmlFor="name">Item Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="item-group">
              <label htmlFor="description">Item Description</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div className="item-group">
              <label htmlFor="price">Item Price ($)</label>
              <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} min="0" step="0.01" required />
            </div>
            <div className="item-group">
              <label htmlFor="startingPrice">Starting Bid Price ($)</label>
              <input type="number" id="startingPrice" name="startingPrice" value={formData.startingPrice} onChange={handleChange} min="0" step="0.01" placeholder="Default is Item Price" />
            </div>
            <div className="item-group">
              <label htmlFor="biddingEndTime">Bidding End Time</label>
              <input type="datetime-local" id="biddingEndTime" name="biddingEndTime" value={formData.biddingEndTime} onChange={handleChange} />
            </div>
            <div className="item-group">
              <label htmlFor="image">Main Item Image</label>
              <input type="file" id="image" name="image" accept="image/*" onChange={handleChange} required />
              {previewUrl && (
                <div className="item-preview">
                  <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />
                </div>
              )}
            </div>
            <div className="item-group">
              <label htmlFor="additionalImages">Additional Images (Up to 4)</label>
              <input type="file" id="additionalImages" name="additionalImages" accept="image/*" onChange={handleChange} multiple />
              {additionalPreviews.length > 0 && (
                <div className="additional-previews">
                  {additionalPreviews.map((preview, index) => (
                    <img 
                      key={index} 
                      src={preview} 
                      alt={`Preview ${index + 1}`} 
                      style={{ maxWidth: '22%', maxHeight: '100px', marginTop: '10px', marginRight: '3%' }} 
                    />
                  ))}
                </div>
              )}
            </div>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ItemForm;