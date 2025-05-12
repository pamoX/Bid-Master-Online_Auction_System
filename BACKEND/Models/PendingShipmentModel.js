const mongoose = require('mongoose');
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

module.exports = mongoose.model('pendingShipments', pendingShipmentSchema);