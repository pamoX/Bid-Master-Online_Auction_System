import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import { useNavigate } from "react-router";
import axios from 'axios';
import './AddItem.css';

function AddItem() {
    const history = useNavigate();

    const [inputs, setInputs] = useState({
        title: "",
        image:"",
        description: "",
        startingBid: "",
    });

    const [popupMessage, setPopupMessage] = useState(""); // State for popup message

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest()
            .then(() => {
                setPopupMessage("Item added successfully!"); // Set success message
                setTimeout(() => {
                    setPopupMessage(""); // Clear message after some time (optional)
                    history("/seller-dashboard");
                }, 3000); // Adjust timeout duration as needed
            })
            .catch(error => {
                setPopupMessage("Failed to add item. Please try again."); // Set error message
            });
    };

    const sendRequest = async () => {
        try {
            const res = await axios.post("http://localhost:5000/items", {
                title: String(inputs.title),
                description: String(inputs.description),
                startingBid: Number(inputs.startingBid),
            });
            return res.data;
        } catch (error) {
            throw error;
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

                <label>Description:</label>
                <div className="AR-form-group">
                    <textarea
                        type="text"
                        name="description"
                        onChange={handleChange}
                        value={inputs.description}
                        placeholder="Enter item description"
                        required
                        rows="4"
                    />
                </div>

                <label>Starting Bid:</label>
                <div className="AR-form-group">
                    <input
                        type="number"
                        name="startingBid"
                        onChange={handleChange}
                        min="0"
                        value={inputs.startingBid}
                        placeholder="Enter starting bid"
                        required
                    />
                </div>
                <br/>
                <button type="submit" className="submit-button">Add Item</button>
            </form>

            {popupMessage && (
                <div className="popup-message">
                    <p>{popupMessage}</p>
                </div>
            )}

            <br/><br/>
            <Footer/>
        </div>
    );
}

export default AddItem;
