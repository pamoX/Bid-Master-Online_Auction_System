import React, { useState, useEffect } from "react";
import Nav from '../Nav/Nav';
import Item from "../Item/Item";
import axios from 'axios';
import './SellerDashboard.css';

const URL = "http://localhost:5000/items";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function SellerDashboard() {
  const [items, setItems] = useState();

  useEffect(() => {
    fetchHandler().then((data) => setItems(data.items));
  }, []);

  return (
    <div className="seller-dashboard">
      <Nav /><br/><br/><br/>
      <div>
        <h2 className="seller-header">Seller Dashboard</h2>
        
        {/* Items Section */}
        <div className="items-container">
          {items && items.map((item, i) => (
            <div key={i} className="item-card">
              <Item item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;