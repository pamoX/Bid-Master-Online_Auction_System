import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1>Home new</h1>
      <Link to="/shipmanagedash">
          <button className="home-button dash-button">Dashboard</button>
        </Link>
      <Link to="/newshipment">
        <button className="new-shipment-button">New Shipment</button></Link>
      <Link to="/newshipper">
        <button className="new-shippers-button">New Shipping Services Provider</button></Link>
      <Link to="/updateuser">
        <button className="new-shippers-button">Update User</button></Link>
      <Link to="/shippers">
        <button className="new-shippers-button">All Shipping Services Providers</button></Link>
      <Link to="/shipments">
        <button className="new-shippers-button">All Shipments</button></Link>
        <Link to="/seller">
        <button className="new-seller-button">Seller</button></Link>
        <Link to="/buyer">
        <button className="new-shippers-button">Buyer</button></Link>

        <Link to="/shprofile">
        <button className="profile-button">Profile</button></Link>
        
    </div>
  )
}

export default Home
