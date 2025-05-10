import React, { useState, useRef } from 'react';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import { useNavigate } from "react-router";
import axios from 'axios';
import './AddItem.css';

function AddItem() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        startingBid: "",
    });

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupType, setPopupType] = useState("success"); // success or error

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
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
            setImage(file);
            
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            showPopup("Please upload an image file", "error");
        }
    };

    const removeImage = (e) => {
        e.stopPropagation();
        setImage(null);
        setImagePreview("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const showPopup = (message, type) => {
        setPopupMessage(message);
        setPopupType(type);
        setTimeout(() => {
            setPopupMessage("");
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!image) {
            showPopup("Please upload an image for the item", "error");
            return;
        }

        try {
            // Create form data for multipart/form-data request (for image upload)
            const formData = new FormData();
            formData.append("title", inputs.title);
            formData.append("description", inputs.description);
            formData.append("startingBid", inputs.startingBid);
            formData.append("image", image);

            // Send the request
            await axios.post("http://localhost:5000/items", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            showPopup("Item added successfully!", "success");
            
            // Navigate after popup display
            setTimeout(() => {
                navigate("/seller-dashboard");
            }, 3000);
            
        } catch (error) {
            console.error("Error adding item:", error);
            showPopup("Failed to add item. Please try again.", "error");
        }
    };

    return (
        <div className="AR-add-item-page">
            <Nav /><br/><br/><br/><br/>
            <div>
                <div className="AR-header">
                    <h1>Add Item</h1>
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
                            <div className="remove-image" onClick={removeImage}>×</div>
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
                    />
                </div>

                <label>Starting Bid ($):</label>
                <div className="AR-form-group">
                    <input
                        type="number"
                        name="startingBid"
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        value={inputs.startingBid}
                        placeholder="Enter starting bid"
                        required
                    />
                </div>
                <br/>
                <button type="submit" className="submit-button">Add Item</button>
            </form>

            {popupMessage && (
                <div className={`popup-message ${popupType}`}>
                    <p>{popupMessage}</p>
                </div>
            )}

            <br/><br/>
            <Footer/>
        </div>
    );
}

export default AddItem;