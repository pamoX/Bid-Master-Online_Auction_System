import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { publicRequest } from '../../../requestMethods.js';
import './BuyerShippingForm.css';

function BuyerShippingForm() {
  const { auctionid } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemid: '',
    itemname: '',
    buyername: '',
    buyeremail: '',
    buyerphone: '',
    to: '',
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

          // Check if there's existing buyer data
          const existingData = localStorage.getItem(`buyer_shipping_${auctionid}`);
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
      localStorage.setItem(`buyer_shipping_${formData.itemid}`, JSON.stringify(newData));
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

      // Submit buyer details to the pending shipments endpoint
      const response = await publicRequest.post('/shipments/pending', {
        auctionid: formData.itemid,
        userType: 'buyer',
        details: {
          buyername: formData.buyername,
          buyeremail: formData.buyeremail,
          buyerphone: formData.buyerphone,
          to: formData.to
        }
      });

      if (response.data.success) {
        // Clear localStorage after successful submission
        localStorage.removeItem(`buyer_shipping_${formData.itemid}`);
        toast.success('Buyer details submitted successfully!');
        navigate('/orders');
      } else {
        throw new Error(response.data.message || 'Failed to submit details');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.response?.data?.message || 'Failed to submit shipping details');
    }
  };

  return (
    <div className="form-with-image-container">
      <img
        src="https://images.unsplash.com/photo-1519671282429-b44660ead0a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
        alt="Shipping illustration"
        className="shipping-image"
      />
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6">Buyer Shipping Details</h2>
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
    </div>
  );
}

export default BuyerShippingForm;

/* import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { publicRequest } from '../../../requestMethods.js';
import './BuyerShippingForm.css';

function BuyerShippingForm() {
  const { auctionid } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemid: '',
    itemname: '',
    buyername: '',
    buyeremail: '',
    buyerphone: '',
    to: '',
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

          // Check if there's existing buyer data
          const existingData = localStorage.getItem(`buyer_shipping_${auctionid}`);
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
      localStorage.setItem(`buyer_shipping_${formData.itemid}`, JSON.stringify(newData));
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

      // Submit buyer details to the pending shipments endpoint
      const response = await publicRequest.post('/shipments/pending', {
        auctionid: formData.itemid,
        userType: 'buyer',
        details: {
          buyername: formData.buyername,
          buyeremail: formData.buyeremail,
          buyerphone: formData.buyerphone,
          to: formData.to
        }
      });

      if (response.data.success) {
        // Clear localStorage after successful submission
        localStorage.removeItem(`buyer_shipping_${formData.itemid}`);
        toast.success('Buyer details submitted successfully!');
        navigate('/orders');
      } else {
        throw new Error(response.data.message || 'Failed to submit details');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.response?.data?.message || 'Failed to submit shipping details');
    }
  };

  return (
    <div className="form-with-image-container">
      <img
        src="https://images.unsplash.com/photo-1519671282429-b44660ead0a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
        alt="Shipping illustration"
        className="shipping-image"
      />
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6">Buyer Shipping Details</h2>
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
    </div>
  );
}

export default BuyerShippingForm; */