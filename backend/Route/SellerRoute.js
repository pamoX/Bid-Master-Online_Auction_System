const express = require('express');
const router = express.Router();
const SellerControllers = require("../Controlers/SellerControllers");

// Get all seller items
router.get("/", SellerControllers.getAllItems);

// Create new item
router.post("/", SellerControllers.addItem);

// Get by ID (no extra "/items" needed)
router.get("/:id", SellerControllers.getById); // Changed from "/items/:id"

// Update item
router.put("/:id", SellerControllers.updateItem);

// Delete item
router.delete("/:id", SellerControllers.deleteItem);

module.exports = router;