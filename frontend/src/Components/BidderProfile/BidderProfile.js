import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './BidderProfile.css';

const BidderProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // fetch profile data from the api
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/bid-users');
      console.log('api response:', response.data);
      if (response.data.bidUsers && response.data.bidUsers.length > 0) {
        setProfile(response.data.bidUsers[0]);
        console.log('profile set to:', response.data.bidUsers[0]);
      } else {
        setProfile(null);
        console.log('no users found, profile set to null');
      }
    } catch (err) {
      console.error('error fetching profile:', err);
      if (err.response && err.response.status === 404) {
        setProfile(null);
        console.log('404 received, profile set to null');
      } else {
        setError('failed to load profile.');
        console.log('error details:', err.response ? err.response.data : err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // fetch profile when the component mounts or location changes
  useEffect(() => {
    fetchProfile();
  }, [location]);

  // re-fetch profile if recently updated or deleted
  useEffect(() => {
    if (location.state?.justUpdated || location.state?.justDeleted) {
      fetchProfile();
    }
  }, [location.state]);

  // navigate to the edit profile page
  const handleEditProfile = () => {
    if (profile) {
      navigate('/edit-bidder-profile', { state: { editDetail: profile } });
    } else {
      navigate('/edit-bidder-profile');
    }
  };

  if (loading) {
    return <div className="bidprofile-loading">loading profile...</div>;
  }

  if (error) {
    return <div className="bidprofile-error-message">{error}</div>;
  }

  // default values for a blank profile
  const blankProfile = {
    name: 'not set',
    address: 'not set',
    email: 'not set',
    phone: 'not set',
    gender: 'not set',
    username: 'not set',
    picture: null,
  };

  const displayProfile = profile || blankProfile;
  const isBlank = !profile;

  return (
    <div className="bidprofile-bidder-profile-container">
      <h1 className="bidprofile-h1">my bidder profile</h1>
      <div className={`bidprofile-profile-wrapper ${isBlank ? 'bidprofile-blank-profile' : ''}`}>
        <div className="bidprofile-profile-left">
          <div className="bidprofile-profile-pic-section">
            {displayProfile.picture ? (
              <img
                src={`http://localhost:5000/${displayProfile.picture}`} // adjust path if necessary
                alt="profile"
                className="bidprofile-profile-pic"
                onError={(e) => console.log('image load error:', e)} // log errors if the image fails to load
              />
            ) : (
              <div className="bidprofile-pic-placeholder">
                <span role="img" aria-label="user">👤</span>
              </div>
            )}
          </div>
          <h2>{displayProfile.name}</h2>
          <p className="bidprofile-location">{displayProfile.address}</p>
          <div className="bidprofile-action-buttons">
            <button className="bidprofile-btn-follow" disabled={isBlank}>
              follow
            </button>
            <button className="bidprofile-btn-message" disabled={isBlank}>
              message
            </button>
          </div>
          <div className="bidprofile-social-links">
            <h3>connect</h3>
            <ul>
              <li>
                <span className="bidprofile-icon website">🌐</span>
                {isBlank ? (
                  <span className="bidprofile-not-set">not set</span>
                ) : (
                  <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                    website
                  </a>
                )}
              </li>
              <li>
                <span className="bidprofile-icon github">🐙</span>
                {isBlank ? (
                  <span className="bidprofile-not-set">not set</span>
                ) : (
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    github
                  </a>
                )}
              </li>
              <li>
                <span className="bidprofile-icon twitter">🐦</span>
                {isBlank ? (
                  <span className="bidprofile-not-set">not set</span>
                ) : (
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    twitter
                  </a>
                )}
              </li>
              <li>
                <span className="bidprofile-icon instagram">📸</span>
                {isBlank ? (
                  <span className="bidprofile-not-set">not set</span>
                ) : (
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    instagram
                  </a>
                )}
              </li>
              <li>
                <span className="bidprofile-icon facebook">📘</span>
                {isBlank ? (
                  <span className="bidprofile-not-set">not set</span>
                ) : (
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    facebook
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="bidprofile-profile-right">
          <div className="bidprofile-profile-details bidprofile-card">
            <h3>personal information</h3>
            <div className="bidprofile-detail-item">
              <span className="bidprofile-label">full name</span>
              <span className={`bidprofile-value ${isBlank ? 'bidprofile-not-set' : ''}`}>
                {displayProfile.name}
              </span>
            </div>
            <div className="bidprofile-detail-item">
              <span className="bidprofile-label">email</span>
              <span className={`bidprofile-value ${isBlank ? 'bidprofile-not-set' : ''}`}>
                {displayProfile.email}
              </span>
            </div>
            <div className="bidprofile-detail-item">
              <span className="bidprofile-label">phone</span>
              <span className={`bidprofile-value ${isBlank ? 'bidprofile-not-set' : ''}`}>
                {displayProfile.phone}
              </span>
            </div>
            <div className="bidprofile-detail-item">
              <span className="bidprofile-label">mobile</span>
              <span className={`bidprofile-value ${isBlank ? 'bidprofile-not-set' : ''}`}>
                {displayProfile.phone}
              </span>
            </div>
            <div className="bidprofile-detail-item">
              <span className="bidprofile-label">address</span>
              <span className={`bidprofile-value ${isBlank ? 'bidprofile-not-set' : ''}`}>
                {displayProfile.address}
              </span>
            </div>
            <div className="bidprofile-detail-item">
              <span className="bidprofile-label">gender</span>
              <span className={`bidprofile-value ${isBlank ? 'bidprofile-not-set' : ''}`}>
                {displayProfile.gender}
              </span>
            </div>
            <div className="bidprofile-detail-item">
              <span className="bidprofile-label">username</span>
              <span className={`bidprofile-value ${isBlank ? 'bidprofile-not-set' : ''}`}>
                {displayProfile.username}
              </span>
            </div>
            <button className="bidprofile-btn-edit" onClick={handleEditProfile}>
              {isBlank ? 'create profile' : 'edit profile'}
            </button>
          </div>
          <div className="bidprofile-auction-stats bidprofile-card">
            <h3>auction statistics</h3>
            {isBlank ? (
              <p className="bidprofile-not-set">no auction activity yet.</p>
            ) : (
              <>
                <div className="bidprofile-stat-item">
                  <span className="bidprofile-stat-label">bids placed</span>
                  <div className="bidprofile-progress-bar">
                    <div className="bidprofile-progress" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="bidprofile-stat-item">
                  <span className="bidprofile-stat-label">auctions won</span>
                  <div className="bidprofile-progress-bar">
                    <div className="bidprofile-progress" style={{ width: '50%' }}></div>
                  </div>
                </div>
                <div className="bidprofile-stat-item">
                  <span className="bidprofile-stat-label">active bids</span>
                  <div className="bidprofile-progress-bar">
                    <div className="bidprofile-progress" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div className="bidprofile-stat-item">
                  <span className="bidprofile-stat-label">total spent</span>
                  <div className="bidprofile-progress-bar">
                    <div className="bidprofile-progress" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidderProfile;
