import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { publicRequest } from '../../requestMethods';
import './UpdateShipment.css';

function UpdateShipment() {
  const [shipmentData, setShipmentData] = useState({
    itemid: '',
    itemname: '',
    from: '',
    collectionCenter: '',
    to: '',
    userName: '',
    selleremail: '',
    phone: '',
    buyername: '',
    buyeremail: '',
    buyerphone: '',
    weight: 0,
    shipmenttype: '',
    cost: 0,
    status: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await publicRequest.get(`/shipments/${id}`);
        setShipmentData(res.data.data);
      } catch (error) {
        console.error('Error fetching shipment:', error);
      }
    };
    fetchHandler();
  }, [id]);

  const handleChange = (e) => {
    setShipmentData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await publicRequest.put(`/shipments/${id}`, shipmentData);
      navigate('/shipments');
    } catch (error) {
      console.error('Error updating shipment:', error);
    }
  };

  return (
    <div className="sh-update-shipment-container">
      <form className="sh-shipment-form" onSubmit={handleSubmit}>
        <h2>Update Shipment</h2>
        <div className="sh-form-group">
          <label htmlFor="itemid">Item ID</label>
          <input
            type="text"
            name="itemid"
            value={shipmentData.itemid}
            onChange={handleChange}
            required
          />
        </div>
        <div className="sh-form-group">
          <label htmlFor="itemname">Item Name</label>
          <input
            type="text"
            name="itemname"
            value={shipmentData.itemname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="sh-form-group">
          <label htmlFor="from">From</label>
          <input
            type="text"
            name="from"
            value={shipmentData.from}
            onChange={handleChange}
            required
          />
        </div>
        <div className="sh-form-group">
          <label htmlFor="collectionCenter">Collection Center</label>
          <input
            type="text"
            name="collectionCenter"
            value={shipmentData.collectionCenter}
            onChange={handleChange}
            required
          />
        </div>
        <div className="sh-form-group">
          <label htmlFor="to">To</label>
          <input
            type="text"
            name="to"
            value={shipmentData.to}
            onChange={handleChange}
            required
          />
        </div>
        <div className="sh-form-group">
          <label htmlFor="userName">Seller Name</label>
          <input
            type="text"
            name="userName"
            value={shipmentData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="sh-form-group">
          <label htmlFor="selleremail">Seller Email</label>
          <input
            type="email"
            name="selleremail"
            value={shipmentData.selleremail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="sh-form-group">
          <label htmlFor="phone">Seller Phone</label>
          <input
            type="text"
            name="phone"
            value={shipmentData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="sh-form-group">
          <label htmlFor="buyername">Buyer Name</label>
          <input
            type="text"
            name="buyername"
            value={shipmentData.buyername}
            onChange={handleChange}
            required
          />
        </div>
        <div className="sh-form-group">
          <label htmlFor="buyeremail">Buyer Email</label>
          <input
            type="email"
            name="buyeremail"
            value={shipmentData.buyeremail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="sh-form-group">
          <label htmlFor="buyerphone">Buyer Phone</label>
          <input
            type="text"
            name="buyerphone"
            value={shipmentData.buyerphone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="sh-form-group">
          <label htmlFor="weight">Weight (g)</label>
          <input
            type="number"
            name="weight"
            value={shipmentData.weight}
            onChange={handleChange}
            step="0.1"
            min="0"
            required
          />
        </div>
        <div className="sh-form-group">
          <label htmlFor="shipmenttype">Shipment Type</label>
          <select
            name="shipmenttype"
            value={shipmentData.shipmenttype}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Local">Local</option>
            <option value="International">International</option>
          </select>
        </div>
        <div className="sh-form-group">
          <label htmlFor="cost">Cost ($)</label>
          <input
            type="number"
            name="cost"
            value={shipmentData.cost}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>
        <div className="sh-form-group">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            value={shipmentData.status}
            onChange={handleChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Courier Assigned to Collection">Courier Assigned to Collection</option>
            <option value="Picked Up">Picked Up</option>
            <option value="At Collection Center">At Collection Center</option>
            <option value="Courier Assigned to Buyer">Courier Assigned to Buyer</option>
            <option value="Shipped to Buyer">Shipped to Buyer</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="sh-form-actions">
          <button type="submit" className="sh-btn-submit">
            Update Shipment
          </button>
          <button
            type="button"
            className="sh-btn-cancel"
            onClick={() => navigate('/shipments')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateShipment;

/*import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { publicRequest } from '../../requestMethods';

function UpdateShipment() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        status: '',
        courierid: ''
    });

    useEffect(() => {
        const fetchShipment = async () => {
            try {
                const res = await publicRequest.get(`/shipments/${id}`);
                setFormData({
                    status: res.data.data.status || '',
                    courierid: res.data.data.courierid || ''
                });
            } catch (error) {
                console.error('Error fetching shipment:', error);
            }
        };
        fetchShipment();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await publicRequest.put(`/shipments/${id}`, formData);
            toast.success('Shipment updated!');
            navigate('/admin/shipments');
        } catch (error) {
            toast.error('Failed to update shipment');
        }
    };

    return React.createElement(
        'div',
        { className: 'max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10' },
        React.createElement(
            'h2',
            { className: 'text-2xl font-bold mb-6' },
            'Update Shipment'
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
                    'Status'
                ),
                React.createElement(
                    'select',
                    {
                        name: 'status',
                        value: formData.status,
                        onChange: handleChange,
                        className: 'w-full p-2 border rounded',
                        required: true
                    },
                    React.createElement('option', { value: '' }, 'Select Status'),
                    React.createElement('option', { value: 'Pending' }, 'Pending'),
                    React.createElement('option', { value: 'In Transit' }, 'In Transit'),
                    React.createElement('option', { value: 'Delivered' }, 'Delivered'),
                    React.createElement('option', { value: 'Cancelled' }, 'Cancelled')
                )
            ),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'label',
                    { className: 'block text-sm font-medium' },
                    'Courier ID'
                ),
                React.createElement('input', {
                    type: 'text',
                    name: 'courierid',
                    value: formData.courierid,
                    onChange: handleChange,
                    className: 'w-full p-2 border rounded'
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
                        onClick: () => navigate('/shipments'),
                        className: 'w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600'
                    },
                    'Cancel'
                )
            )
        )
    );
}

export default UpdateShipment;
*/

/* worked in mid
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateShipment.css';

const URL = "http://localhost:5000/shipments";

function UpdateShipment() {
    const [shipmentData, setShipmentData] = useState({
        itemid: "",
        itemname: "",
        from: "",
        to: "",
        sellername: "",
        selleremail: "",
        sellerphone: "",
        buyername: "",
        buyeremail: "",
        buyerphone: "",
        weight: 0,
        shipmenttype: "",
        cost: 0
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const res = await axios.get(`${URL}/${id}`);
                setShipmentData(res.data.shipments || res.data);
            } catch (error) {
                console.error("Error fetching shipment:", error);
            }
        };
        fetchHandler();
    }, [id]);

    const handleChange = (e) => {
        setShipmentData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendRequest();
            navigate('/shipments');
        } catch (error) {
            console.error('Error updating shipments:', error);
        }
    };

    const sendRequest = async () => {
            await axios.put(`${URL}/${id}`, {
                itemid: String(shipmentData.itemid),
                itemname: String(shipmentData.itemname),
                from: String(shipmentData.from),
                to: String(shipmentData.to),
                sellername: String(shipmentData.sellername),
                selleremail: String(shipmentData.selleremail),
                sellerphone: String(shipmentData.sellerphone),
                buyername: String(shipmentData.buyername),
                buyeremail: String(shipmentData.buyeremail),
                buyerphone: String(shipmentData.buyerphone),
                weight: Number(shipmentData.weight),
                shipmenttype: String(shipmentData.shipmenttype),
                cost: Number(shipmentData.cost)
            });
           
       
    };

    return (
        <div classname="upshipm">
            <div className="sh-update-shipment-container">
                <form className="sh-shipment-form" onSubmit={handleSubmit}>
                    <h2>Update Shipment</h2>
                    <div className="sh-form-group">
                        <label htmlFor="itemid">Item ID</label>
                        <input type="text" id="sh-itemid" name="sh-itemid" value={shipmentData.itemid || ''} onChange={handleChange} required />
                    </div>
                    <div className="sh-form-group">
                        <label htmlFor="itemname">Item Name</label>
                        <input type="text" id="sh-itemname" name="sh-itemname" value={shipmentData.itemname || ''} onChange={handleChange} required />
                    </div>
                    <div className="sh-form-group">
                        <label htmlFor="sh-from">From</label>
                        <input type="text" id="sh-from" name="sh-from" value={shipmentData.from || ''} onChange={handleChange} required />
                    </div>
                    <div className="sh-form-group">
                        <label htmlFor="to">To</label>
                        <input type="text" id="sh-to" name="sh-to" value={shipmentData.to || ''} onChange={handleChange} required />
                    </div>
                    <div className="sh-form-group">
                        <label htmlFor="sellername">Seller Name</label>
                        <input type="text" id="sh-sellername" name="sh-sellername" value={shipmentData.sellername || ''} onChange={handleChange} required />
                    </div>
                    <div className="sh-form-group">
                        <label htmlFor="selleremail">Seller Email</label>
                        <input type="email" id="sh-selleremail" name="sh-selleremail" value={shipmentData.selleremail || ''} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sellerphone">Seller Phone</label>
                        <input type="text" id="sh-sellerphone" name="sh-sellerphone" value={shipmentData.sellerphone || ''} onChange={handleChange} required />
                    </div>
                    <div className="sh-form-group">
                        <label htmlFor="buyername">Buyer Name</label>
                        <input type="text" id="sh-buyername" name="sh-buyername" value={shipmentData.buyername || ''} onChange={handleChange} required />
                    </div>
                    <div className="sh-form-group">
                        <label htmlFor="buyeremail">Buyer Email</label>
                        <input type="email" id="sh-buyeremail" name="sh-buyeremail" value={shipmentData.buyeremail || ''} onChange={handleChange} required />
                    </div>
                    <div className="sh-form-group">
                        <label htmlFor="buyerphone">Buyer Phone</label>
                        <input type="text" id="sh-buyerphone" name="sh-buyerphone" value={shipmentData.buyerphone || ''} onChange={handleChange} required />
                    </div>
                    <div className="sh-form-group">
                        <label htmlFor="weight">Weight (g)</label>
                        <input type="number" id="sh-weight" name="sh-weight" value={shipmentData.weight || ''} onChange={handleChange} step="0.1" min="0" required />
                    </div>
                    <div className="sh-form-group">
                        <label htmlFor="shipmenttype">Shipment Type</label>
                        <select id="sh-shipmenttype" name="sh-shipmenttype" value={shipmentData.shipmenttype || ''} onChange={handleChange} required>
                            <option value="">Select Type</option>
                            <option value="Local">Local</option>
                            <option value="International">International</option>
                        </select>
                    </div>
                    <div className="sh-form-group">
                        <label htmlFor="cost">Cost ($)</label>
                        <input type="number" id="sh-cost" name="sh-cost" value={shipmentData.cost || ''} onChange={handleChange} step="0.01" min="0" required />
                    </div>
                    <div className="sh-form-actions">
                        <button type="submit" className="sh-btn-submit" onClick={() => navigate("/shipments")}>Update Shipment</button>
                        <button type="button" className="sh-btn-cancel" onClick={() => navigate("/shipments")}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateShipment;
*/
