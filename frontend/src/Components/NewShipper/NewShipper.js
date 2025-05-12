import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { publicRequest } from '../../requestMethods';

function NewShipper() {
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await publicRequest.post('/shippers', {
                ...formData,
                rateperkg: Number(formData.rateperkg)
            });
            toast.success('Courier added!');
            navigate('/admin/shippers');
        } catch (error) {
            toast.error('Failed to add courier');
        }
    };

    return React.createElement(
        'div',
        { className: 'max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10' },
        React.createElement(
            'h2',
            { className: 'text-2xl font-bold mb-6' },
            'Add New Courier'
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
                    value: formData.providerid,
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
                    value: formData.companyname,
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
                    value: formData.companyaddress,
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
                    value: formData.companyemail,
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
                    value: formData.companyphone,
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
                        value: formData.companytype,
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
                    value: formData.rateperkg,
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    min: '0',
                    step: '0.01',
                    required: true
                })
            ),
            React.createElement(
                'button',
                {
                    type: 'submit',
                    className: 'w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
                },
                'Add Courier'
            )
        )
    );
}

export default NewShipper;

/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NewShipper.css';

const URL = 'http://localhost:5000/shippers';

function NewShipper() {
    const navigate = useNavigate();

    const [shipper, setShipper] = useState({
        providerid: '',
        companyname: '',
        companyaddress: '',
        companyemail: '',
        companyphone: '',
        companytype: '',
        rateperkg: ''
    });

    const handleChange = (e) => {
        setShipper((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting shipper data:', shipper);
        try {
            await sendRequest();
            navigate('/shippers');
        } catch (error) {
            console.error('Error creating shipper:', error);
        }
    };

    const sendRequest = async () => {
        const response = await axios.post(URL, {
            providerid: String(shipper.providerid),
            companyname: String(shipper.companyname),
            companyaddress: String(shipper.companyaddress),
            companyemail: String(shipper.companyemail),
            companyphone: String(shipper.companyphone),
            companytype: String(shipper.companytype),
            rateperkg: Number(shipper.rateperkg)
        });
        
        console.log('Server response:', response.data);
        return response.data;
    };

    return (
        <div className="sh-create-shipper-container">
            <form className="sh-shipper-form" onSubmit={handleSubmit}>
                <h2>Create New Shipping Services Provider</h2>

                <div className="sh-form-group">
                    <label htmlFor="sh-providerid">Shipping Provider ID</label>
                    <input
                        type="text"
                        id="sh-providerid"
                        name="sh-providerid"
                        value={shipper.providerid}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="sh-form-group">
                    <label htmlFor="sh-companyname">Company Name</label>
                    <input
                        type="text"
                        id="sh-companyname"
                        name="sh-companyname"
                        value={shipper.companyname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="sh-form-group">
                    <label htmlFor="sh-companyaddress">Address</label>
                    <input
                        type="text"
                        id="sh-companyaddress"
                        name="sh-companyaddress"
                        value={shipper.companyaddress}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="sh-form-group">
                    <label htmlFor="sh-companyemail">Email Address</label>
                    <input
                        type="email"
                        id="sh-companyemail"
                        name="sh-companyemail"
                        value={shipper.companyemail}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="sh-form-group">
                    <label htmlFor="sh-companyphone">Contact Number</label>
                    <input
                        type="tel"
                        id="sh-companyphone"
                        name="sh-companyphone"
                        value={shipper.companyphone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="sh-form-group">
                    <label htmlFor="sh-companytype">Company Type</label>
                    <select
                        id="sh-companytype"
                        name="sh-companytype"
                        value={shipper.companytype}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="Local">Local</option>
                        <option value="International">International</option>
                    </select>
                </div>

                <div className="sh-form-group">
                    <label htmlFor="sh-rateperkg">Rate per kg ($)</label>
                    <input
                        type="number"
                        id="sh-rateperkg"
                        name="sh-rateperkg"
                        step="0.01"
                        min="0"
                        value={shipper.rateperkg}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="sh-form-actions">
                    {//Removed the Link wrapper that was preventing form submission }
                    <button type="submit" className="sh-btn-submit">
                        Add New Shipping Service Provider
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NewShipper;
*/