import React from 'react'
import ShipmentTracking from '../ShipmentTracking/ShipmentTracking'
import OrderHistory from '../OrderHistory/OrderHistory'

function SellerShipping() {
  return (
    <div>
      <ShipmentTracking></ShipmentTracking>
      <OrderHistory></OrderHistory>
    </div>
  )
}

export default SellerShipping
