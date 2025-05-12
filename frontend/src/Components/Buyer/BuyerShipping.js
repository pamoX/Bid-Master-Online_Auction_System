import React from 'react'
import ShipmentTracking from '../ShipmentTracking/ShipmentTracking'
import OrderHistory from '../OrderHistory/OrderHistory'

function BuyerShipping() {
  return (
    <div>
      <ShipmentTracking></ShipmentTracking>
      <OrderHistory></OrderHistory>
    </div>
  )
}

export default BuyerShipping
