import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from '../Nav/Nav';
import "./SellerListing.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

const ITEMS_URL = "http://localhost:5000/items";
const IMAGES_URL = "http://localhost:5000/getImage";

const fetchItems = async () => {
  return await axios.get(ITEMS_URL).then((res) => res.data);
};

const fetchImages = async () => {
  return await axios.get(IMAGES_URL).then((res) => res.data);
};

const SellerListing = () => {
  const [listings, setListings] = useState([]); // Fixed syntax error
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const itemsData = await fetchItems();
        const imagesData = await fetchImages();

        // Map items to match listing structure
        const mappedListings = (itemsData.items || []).map(item => ({
          id: item._id,
          title: item.title,
          description: item.description,
          startingBid: item.startingBid || 0,
          status: item.status || "Pending", // Default to Pending if not provided
          startDate: item.startDate || new Date().toISOString().split("T")[0], // Default to today if not provided
        }));

        setListings(mappedListings);
        setImages(imagesData.status === "ok" ? imagesData.data || [] : []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.patch(`${ITEMS_URL}/${id}`, { status: "Live" });
      setListings(listings.map(listing => 
        listing.id === id && listing.status === "Pending" 
          ? { ...listing, status: "Live" } 
          : listing
      ));
    } catch (err) {
      alert("Failed to approve listing. Please try again.");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`${ITEMS_URL}/${id}`);
      setListings(listings.filter(listing => listing.id !== id));
    } catch (err) {
      alert("Failed to reject listing. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${ITEMS_URL}/${id}`);
      setListings(listings.filter(listing => listing.id !== id));
    } catch (err) {
      alert("Failed to delete listing. Please try again.");
    }
  };

  const filteredListings = filter === "All" 
    ? listings 
    : listings.filter(listing => listing.status === filter);

  const sortedListings = [...filteredListings].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  if (loading) {
    return (
      <div className="seller-listings-page">
        <Nav /><br/><br/>
        <h1>Seller Listings</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="seller-listings-page">
        <Nav /><br/><br/>
        <h1>Seller Listings</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="seller-listings-page">
      <Nav /><br/><br/>
      <h1>Seller Listings</h1>
      <p>Manage your auction listings below.</p>

      <div className="navigation-links">
        <Link to="/create-listing">Create Listing</Link>
        <Link to="/live-bids">Live Bids</Link>
        <Link to="/seller-dashboard">Dashboard</Link>
      </div>

      <div className="grid-container">
        <div className="card listings-container">
          <h2>Your Listings</h2>
          <div className="filter-section">
            <label>Filter by Status: </label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Draft">Draft</option>
              <option value="Live">Live</option>
              <option value="Ended">Ended</option>
            </select>
          </div>
          {sortedListings.length === 0 ? (
            <p>No listings available.</p>
          ) : (
            <table className="listings-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Starting Bid</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedListings.map((listing) => {
                  const itemImage = images.find((img) => img.itemId === listing.id);
                  const imageUrl = itemImage ? `http://localhost:5000/files/${itemImage.image}` : null;

                  return (
                    <tr key={listing.id}>
                      <td>
                        {imageUrl ? (
                          <img src={imageUrl} alt={listing.title} className="listing-image" />
                        ) : (
                          <span>No Image</span>
                        )}
                      </td>
                      <td>{listing.title}</td>
                      <td>{listing.description}</td>
                      <td>${listing.startingBid}</td>
                      <td>{listing.status}</td>
                      <td>{listing.startDate}</td>
                      <td>
                        {listing.status === "Pending" ? (
                          <>
                            <button 
                              className="approve-btn" 
                              onClick={() => handleApprove(listing.id)}
                            >
                              Approve
                            </button>
                            <br/>
                            <button 
                              className="reject-btn" 
                              onClick={() => handleReject(listing.id)}
                            >
                              Reject
                            </button>
                          </>
                        ) : listing.status === "Draft" ? (
                          <>
                            <button 
                              className="edit-btn" 
                              onClick={() => alert(`Edit listing ${listing.id}`)}
                            >
                              Edit
                            </button>
                            <button 
                              className="delete-btn" 
                              onClick={() => handleDelete(listing.id)}
                            >
                              Delete
                            </button>
                          </>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
};

export default SellerListing;