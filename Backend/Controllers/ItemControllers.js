const Item = require("../Model/ItemModel");
const fs = require('fs');
const path = require('path');

// Get all items
const getAllItems = async (req, res) => {
  let items;
  try {
    items = await Item.find();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
  
  if (!items) {
    return res.status(404).json({ message: "No items found" });
  }
  
  return res.status(200).json(items);
};

// Add an item
const addItem = async (req, res) => {
  const { id, name, description, price, status, startingPrice, biddingEndTime } = req.body;
  
  // Get main image path from multer
  const imagePath = req.file ? `/uploads/${req.file.filename}` : '/uploads/placeholder.png';
  
  // Handle additional images if they exist
  const additionalImages = [];
  if (req.files && req.files.additionalImages) {
    for (const file of req.files.additionalImages) {
      additionalImages.push(`/uploads/${file.filename}`);
    }
  }
  
  const newItem = new Item({
    id,
    name,
    description,
    price,
    image: imagePath,
    additionalImages,
    startingPrice: startingPrice || price, // Default to main price if not provided
    biddingEndTime: biddingEndTime || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default 7 days from now
    status: status || 'Pending'
  });
  
  try {
    await newItem.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to add item" });
  }
  
  return res.status(201).json({ message: "Item added successfully" });
};

// Get item by ID
const getItemById = async (req, res) => {
  const id = req.params.id;
  
  let item;
  try {
    item = await Item.findById(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
  
  if (!item) {
    return res.status(404).json({ message: "No item found" });
  }
  
  return res.status(200).json(item);
};

// Update item
const updateItem = async (req, res) => {
  const id = req.params.id;
  const { name, description, price, status, startingPrice, biddingEndTime } = req.body;
  
  let item;
  try {
    item = await Item.findById(id);
    
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    // Update fields
    item.name = name;
    item.description = description;
    item.price = price;
    item.status = status;
    
    if (startingPrice) item.startingPrice = startingPrice;
    if (biddingEndTime) item.biddingEndTime = biddingEndTime;
    
    // If a new main image was uploaded, update the image path
    if (req.file) {
      // Delete old image if it's not the placeholder
      if (item.image && item.image !== '/uploads/placeholder.png') {
        const oldImagePath = path.join(__dirname, '..', item.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      
      item.image = `/uploads/${req.file.filename}`;
    }
    
    // Handle additional images if they exist
    if (req.files && req.files.additionalImages && req.files.additionalImages.length > 0) {
      // Delete old additional images
      for (const imgPath of item.additionalImages) {
        const oldImgPath = path.join(__dirname, '..', imgPath);
        if (fs.existsSync(oldImgPath)) {
          fs.unlinkSync(oldImgPath);
        }
      }
      
      // Add new additional images
      item.additionalImages = [];
      for (const file of req.files.additionalImages) {
        item.additionalImages.push(`/uploads/${file.filename}`);
      }
    }
    
    await item.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
  
  return res.status(200).json({ message: "Item updated successfully" });
};

// Delete item
const deleteItem = async (req, res) => {
  const id = req.params.id;
  
  try {
    const item = await Item.findById(id);
    
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    // Delete main image if it's not the placeholder
    if (item.image && item.image !== '/uploads/placeholder.png') {
      const imagePath = path.join(__dirname, '..', item.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    // Delete additional images
    for (const imgPath of item.additionalImages) {
      const additionalImagePath = path.join(__dirname, '..', imgPath);
      if (fs.existsSync(additionalImagePath)) {
        fs.unlinkSync(additionalImagePath);
      }
    }
    
    await Item.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to delete item" });
  }
  
  return res.status(200).json({ message: "Item deleted successfully" });
};

// Update item status
const updateItemStatus = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  
  try {
    const item = await Item.findById(id);
    
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    item.status = status;
    await item.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to update status" });
  }
  
  return res.status(200).json({ message: "Status updated successfully" });
};

exports.getAllItems = getAllItems;
exports.addItem = addItem;
exports.getItemById = getItemById;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
exports.updateItemStatus = updateItemStatus;