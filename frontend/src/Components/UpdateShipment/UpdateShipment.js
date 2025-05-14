import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { publicRequest } from '../../requestMethods';
import { toast } from 'react-toastify';
import './UpdateShipment.css';
import ShipNav from '../ShipNav/ShipNav';

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
    status: '',
    courieridToCollection: '',
    courieridToBuyer: ''
  });
  const [shippers, setShippers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = location.state?.shipmentData;
        if (!data) {
          const shipmentRes = await publicRequest.get(`/shipments/${id}`);
          data = shipmentRes.data.data;
        }
        setShipmentData({
          ...shipmentData,
          ...data,
          weight: data.weight || 0,
          cost: data.cost || 0,
          courieridToCollection: data.courieridToCollection || '',
          courieridToBuyer: data.courieridToBuyer || ''
        });

        const shippersRes = await publicRequest.get('/shippers');
        setShippers(shippersRes.data.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load shipment details');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, location.state]);

  const calculateCost = (weight, courierId) => {
    if (!weight || !courierId) return 0;
    const courier = shippers.find(s => s.providerid === courierId);
    if (!courier) return 0;
    return (weight * courier.rateperkg).toFixed(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipmentData(prev => {
      const newData = {
        ...prev,
      [name]: name === 'weight' || name === 'cost' ? Number(value) : value
      };

      // Calculate cost when weight or courier changes
      if (name === 'weight' || name === 'courieridToCollection' || name === 'courieridToBuyer') {
        const weight = name === 'weight' ? value : prev.weight;
        const courierId = name === 'courieridToCollection' ? value : prev.courieridToCollection;
        const courierToBuyerId = name === 'courieridToBuyer' ? value : prev.courieridToBuyer;

        // Calculate total cost from both couriers
        const costToCollection = calculateCost(weight, courierId);
        const costToBuyer = calculateCost(weight, courierToBuyerId);
        const totalCost = (Number(costToCollection) + Number(costToBuyer)).toFixed(2);

        newData.cost = totalCost;
      }

      return newData;
    });
  };

  const handleCourierChange = async (e) => {
    const { name, value } = e.target;
    try {
      const selectedCourier = shippers.find(shipper => shipper.providerid === value);
      if (!selectedCourier) {
        throw new Error('Courier not found');
      }

      const calculatedCost = shipmentData.weight * selectedCourier.rateperkg;

      await publicRequest.post('/shipments/assign-courier', { 
        shipmentId: id, 
        courierid: value,
        field: name
      });

      setShipmentData(prevState => ({
        ...prevState,
        [name]: value,
        cost: name === 'courieridToCollection' 
          ? calculatedCost 
          : prevState.cost + calculatedCost,
        status: name === 'courieridToCollection' 
          ? 'Courier Assigned to Collection' 
          : 'Courier Assigned to Buyer'
      }));

      toast.success('Courier assigned successfully');
    } catch (error) {
      console.error('Error assigning courier:', error);
      toast.error('Failed to assign courier');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await publicRequest.put(`/shipments/${id}`, {
        ...shipmentData,
        weight: Number(shipmentData.weight),
        cost: Number(shipmentData.cost)
      });
      toast.success('Shipment updated successfully!');
      navigate('/shipments');
    } catch (error) {
      console.error('Error updating shipment:', error);
      toast.error('Failed to update shipment');
    }
  };

  if (loading) {
    return <div className="sh-loading-message">Loading shipment data...</div>;
  }

  return (
    <div className="sh-update-shipment-container">
      <ShipNav />
      <form className="sh-shipment-form" onSubmit={handleSubmit}>
        <h2>Update Shipment</h2>
        <div className="sh-form-group">
          <label htmlFor="itemid">Item ID</label>
          <input
            type="text"
            name="itemid"
            value={shipmentData.itemid}
            onChange={handleChange}
            readOnly
            className="readonly-input"
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
            type="tel"
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
            type="tel"
            name="buyerphone"
            value={shipmentData.buyerphone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="sh-form-group">
          <label htmlFor="weight">Weight (kg)</label>
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
          <label htmlFor="courieridToCollection">Courier to Collection</label>
          <select
            name="courieridToCollection"
            value={shipmentData.courieridToCollection || ''}
            onChange={handleCourierChange}
          >
            <option value="">Select Courier</option>
            {shippers.map((shipper) => (
              <option key={shipper._id} value={shipper.providerid}>
                {shipper.companyname} ({shipper.companytype}) - ${shipper.rateperkg}/kg
              </option>
            ))}
          </select>
        </div>
        <div className="sh-form-group">
          <label htmlFor="courieridToBuyer">Courier to Buyer</label>
          <select
            name="courieridToBuyer"
            value={shipmentData.courieridToBuyer || ''}
            onChange={handleCourierChange}
          >
            <option value="">Select Courier</option>
            {shippers.map((shipper) => (
              <option key={shipper._id} value={shipper.providerid}>
                {shipper.companyname} ({shipper.companytype}) - ${shipper.rateperkg}/kg
              </option>
            ))}
          </select>
        </div>
        <div className="sh-form-group">
          <label htmlFor="cost">Cost ($)</label>
          <input
            type="number"
            name="cost"
            value={shipmentData.cost}
            readOnly
            className="readonly-input"
          />
          <small className="cost-note">Cost is automatically calculated based on weight and courier rates</small>
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
