const express = require("express");
const shipadminrouter = express.Router();
const multer = require("multer");
const shipAdminController = require("../Controllers/ShipAdminController");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Routes
shipadminrouter.get("/", shipAdminController.getAllShipAdmins);
shipadminrouter.post("/", upload.single("picture"), shipAdminController.createShipAdmins);

shipadminrouter.get("/shipadmin/:id", shipAdminController.getShipAdminById);
//shipadminrouter.get("/shipadmin", shipAdminController.getShipAdminById);
shipadminrouter.put("/:id", upload.single("picture"), shipAdminController.updateShipAdmin);
shipadminrouter.delete("/:id", shipAdminController.deleteShipAdmin);

module.exports = shipadminrouter;