import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import axios from 'axios';
import './AddItem.css';

function AddItem() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    startingBid: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = (file) => {
    if (file.type.startsWith('image/')) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        showPopup('Image size exceeds 10MB limit', 'error');
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      showPopup('Please upload an image file (JPG, PNG, GIF)', 'error');
    }
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setImage(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const showPopup = (message, type) => {
    setPopupMessage(message);
    setPopupType(type);
    setTimeout(() => {
      setPopupMessage('');
    }, 3000);
  };

  const resetForm = () => {
    setInputs({ title: '', description: '', startingBid: '' });
    setImage(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!image) {
      showPopup('Please upload an image for the item', 'error');
      return;
    }
    if (inputs.title.trim().length < 3) {
      showPopup('Title must be at least 3 characters long', 'error');
      return;
    }
    if (inputs.description.trim().length < 10) {
      showPopup('Description must be at least 10 characters long', 'error');
      return;
    }
    if (parseFloat(inputs.startingBid) <= 0) {
      showPopup('Starting bid must be greater than 0', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', inputs.title);
      formData.append('description', inputs.description);
      formData.append('startingBid', inputs.startingBid);
      formData.append('image', image);

      const response = await axios.post('http://localhost:5000/items', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      showPopup('Item added successfully!', 'success');
      resetForm();
      setTimeout(() => {
        navigate('/seller-dashboard'); // Navigate to seller dashboard after 3 seconds
      }, 3000);
    } catch (error) {
      console.error('Error adding item:', error);
      const errorMessage = error.response?.data?.message || 'Failed to add item. Please try again.';
      showPopup(errorMessage, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="AR-add-item-page">
      <Nav />
      <br />
      <br />
      <br />
      <br />
      <div className="AR-header">
        <h1>Add Item</h1>
        <div className="AR-back-link">
          <Link to="/seller-profile" className="back-btn">
            <i className="fas fa-arrow-left"></i> Back to Profile
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="AR-form-container AR-report-form">
        <label>Title:</label>
        <div className="AR-form-group">
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={inputs.title}
            placeholder="Enter item title"
            required
            maxLength="100"
          />
        </div>

        <label>Image:</label>
        <div
          className={`image-upload-container ${isDragging ? 'active' : ''}`}
          onClick={handleImageClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="file-input"
            accept="image/*"
            onChange={handleImageChange}
          />
          {!imagePreview ? (
            <div>
              <p>Click to upload or drag and drop</p>
              <p style={{ fontSize: '12px', color: '#888' }}>JPG, PNG or GIF (max 10MB)</p>
            </div>
          ) : (
            <div className="image-preview">
              <img src={imagePreview} alt="Item preview" />
              <div className="remove-image" onClick={removeImage}>
                ×
              </div>
            </div>
          )}
        </div>

        <label>Description:</label>
        <div className="AR-form-group">
          <textarea
            name="description"
            onChange={handleChange}
            value={inputs.description}
            placeholder="Enter item description"
            required
            rows="4"
            maxLength="1000"
          />
        </div>

        <label>Starting Bid ($):</label>
        <div className="AR-form-group">
          <input
            type="number"
            name="startingBid"
            onChange={handleChange}
            min="0.01"
            step="0.01"
            value={inputs.startingBid}
            placeholder="Enter starting bid"
            required
          />
        </div>
        <br />
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Adding Item...' : 'Add Item'}
        </button>
      </form>

      {popupMessage && (
        <div className={`popup-message ${popupType}`}>
          <p>{popupMessage}</p>
        </div>
      )}

      <br />
      <br />
      <Footer />
    </div>
  );
}

export default AddItem;