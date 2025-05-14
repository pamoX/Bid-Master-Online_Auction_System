const express = require('express');
const shipmentRouter = express.Router();
const ShipmentController = require('../Controllers/ShipmentController.js');

shipmentRouter.get('/', ShipmentController.getAllShipments);
shipmentRouter.get('/user', ShipmentController.getUserShipments);
shipmentRouter.post('/pending', ShipmentController.submitShippingDetails);
shipmentRouter.post('/', ShipmentController.addShipments);
shipmentRouter.post('/assign-courier', ShipmentController.assignCourierToCollection);
shipmentRouter.get('/:id', ShipmentController.getByIdShipments);
shipmentRouter.put('/:id', ShipmentController.updateShipmentStatus);
shipmentRouter.delete('/:id', ShipmentController.deleteShipment);

module.exports = shipmentRouter;

/*const express = require('express'); 
const shipmentRouter = express.Router();

//insert model
const Shipment = require('../Models/ShipmentModel.js');
//insert usercontroller
const ShipmentController = require('../Controllers/ShipmentController.js');

shipmentRouter.get('/', ShipmentController.getAllShipments);
shipmentRouter.get('/user', ShipmentController.getUserShipments);
shipmentRouter.post('/pending', ShipmentController.submitShippingDetails);
shipmentRouter.post('/', ShipmentController.addShipments);
shipmentRouter.get("/:shipid", ShipmentController.getByIdShipments);
shipmentRouter.put("/:shipid", ShipmentController.updateShipment);
shipmentRouter.delete("/:shipid", ShipmentController.deleteShipment);
//shipmentRouter.get("/:selleremail", ShipmentController.getUserShipments);
//export router
module.exports = shipmentRouter; 
*/