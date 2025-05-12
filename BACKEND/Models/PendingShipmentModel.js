const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pendingShipmentSchema = new Schema({
  auctionid: { type: String, required: true, unique: true },
  buyerDetails: {
    buyername: { type: String, required: true },
    buyeremail: { type: String, required: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },
    buyerphone: { type: String, required: true },
    to: { type: String, required: true } // Buyer's delivery address
  },
  sellerDetails: {
    itemid: { type: String, required: true },
    itemname: { type: String, required: true },
    userName: { type: String, required: true },
    selleremail: { type: String, required: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },
    phone: { type: String, required: true },
    from: { type: String, required: true }, // Seller's pickup address
    weight: { type: Number, required: true, min: 0 },
    shipmenttype: { type: String, required: true, enum: ['Local', 'International'] }
  },
  collectionCenter: { type: String, default: 'Main Collection Center' }
}, { timestamps: true });

module.exports = mongoose.model('pendingShipments', pendingShipmentSchema);

/*const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pendingShipmentSchema = new Schema({
    auctionid: { type: String, required: true, unique: true },
    buyerDetails: {
        buyername: { type: String },
        buyeremail: { type: String, match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },
        buyerphone: { type: String },
        to: { type: String }
    },
    sellerDetails: {
        itemid: { type: String },
        itemname: { type: String },
        sellername: { type: String },
        selleremail: { type: String, match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },
        sellerphone: { type: String },
        from: { type: String },
        weight: { type: Number, min: 0 },
        shipmenttype: { type: String, enum: ['Local', 'International'] }
    }
}, { timestamps: true });

module.exports = mongoose.model('pendingShipments', pendingShipmentSchema); */