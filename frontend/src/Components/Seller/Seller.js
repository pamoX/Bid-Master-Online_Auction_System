import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Seller() {
  const location = useLocation();
  const auctionid = location.state?.auctionid;

  return (
    <div>
      <h1 className='heading'>Seller</h1>
      <div className='container'>
        <Link to="/sellershipping" className='link'>
            <h2 className='subheading'>My Shipments</h2>
        </Link> 
        <Link to={`/seller/shipping/${auctionid}`} className='link'>
            <h2 className='subheading'>New Shipment</h2>
        </Link> 
      </div>
    </div>
  )
}

export default Seller
