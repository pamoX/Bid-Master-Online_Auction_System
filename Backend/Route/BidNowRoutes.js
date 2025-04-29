const express = require('express');
const router = express.Router();
const { createBid, getBidsByItem, getUserBids, getHighestBid, updateBidStatus } = require('../Controlers/BidNowController');

// Create a new bid
router.post('/', createBid);

// Get all bids for an item
router.get('/item/:itemId', getBidsByItem);

// Get user's bid history
router.get('/user/:userId', getUserBids);

// Get current highest bid for an item
router.get('/highest/:itemId', getHighestBid);

// Update bid status
router.put('/:bidId', updateBidStatus);

module.exports = router; 