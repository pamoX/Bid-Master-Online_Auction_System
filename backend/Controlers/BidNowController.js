const BidNowModel = require('../Model/BidNowModel');

// Create a new bid
const createBid = async (req, res) => {
    try {
        const { itemId, userId, bidAmount } = req.body;

        // Check if bid amount is valid
        const currentHighestBid = await BidNowModel.findOne({ itemId, isHighestBid: true });
        if (currentHighestBid && bidAmount <= currentHighestBid.bidAmount) {
            return res.status(400).json({ message: 'Bid amount must be higher than current highest bid' });
        }

        // Update previous highest bid status
        if (currentHighestBid) {
            currentHighestBid.isHighestBid = false;
            await currentHighestBid.save();
        }

        // Create new bid
        const newBid = new BidNowModel({
            itemId,
            userId,
            bidAmount,
            isHighestBid: true
        });

        await newBid.save();
        res.status(201).json(newBid);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all bids for an item
const getBidsByItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const bids = await BidNowModel.find({ itemId })
            .sort({ bidAmount: -1 });
        res.status(200).json(bids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user's bid history
const getUserBids = async (req, res) => {
    try {
        const { userId } = req.params;
        const bids = await BidNowModel.find({ userId })
            .sort({ bidTimestamp: -1 });
        res.status(200).json(bids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get current highest bid for an item
const getHighestBid = async (req, res) => {
    try {
        const { itemId } = req.params;
        const highestBid = await BidNowModel.findOne({ itemId, isHighestBid: true });
        res.status(200).json(highestBid);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update bid status
const updateBidStatus = async (req, res) => {
    try {
        const { bidId } = req.params;
        const { bidStatus } = req.body;

        const updatedBid = await BidNowModel.findByIdAndUpdate(
            bidId,
            { bidStatus },
            { new: true }
        );

        if (!updatedBid) {
            return res.status(404).json({ message: 'Bid not found' });
        }

        res.status(200).json(updatedBid);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBid,
    getBidsByItem,
    getUserBids,
    getHighestBid,
    updateBidStatus
}; 