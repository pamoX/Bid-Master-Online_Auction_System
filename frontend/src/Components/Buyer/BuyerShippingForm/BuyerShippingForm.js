import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { publicRequest } from '../../requestMethods.js';

function BuyerShippingForm() {
  const { auctionid } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    buyername: '',
    buyeremail: '',
    buyerphone: '',
    to: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await publicRequest.post('/shipments/pending', {
        auctionid,
        userType: 'buyer',
        details: formData
      });
      toast.success('Shipping details submitted! Awaiting seller details.');
      navigate('/orders');
    } catch (error) {
      toast.error('Failed to submit details');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6">Buyer Shipping Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="buyername"
            value={formData.buyername}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="buyeremail"
            value={formData.buyeremail}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            name="buyerphone"
            value={formData.buyerphone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Delivery Address</label>
          <input
            type="text"
            name="to"
            value={formData.to}
            onChange={handleChange}
            className="w-full p-2 border rounded"
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

export default BuyerShippingForm;

/*const React = require('react');
const { useState } = require('react');
const { useParams, useNavigate } = require('react-router-dom');
const { toast } = require('react-toastify');
const { publicRequest } = require('../../../requestMethods.js'); // Adjust the import path as necessary

function BuyerShippingForm() {
    const { auctionid } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        buyername: '',
        buyeremail: '',
        buyerphone: '',
        to: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await publicRequest.post('/shipments/pending', {
                auctionid,
                userType: 'buyer',
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
        React.createElement('h2', { className: 'text-2xl font-bold mb-6' }, 'Buyer Shipping Details'),
        React.createElement(
            'form',
            { onSubmit: handleSubmit, className: 'space-y-4' },
            React.createElement(
                'div',
                null,
                React.createElement('label', { className: 'block text-sm font-medium' }, 'Name'),
                React.createElement('input', {
                    type: 'text',
                    name: 'buyername',
                    value: formData.buyername,
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    required: true
                })
            ),
            React.createElement(
                'div',
                null,
                React.createElement('label', { className: 'block text-sm font-medium' }, 'Email'),
                React.createElement('input', {
                    type: 'email',
                    name: 'buyeremail',
                    value: formData.buyeremail,
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    required: true
                })
            ),
            React.createElement(
                'div',
                null,
                React.createElement('label', { className: 'block text-sm font-medium' }, 'Phone'),
                React.createElement('input', {
                    type: 'text',
                    name: 'buyerphone',
                    value: formData.buyerphone,
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    required: true
                })
            ),
            React.createElement(
                'div',
                null,
                React.createElement('label', { className: 'block text-sm font-medium' }, 'Delivery Address'),
                React.createElement('input', {
                    type: 'text',
                    name: 'to',
                    value: formData.to,
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded',
                    required: true
                })
            ),
            React.createElement(
                'button',
                { type: 'submit', className: 'w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600' },
                'Submit'
            )
        )
    );
}

module.exports = BuyerShippingForm; */