const express = require('express');
const router = express.Router();
const { createBid, getBidsByItem, getUserBids, getHighestBid, updateBidStatus, deleteBid } = require('../Controlers/BidNowController');
const mongoose = require('mongoose');
const BidNowModel = require('../Model/BidNowModel');

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

// Delete a bid (retrieve bid)
router.delete('/:bidId', deleteBid);

const deleteBidHandler = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { bidId } = req.params;
        const userId = req.body.userId || req.query.userId || req.headers['x-user-id'];
        if (!userId) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "User ID required" });
        }

        const bid = await BidNowModel.findById(bidId).session(session);
        if (!bid) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Bid not found" });
        }
        if (bid.userId !== userId) {
            await session.abortTransaction();
            session.endSession();
            return res.status(403).json({ message: "You can only retrieve your own bids" });
        }

        const itemId = bid.itemId;

        // Delete the bid
        await BidNowModel.findByIdAndDelete(bidId).session(session);

        // Set all bids for this item to isHighestBid: false
        await BidNowModel.updateMany({ itemId }, { isHighestBid: false }).session(session);

        // Find the next highest bid for this item
        const nextHighestBid = await BidNowModel.findOne({ itemId }).sort({ bidAmount: -1 }).session(session);

        if (nextHighestBid) {
            nextHighestBid.isHighestBid = true;
            await nextHighestBid.save({ session });
        }

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: "Bid retrieved successfully" });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "Failed to retrieve bid" });
    }
};

module.exports = router; 