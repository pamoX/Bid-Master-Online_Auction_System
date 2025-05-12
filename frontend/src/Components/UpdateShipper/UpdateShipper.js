import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { publicRequest } from '../../requestMethods';

function UpdateShipper() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        providerid: '',
        companyname: '',
        companyaddress: '',
        companyemail: '',
        companyphone: '',
        companytype: '',
        rateperkg: ''
    });

    useEffect(() => {
        const fetchShipper = async () => {
            try {
                const res = await publicRequest.get(`/shippers/${id}`);
                setFormData(res.data.data);
            } catch (error) {
                console.error('Error fetching shipper:', error);
            }
        };
        fetchShipper();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await publicRequest.put(`/shippers/${id}`, {
                ...formData,
                rateperkg: Number(formData.rateperkg)
            });
            toast.success('Courier updated!');
            navigate('/admin/shippers');
        } catch (error) {
            toast.error('Failed to update courier');
        }
    };

    return React.createElement(
        'div',
        { className: 'max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10' },
        React.createElement(
            'h2',
            { className: 'text-2xl font-bold mb-6' },
            'Update Courier'
        ),
        React.createElement(
            'form',
            { onSubmit: handleSubmit, className: 'space-y-4' },
            React.createElement(
                'div',
                null,
                React.createElement(
                    'label',
                    { className: 'block text-sm font-medium' },
                    'Provider ID'
                ),
                React.createElement('input', {
                    type: 'text',
                    name: 'providerid',
                    value: formData.providerid || '',
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    required: true
                })
            ),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'label',
                    { className: 'block text-sm font-medium' },
                    'Company Name'
                ),
                React.createElement('input', {
                    type: 'text',
                    name: 'companyname',
                    value: formData.companyname || '',
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    required: true
                })
            ),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'label',
                    { className: 'block text-sm font-medium' },
                    'Address'
                ),
                React.createElement('input', {
                    type: 'text',
                    name: 'companyaddress',
                    value: formData.companyaddress || '',
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    required: true
                })
            ),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'label',
                    { className: 'block text-sm font-medium' },
                    'Email'
                ),
                React.createElement('input', {
                    type: 'email',
                    name: 'companyemail',
                    value: formData.companyemail || '',
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    required: true
                })
            ),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'label',
                    { className: 'block text-sm font-medium' },
                    'Phone'
                ),
                React.createElement('input', {
                    type: 'text',
                    name: 'companyphone',
                    value: formData.companyphone || '',
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    required: true
                })
            ),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'label',
                    { className: 'block text-sm font-medium' },
                    'Company Type'
                ),
                React.createElement(
                    'select',
                    {
                        name: 'companytype',
                        value: formData.companytype || '',
                        onChange: handleChange,
                        className: 'w-full p-2 border rounded',
                        required: true
                    },
                    React.createElement('option', { value: '' }, 'Select Type'),
                    React.createElement('option', { value: 'Local' }, 'Local'),
                    React.createElement('option', { value: 'International' }, 'International')
                )
            ),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'label',
                    { className: 'block text-sm font-medium' },
                    'Rate per kg ($)'
                ),
                React.createElement('input', {
                    type: 'number',
                    name: 'rateperkg',
                    value: formData.rateperkg || '',
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    min: '0',
                    step: '0.01',
                    required: true
                })
            ),
            React.createElement(
                'div',
                { className: 'flex space-x-4' },
                React.createElement(
                    'button',
                    {
                        type: 'submit',
                        className: 'w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
                    },
                    'Update'
                ),
                React.createElement(
                    'button',
                    {
                        type: 'button',
                        onClick: () => navigate('/admin/shippers'),
                        className: 'w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600'
                    },
                    'Cancel'
                )
            )
        )
    );
}

export default UpdateShipper;


/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateShipper.css'; // Added CSS import

const URL = 'http://localhost:5000/shippers'; // Fixed URL (removed trailing slash)

function UpdateShipper() {
    const [shipperData, setShipperData] = useState({
        providerid: '',
        companyname: '',
        companyaddress: '',
        companyemail: '',
        companyphone: '',
        companytype: '',
        rateperkg: '', // Added rateperkg
    });
    const { id } = useParams(); // Get the shipper ID from the URL
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const res = await axios.get(`${URL}/${id}`);
                setShipperData(res.data.shippers || res.data); // Handle possible response structure
            } catch (error) {
                console.error('Error fetching shipper:', error);
            }
        };
        fetchHandler();
    }, [id]);

    const handleChange = (e) => {
        setShipperData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const sendRequest = async () => {
        await axios.put(`${URL}/${id}`, {
            providerid: String(shipperData.providerid),
            companyname: String(shipperData.companyname),
            companyaddress: String(shipperData.companyaddress),
            companyemail: String(shipperData.companyemail),
            companyphone: String(shipperData.companyphone),
            companytype: String(shipperData.companytype),
            rateperkg: String(shipperData.rateperkg), // Added rateperkg
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendRequest();
            navigate('/shippers');
        } catch (error) {
            console.error('Error updating shipper:', error);
        }
    };

    return (
        <div className="sh-create-shipper-container">
            <form className="sh-shipper-form" onSubmit={handleSubmit}>
                <h2>Update Shipping Service Provider</h2>

                <div className="sh-form-group">
                    <label htmlFor="providerid">Shipping Provider ID</label>
                    <input
                        type="text"
                        id="sh-providerid"
                        name="sh-providerid"
                        value={shipperData.providerid || ''} // Fixed to use shipperData with fallback
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="sh-form-group">
                    <label htmlFor="companyname">Company Name</label>
                    <input
                        type="text"
                        id="sh-companyname"
                        name="sh-companyname"
                        value={shipperData.companyname || ''} // Fixed to use shipperData with fallback
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="sh-form-group">
                    <label htmlFor="companyaddress">Address</label>
                    <input
                        type="text"
                        id="sh-companyaddress"
                        name="sh-companyaddress"
                        value={shipperData.companyaddress || ''} // Fixed to use shipperData with fallback
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="sh-form-group">
                    <label htmlFor="companyemail">Email Address</label>
                    <input
                        type="email"
                        id="sh-companyemail"
                        name="sh-companyemail"
                        value={shipperData.companyemail || ''} // Fixed to use shipperData with fallback
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="sh-form-group">
                    <label htmlFor="companyphone">Contact Number</label>
                    <input
                        type="tel"
                        id="sh-companyphone"
                        name="sh-companyphone"
                        value={shipperData.companyphone || ''} // Fixed to use shipperData with fallback
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="sh-form-group">
                    <label htmlFor="companytype">Company Type</label>
                    <select
                        id="sh-companytype"
                        name="sh-companytype"
                        value={shipperData.companytype || ''} // Fixed to use shipperData with fallback
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="Local">Local</option>
                        <option value="International">International</option>
                    </select>
                </div>

                <div className="sh-form-actions">
                    <button type="submit" className="sh-btn-submit">
                        Update Shipping Service Provider
                    </button>
                    <button
                        type="button"
                        className="sh-btn-cancel"
                        onClick={() => navigate('/shippers')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateShipper;
*/