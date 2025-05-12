import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
//import './EditShipProfile.css'; // Updated CSS file name

const EditShipProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    gender: '',
    address: '',
    phone: '',
    username: '',
    password: '',
    picture: null,
  });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.editDetail) {
      const { _id, name, email, dob, gender, address, phone, username, picture } = location.state.editDetail;
      setFormData({
        name: name || '',
        email: email || '',
        dob: dob || '',
        gender: gender || '',
        address: address || '',
        phone: phone || '',
        username: username || '',
        password: '',
        picture: null,
      });
      setEditingId(_id);
      if (picture) setProfilePic(`http://localhost:5000/${picture}`);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'age' ? (value === '' ? '' : parseInt(value, 10)) : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, picture: file });
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmUpdate = window.confirm('Are you sure you want to update your profile?');
    if (confirmUpdate) {
      setLoading(true);
      try {
        const submissionData = new FormData();
        Object.keys(formData).forEach((key) => {
          if (formData[key] !== null && formData[key] !== '') {
            submissionData.append(key, formData[key]);
          }
        });

        const url = editingId
          ? `http://localhost:5000/ship-users/${editingId}`
          : `http://localhost:5000/ship-users`;
        const method = editingId ? axios.put : axios.post;

        await method(url, submissionData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        navigate('/shipadminprofile'); // Redirect to profile page
      } catch (err) {
        setError(`Failed to ${editingId ? 'update' : 'create'} profile.`);
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async () => {
    if (!editingId) return;
    const confirmDelete = window.confirm('Are you sure you want to delete your profile?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/ship-users/${editingId}`);
        navigate('/shipadmin-profile'); // Redirect to empty profile
      } catch (err) {
        setError('Failed to delete profile.');
        console.error('Error deleting profile:', err);
      }
    }
  };

  return (
    <div className="editshipprofile-edit-shipadmin-profile-container">
      <h1>{editingId ? 'Edit Profile' : 'Create Profile'}</h1>

      {error && <div className="editshipprofile-error-message">{error}</div>}
      {loading && <div className="editshipprofile-loading-overlay">Processing...</div>}

      <div className="editshipprofile-form-container">
        <div className="editshipprofile-profile-pic-section">
          {profilePic ? (
            <img src={profilePic} alt="Preview" className="editshipprofile-profile-pic" />
          ) : (
            <div className="editshipprofile-pic-placeholder">No Image Selected</div>
          )}
          <input
            type="file"
            id="picture"
            name="picture"
            accept="image/*"
            onChange={handleFileChange}
            className="editshipprofile-file-input"
          />
          <label htmlFor="picture" className="editshipprofile-file-label">
            {profilePic ? 'Change Picture' : 'Upload Picture'}
          </label>
        </div>

        <form onSubmit={handleSubmit} className="editshipprofile-profile-form">
          <div className="editshipprofile-form-grid">
            <div className="editshipprofile-form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="editshipprofile-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="editshipprofile-form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="editshipprofile-form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="editshipprofile-form-group full-width">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="editshipprofile-form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="editshipprofile-form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="editshipprofile-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required={!editingId}
              />
            </div>
          </div>

          <div className="editshipprofile-button-group">
            <button type="submit" className="editshipprofile-btn-save" disabled={loading}>
              {editingId ? 'Update Profile' : 'Create Profile'}
            </button>
            {editingId && (
              <button
                type="button"
                className="editshipprofile-btn-delete"
                onClick={handleDelete}
                disabled={loading}
              >
                Delete Profile
              </button>
            )}
            <button
              type="button"
              className="editshipprofile-btn-cancel"
              onClick={() => navigate('/shipadminprofile')}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditShipProfile;
