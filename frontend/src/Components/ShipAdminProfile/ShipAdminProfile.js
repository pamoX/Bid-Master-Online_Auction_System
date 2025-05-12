import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { publicRequest } from '../../requestMethods';

function ShipAdminProfile() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        profilePicture: ''
    });
    const [file, setFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Fetch Profile on Mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await publicRequest.get('/admin/profile');
                setFormData(res.data);
                setIsEditing(true);
            } catch (error) {
                if (error.response?.status === 404) {
                    setIsEditing(false);
                } else {
                    toast.error('Failed to fetch profile');
                }
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        if (e.target.name === 'profilePicture') {
            setFile(e.target.files[0]);
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('fullName', formData.fullName);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        data.append('password', formData.password);
        if (file) data.append('profilePicture', file);

        try {
            if (isEditing) {
                const res = await publicRequest.put('/admin/profile', data);
                setFormData(res.data);
                toast.success('Profile updated successfully!');
            } else {
                const res = await publicRequest.post('/admin/profile', data);
                setFormData(res.data);
                toast.success('Profile created successfully!');
                setIsEditing(true);
            }
            setFile(null);
        } catch (error) {
            toast.error('Failed to save profile');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete the admin profile?')) {
            try {
                await publicRequest.delete('/admin/profile');
                toast.success('Profile deleted successfully!');
                setFormData({ fullName: '', email: '', phone: '', password: '', profilePicture: '' });
                setFile(null);
                setIsEditing(false);
                navigate('/shipmanagedash');
            } catch (error) {
                toast.error('Failed to delete profile');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-6">
                {isEditing ? 'Edit Admin Profile' : 'Create Admin Profile'}
            </h2>
            {formData.profilePicture && (
                <div className="mb-4">
                    <img
                        src={`http://localhost:5000${formData.profilePicture}`}
                        alt="Profile"
                        className="w-32 h-32 object-cover rounded-full mx-auto"
                    />
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Phone Number</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Profile Picture</label>
                    <input
                        type="file"
                        name="profilePicture"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    {isEditing ? 'Update Profile' : 'Create Profile'}
                </button>
                {isEditing && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 mt-2"
                    >
                        Delete Profile
                    </button>
                )}
            </form>
        </div>
    );
}

export default ShipAdminProfile;