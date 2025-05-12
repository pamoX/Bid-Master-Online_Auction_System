const express = require('express'); 
const shipperRouter = express.Router();

//insert model
const Shipper = require('../Models/ShipperModel.js');
//insert usercontroller
const ShipperController = require('../Controllers/ShipperController.js');

shipperRouter.get('/', ShipperController.getAllShippers);
shipperRouter.post('/', ShipperController.addShipper);
shipperRouter.get("/:shipperid", ShipperController.getByIdShipper);
shipperRouter.put("/:shipperid", ShipperController.updateShipper);
shipperRouter.delete("/:shipperid", ShipperController.deleteShipper);


//export router
module.exports = shipperRouter; 