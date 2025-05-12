const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const itemController = require("../Controlers/ItemControllers");
const Auction = require('../Model/AuctionModel');
const BidNowModel = require('../Model/BidNowModel');
const User = require('../Model/UserModel');
const { sendAuctionWinNotification } = require('../utils/emailNotifications');

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

router.post('/check-end/:auctionId', async (req, res) => {
  console.log('check-end route called!', req.params.auctionId);
  try {
    const { auctionId } = req.params;
    const auction = await Auction.findById(auctionId);

    if (!auction) return res.status(404).json({ message: 'Auction not found' });

    if (auction.biddingEndTime <= new Date() && !auction.winnerNotified) {
      const highestBid = await BidNowModel.findOne({ itemId: auctionId }).sort({ bidAmount: -1 });
      if (!highestBid) return res.status(200).json({ message: 'No bids placed.' });

      const winner = await User.findById(highestBid.userId);
      if (winner && winner.email) {
        await sendAuctionWinNotification(winner, auction.name, highestBid.bidAmount);
        auction.winnerNotified = true;
        await auction.save();
        return res.status(200).json({ message: 'Winner notified.' });
      } else {
        return res.status(200).json({ message: 'Winner has no email.' });
      }
    } else {
      return res.status(200).json({ message: 'Auction not ended or already notified.' });
    }
  } catch (error) {
    console.error('Error in check-end:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

router.get('/test', (req, res) => {
  res.send('Test route works!');
});

module.exports = router;