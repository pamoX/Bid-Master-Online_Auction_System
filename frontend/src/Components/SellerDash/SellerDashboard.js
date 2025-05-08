import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import Item from "../Item/Item";
import axios from "axios";
import "./SellerDashboard.css";

const ITEMS_URL = "http://localhost:5000/items";
const IMAGES_URL = "http://localhost:5000/getImage";

const fetchItems = async () => {
  return await axios.get(ITEMS_URL).then((res) => res.data);
};

const fetchImages = async () => {
  return await axios.get(IMAGES_URL).then((res) => res.data);
};

function SellerDashboard() {
  const [items, setItems] = useState([]);
  const [images, setImages] = useState([]);
  const [popup, setPopup] = useState({ message: "", type: "", visible: false });

  // Function to show popup with a message and type (success/error)
  const showPopup = (message, type) => {
    setPopup({ message, type, visible: true });
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setPopup({ message: "", type: "", visible: false });
    }, 3000);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const itemsData = await fetchItems();
        const imagesData = await fetchImages();

        setItems(itemsData.items || []);
        setImages(imagesData.status === "ok" ? imagesData.data || [] : []);

        // Show success popup if items are loaded
        if (itemsData.items && itemsData.items.length > 0) {
          showPopup("Items loaded successfully!", "success");
        } else {
          showPopup("No items available.", "info");
        }
      } catch (error) {
        showPopup("Failed to load items. Please try again.", "error");
      }
    };

    loadData();
  }, []);

  return (
    <div className="seller-dashboard">
      <Nav />
      <br /><br /><br />
      <div>
        <h2 className="seller-header">Seller Dashboard</h2>
        <div className="items-container">
          {items.length > 0 ? (
            items.map((item, i) => {
              const itemImage = images.find((img) => img.itemId === item._id) || images[i];
              const imageUrl = itemImage ? `http://localhost:5000/files/${itemImage.image}` : null;
              const imageId = itemImage ? itemImage._id : null;

              return (
                <div key={i} className="item-card">
                  <Item item={{ ...item, imageUrl, imageId }} />
                </div>
              );
            })
          ) : (
            <p>No items available.</p>
          )}
        </div>
      </div>

      {/* Popup Message */}
      {popup.visible && (
        <div className={`popup-message ${popup.type}`}>
          <span>{popup.message}</span>
        </div>
      )}
    </div>
  );
}

export default SellerDashboard;