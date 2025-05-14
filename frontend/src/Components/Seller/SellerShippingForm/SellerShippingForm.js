import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { publicRequest } from '../../../requestMethods.js';
import './SellerShippingForm.css';

function SellerShippingForm() {
  const { auctionid } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemid: '',
    itemname: '',
    userName: '',
    selleremail: '',
    phone: '',
    from: '',
    weight: ''
  });

  useEffect(() => {
    const fetchItemDetails = async () => {
      if (auctionid) {
        try {
          // Fetch item details from the backend
          const response = await publicRequest.get(`/items/${auctionid}`);
          const itemData = response.data;
          
          // Update form data with item details
          setFormData(prev => ({
            ...prev,
            itemid: auctionid,
            itemname: itemData.name || '',
          }));

          // Check if there's existing seller data
          const existingData = localStorage.getItem(`seller_shipping_${auctionid}`);
          if (existingData) {
            setFormData(prev => ({
              ...prev,
              ...JSON.parse(existingData)
            }));
          }
        } catch (error) {
          console.error('Error fetching item details:', error);
          toast.error('Failed to load item details');
        }
      }
    };

    fetchItemDetails();
  }, [auctionid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    
    // If item ID is changed, fetch the item details
    if (name === 'itemid' && value) {
      fetchItemDetails(value);
    }
    
    // Save to localStorage
    if (formData.itemid) {
      localStorage.setItem(`seller_shipping_${formData.itemid}`, JSON.stringify(newData));
    }
  };

  const fetchItemDetails = async (itemId) => {
    try {
      const response = await publicRequest.get(`/items/${itemId}`);
      const itemData = response.data;
      
      setFormData(prev => ({
        ...prev,
        itemname: itemData.name || '',
      }));
    } catch (error) {
      console.error('Error fetching item details:', error);
      toast.error('Failed to load item details');
      // Clear item name if item ID is invalid
      setFormData(prev => ({
        ...prev,
        itemname: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate item ID
      if (!formData.itemid) {
        toast.error('Please enter an item ID');
        return;
      }

      // Save seller data to localStorage
      localStorage.setItem(`seller_shipping_${formData.itemid}`, JSON.stringify(formData));
      
      // Check if buyer data exists
      const buyerData = localStorage.getItem(`buyer_shipping_${formData.itemid}`);
      
      if (buyerData) {
        // If buyer data exists, combine and submit
        const buyerShippingData = JSON.parse(buyerData);
        const combinedData = {
          ...formData,
          ...buyerShippingData,
          status: 'Pending',
          collectionCenter: 'Main Collection Center',
          cost: 0,
        };

        const response = await publicRequest.post('/shipments', combinedData);

        if (response.data.success) {
          // Clear localStorage after successful submission
          localStorage.removeItem(`seller_shipping_${formData.itemid}`);
          localStorage.removeItem(`buyer_shipping_${formData.itemid}`);
          toast.success('Shipping details submitted successfully!');
          navigate('/myshipments');
        } else {
          throw new Error(response.data.message || 'Failed to submit details');
        }
      } else {
        // If no buyer data, just save seller data and show message
        toast.info('Seller details saved. Waiting for buyer details.');
        navigate('/orders');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.response?.data?.message || 'Failed to submit shipping details');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6">Seller Shipping Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Item ID</label>
          <input
            type="text"
            name="itemid"
            value={formData.itemid}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            placeholder="Enter item ID"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Item Name</label>
          <input
            type="text"
            name="itemname"
            value={formData.itemname}
            className="w-full p-2 border rounded"
            required
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Seller Email</label>
          <input
            type="email"
            name="selleremail"
            value={formData.selleremail}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Seller Phone</label>
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
          <label className="block text-sm font-medium">Pickup Address</label>
          <input
            type="text"
            name="from"
            value={formData.from}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
            step="0.1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SellerShippingForm;


/*const React = require('react');
const { useState } = require('react');
const { useParams, useNavigate } = require('react-router-dom');
const { toast } = require('react-toastify');
const { publicRequest } = require('../../../requestMethods.js');

function SellerShippingForm() {
   // const { auctionid } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        itemid: '',
        itemname: '',
        userName: '',
        email: '',
        phone: '',
        from: '',
        weight: '',
        shipmenttype: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await publicRequest.post('/shipments/pending', {
               auctionid,
                userType: 'seller',
                details: formData
            });
            toast.success('Shipping details submitted!');
            navigate('/orders');
        } catch (error) {
            toast.error('Failed to submit details');
        }
    };

    return React.createElement(
        'div',
        { className: 'max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10' },
        React.createElement('h2', { className: 'text-2xl font-bold mb-6' }, 'Seller Shipping Details'),
        React.createElement(
            'form',
            { onSubmit: handleSubmit, className: 'space-y-4' },
            React.createElement(
                'div',
                null,
                React.createElement('label', { className: 'block text-sm font-medium' }, 'Item ID'),
                React.createElement('input', {
                    type: 'text',
                    name: 'itemid',
                    value: formData.itemid,
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    required: true
                })
            ),
            React.createElement(
                'div',
                null,
                React.createElement('label', { className: 'block text-sm font-medium' }, 'Item Name'),
                React.createElement('input', {
                    type: 'text',
                    name: 'itemname',
                    value: formData.itemname,
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    required: true
                })
            ),
            React.createElement(
                'div',
                null,
                React.createElement('label', { className: 'block text-sm font-medium' }, 'Seller Name'),
                React.createElement('input', {
                    type: 'text',
                    name: 'sellername',
                    value: formData.sellername,
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    required: true
                })
            ),
            React.createElement(
                'div',
                null,
                React.createElement('label', { className: 'block text-sm font-medium' }, 'Seller Email'),
                React.createElement('input', {
                    type: 'email',
                    name: 'selleremail',
                    value: formData.selleremail,
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    required: true
                })
            ),
            React.createElement(
                'div',
                null,
                React.createElement('label', { className: 'block text-sm font-medium' }, 'Seller Phone'),
                React.createElement('input', {
                    type: 'text',
                    name: 'sellerphone',
                    value: formData.sellerphone,
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    required: true
                })
            ),
            React.createElement(
                'div',
                null,
                React.createElement('label', { className: 'block text-sm font-medium' }, 'Pickup Address'),
                React.createElement('input', {
                    type: 'text',
                    name: 'from',
                    value: formData.from,
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    required: true
                })
            ),
            React.createElement(
                'div',
                null,
                React.createElement('label', { className: 'block text-sm font-medium' }, 'Weight (g)'),
                React.createElement('input', {
                    type: 'number',
                    name: 'weight',
                    value: formData.weight,
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    min: '0',
                    step: '0.1',
                    required: true
                })
            ),
            /*
            React.createElement(
                'div',
                null,
                React.createElement('label', { className: 'block text-sm font-medium' }, 'Shipment Type'),
                React.createElement(
                    'select',
                    {
                        name: 'shipmenttype',
                        value: formData.shipmenttype,
                        onChange: handleChange,
                        className: 'w-full p-2 border rounded',
                        required: true
                    },
                    React.createElement('option', { value: '' }, 'Select Type'),
                    React.createElement('option', { value: 'Local' }, 'Local'),
                    React.createElement('option', { value: 'International' }, 'International')
                )
            ),
            //commet end
            React.createElement(
                'button',
                { type: 'submit', className: 'w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600' },
                'Submit'
            )
        )
    );
}

module.exports = SellerShippingForm;*/