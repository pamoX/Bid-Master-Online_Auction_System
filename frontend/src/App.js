import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


import Home from './Components/Home/Home';
import Shippers from './Components/Shippers/Shippers';
import Shipments from './Components/Shipments/Shipments';
import NewShipment from './Components/NewShipment/NewShipment';
import UpdateShipment from './Components/UpdateShipment/UpdateShipment';
import NewShipper from './Components/NewShipper/NewShipper';
import UpdateShipper from './Components/UpdateShipper/UpdateShipper';
import ShipManageDash from './Components/ShipManageDash/ShipManageDash';
import ShipNav from './Components/ShipNav/ShipNav';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BuyerShippingForm from './Components/Buyer/BuyerShippingForm/BuyerShippingForm';
import SellerShippingForm from './Components/Seller/SellerShippingForm/SellerShippingForm';
import OrderHistory from './Components/OrderHistory/OrderHistory';
import ShipmentTracking from './Components/ShipmentTracking/ShipmentTracking';
import BuyerShipping from './Components/Buyer/BuyerShipping';
import Buyer from './Components/Buyer/Buyer';
import SellerShipping from './Components/Seller/SellerShipping';
import Seller from './Components/Seller/Seller';
import ShipAdminProfile from './Components/ShipAdminProfile/ShipAdminProfile';
import ShipProfile from './Components/ShipProfile/ShipProfile';
import EditShipProfile from './Components/ShipProfile/EditShipProfile';

function App() {
  return (
    <div className="App">
      <ShipNav />
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shipmanagedash" element={<ShipManageDash />} />
          <Route path="/shippers" element={<Shippers />} />
          <Route path="/shipments" element={<Shipments />} />
          <Route path="/newshipment" element={<NewShipment />} />
          <Route path="/shipments/:id" element={<UpdateShipment />} />
          <Route path="/newshipper" element={<NewShipper />} />
          <Route path="/shippers/:id" element={<UpdateShipper/>}/>

          <Route path="/buyer" element={<Buyer />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/buyershipping" element={<BuyerShipping />} />
          <Route path="/sellershipping" element={<SellerShipping />} />

          <Route path="/buyer/shipping/:auctionid" element={<BuyerShippingForm />} />
          <Route path="/seller/shipping/:auctionid" element={<SellerShippingForm />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/track/:id" element={<ShipmentTracking />} />
          <Route path="/shprofile" element={<ShipAdminProfile />} />
          <Route path="/shipprofile" element={<ShipProfile />} />
          <Route path="/editshipprofile" element={<EditShipProfile />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
