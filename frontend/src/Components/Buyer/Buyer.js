import React from 'react'
import { Link } from 'react-router-dom'

function Buyer() {
  return (
    <div>
      <h1 className='heading'>Buyer</h1>
      <div className='container'>
        <Link to="/buyershipping" className='link'>
            <h2 className='subheading'>My Shipments</h2>
        </Link> 
        <Link to="/buyershippingform" className='link'>
            <h2 className='subheading'>New Shipment</h2>
        </Link> 

      </div>
        
       

    </div>
  )
}

export default Buyer; 
