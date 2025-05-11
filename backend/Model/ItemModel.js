const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  id: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: 'placeholder.png'
  },
  // New fields for additional images
  additionalImages: {
    type: [String],
    default: []
  },
  // New field for bidding time limit
  biddingEndTime: {
    type: Date
  },
  // New field for starting price
  startingPrice: {
    type: Number
  },
  status: {
    type: String,
    default: 'Pending'
  }
});

module.exports = mongoose.model("Item", itemSchema);