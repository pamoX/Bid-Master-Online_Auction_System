// Backend/Model/AuctionModel.js
const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  name: String,
  biddingEndTime: Date,
  winnerNotified: { type: Boolean, default: false },
  // ... any other fields you need
});

module.exports = mongoose.model('Auction', auctionSchema);