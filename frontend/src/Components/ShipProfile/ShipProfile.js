import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
//import './ShipProfile.css';

const ShipProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/ship-profile');
      console.log('API Response:', response.data);
      if (response.data.shipProfile && response.data.shipProfile.length > 0) {
        setProfile(response.data.bidUsers[0]);
        console.log('Profile set to:', response.data.shipProfile[0]);
      } else {
        setProfile(null);
        console.log('No users found, profile set to null');
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      if (err.response && err.response.status === 404) {
        setProfile(null);
        console.log('404 received, profile set to null');
      } else {
        setError('Failed to load profile.');
        console.log('Error details:', err.response ? err.response.data : err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [location]);

  useEffect(() => {
    if (location.state?.justUpdated || location.state?.justDeleted) {
      fetchProfile();
    }
  }, [location.state]);

  const handleEditProfile = () => {
    if (profile) {
      navigate('/editshipprofile', { state: { editDetail: profile } });
    } else {
      navigate('/editshipprofile');
    }
  };

  if (loading) {
    return <div className="shipprofile-loading">Loading profile...</div>;
  }

  if (error) {
    return <div className="shipprofile-error-message">{error}</div>;
  }

  const blankProfile = {
    name: 'Not set',
    address: 'Not set',
    dob: 'Not set',
    email: 'Not set',
    phone: 'Not set',
    gender: 'Not set',
    username: 'Not set',
    picture: null,
  };

  const displayProfile = profile || blankProfile;
  const isBlank = !profile;

  return (
    <div className="shipprofile-ship-profile-container">
      <h1 className="shipprofile-h1">Profile</h1>
      <div className={`shipprofile-profile-wrapper ${isBlank ? 'shipprofile-blank-profile' : ''}`}>
        <div className="shipprofile-profile-left">
          <div className="shipprofile-profile-pic-section">
            {displayProfile.picture ? (
              <img
                src={`http://localhost:5000/${displayProfile.picture}`} // Adjust path if necessary (e.g., http://localhost:5000/uploads/${displayProfile.picture})
                alt="Profile"
                className="shipprofile-profile-pic"
                onError={(e) => console.log('Image load error:', e)} // Log errors if the image fails to load
              />
            ) : (
              <div className="shipprofile-pic-placeholder">
                <span role="img" aria-label="user">👤</span>
              </div>
            )}
          </div>
          <h2>{displayProfile.name}</h2>
          <p className="shipprofile-location">{displayProfile.address}</p>
          
          <div className="shipprofile-social-links">
            <h3>Connect</h3>
            <ul>
              <li>
                <span className="shipprofile-icon website">🌐</span>
                {isBlank ? (
                  <span className="shipprofile-not-set">Not set</span>
                ) : (
                  <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                    Website
                  </a>
                )}
              </li>
              <li>
                <span className="shipprofile-icon github">🐙</span>
                {isBlank ? (
                  <span className="shipprofile-not-set">Not set</span>
                ) : (
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                )}
              </li>
              <li>
                <span className="shipprofile-icon twitter">🐦</span>
                {isBlank ? (
                  <span className="shipprofile-not-set">Not set</span>
                ) : (
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                )}
              </li>
              <li>
                <span className="shipprofile-icon instagram">📸</span>
                {isBlank ? (
                  <span className="shipprofile-not-set">Not set</span>
                ) : (
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                )}
              </li>
              <li>
                <span className="shipprofile-icon facebook">📘</span>
                {isBlank ? (
                  <span className="shipprofile-not-set">Not set</span>
                ) : (
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="shipprofile-profile-right">
          <div className="shipprofile-profile-details bidprofile-card">
            <h3>Personal Information</h3>
            <div className="shipprofile-detail-item">
              <span className="shipprofile-label">Full Name</span>
              <span className={`shipprofile-value ${isBlank ? 'shipprofile-not-set' : ''}`}>
                {displayProfile.name}
              </span>
            </div>
            <div className="shipprofile-detail-item">
              <span className="shipprofile-label">Date of Birth</span>
              <span className={`shipprofile-value ${isBlank ? 'shipprofile-not-set' : ''}`}>
                {displayProfile.dob}
              </span>
            </div>
            <div className="shipprofile-detail-item">
              <span className="shipprofile-label">Email</span>
              <span className={`shipprofile-value ${isBlank ? 'shipprofile-not-set' : ''}`}>
                {displayProfile.email}
              </span>
            </div>
            <div className="shipprofile-detail-item">
              <span className="shipprofile-label">Phone</span>
              <span className={`shipprofile-value ${isBlank ? 'shipprofile-not-set' : ''}`}>
                {displayProfile.phone}
              </span>
            </div>

            {/*
            <div className="shipprofile-detail-item">
              <span className="shipprofile-label">Mobile</span>
              <span className={`shipprofile-value ${isBlank ? 'shipprofile-not-set' : ''}`}>
                {displayProfile.phone}
              </span>
            </div>
            */}
            <div className="shipprofile-detail-item">
              <span className="shipprofile-label">Address</span>
              <span className={`shipprofile-value ${isBlank ? 'shipprofile-not-set' : ''}`}>
                {displayProfile.address}
              </span>
            </div>
            <div className="shipprofile-detail-item">
              <span className="shipprofile-label">Gender</span>
              <span className={`shipprofile-value ${isBlank ? 'shipprofile-not-set' : ''}`}>
                {displayProfile.gender}
              </span>
            </div>
            <div className="shipprofile-detail-item">
              <span className="shipprofile-label">Username</span>
              <span className={`shipprofile-value ${isBlank ? 'shipprofile-not-set' : ''}`}>
                {displayProfile.username}
              </span>
            </div>
            <button className="shipprofile-btn-edit" onClick={handleEditProfile}>
              {isBlank ? 'Create Profile' : 'Edit Profile'}
            </button>
          </div>
          
          
</div>


      </div>
    </div>
  );
};

export default ShipProfile;