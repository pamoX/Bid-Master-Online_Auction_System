import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Buyer() {
  const location = useLocation();
  const navigate = useNavigate();
  const auctionid = location.state?.auctionid;

  const handleNewShipment = () => {
    if (!auctionid) {
      alert('No auction ID found. Please select an item first.');
      return;
    }
    navigate(`/buyer/shipping/${auctionid}`, { state: { auctionid } });
  };

  return (
    <div>
      <h1 className='heading'>Buyer</h1>
      <div className='container'>
        <Link to="/buyershipping" className='link'>
            <h2 className='subheading'>My Shipments</h2>
        </Link> 
        <button onClick={handleNewShipment} className='link'>
            <h2 className='subheading'>New Shipment</h2>
        </button>
      </div>
    </div>
  )
}

export default Buyer; 
