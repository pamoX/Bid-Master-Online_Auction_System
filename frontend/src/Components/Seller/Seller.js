import React from 'react'
import { Link } from 'react-router-dom'

function Seller() {
  return (
    <div>
      <h1 className='heading'>Seller</h1>
      <div className='container'>
        <Link to="/sellershipping" className='link'>
            <h2 className='subheading'>My Shipments</h2>
        </Link> 
        <Link to="/sellershippingform" className='link'>
            <h2 className='subheading'>New Shipment</h2>
        </Link> 

      </div>
        
       

    </div>
  )
}

export default Seller
