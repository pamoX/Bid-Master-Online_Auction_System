const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const itemController = require("../Controlers/ItemControllers");

// Configure storage for multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter - only accept images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // 5MB max file size
});

// Custom middleware to handle multiple file uploads
const uploadFiles = (req, res, next) => {
  const uploader = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'additionalImages', maxCount: 4 }
  ]);

  uploader(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: `Multer error: ${err.message}` });
    } else if (err) {
      return res.status(500).json({ message: `Unknown error: ${err.message}` });
    }
    next();
  });
};

// Get all items
router.get("/", itemController.getAllItems);

// Add an item (with file upload)
router.post("/", uploadFiles, itemController.addItem);

// Get item by ID
router.get("/:id", itemController.getItemById);

// Update item
router.put("/:id", uploadFiles, itemController.updateItem);

// Delete item
router.delete("/:id", itemController.deleteItem);

// Update item status
router.patch("/:id/status", itemController.updateItemStatus);

module.exports = router;