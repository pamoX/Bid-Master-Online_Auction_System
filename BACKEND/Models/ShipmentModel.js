const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shipmentSchema = new Schema({
    itemid: { type: String, required: true, unique: true },
    itemname: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    sellername: { type: String, required: true },
    selleremail: { type: String, required: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },
    sellerphone: { type: String, required: true },
    buyername: { type: String, required: true },
    buyeremail: { type: String, required: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },
    buyerphone: { type: String, required: true },
    weight: { type: Number, required: true, min: 0 },
    shipmenttype: { type: String, required: true, enum: ['Local', 'International'] },
    cost: { type: Number, required: true, min: 0 },
    courierid: { type: String }, // Assigned courier's providerid
    status: { type: String, default: 'Pending', enum: ['Pending', 'In Transit', 'Delivered', 'Cancelled'] }
}, { timestamps: true });

module.exports = mongoose.model('shipments', shipmentSchema);

/*
const shipmentSchema = new Schema({
    itemid: {
        type: String, //data type
        required: true, //validate
        unique: true //validate
    },
    itemname: {
        type: String, //data type
        required: true, //validate
    },
    from:{  
        type: String, //data type
        required: true, //validate
    },
    to:{
        type: String, //data type
        required: true, //validate
    },
    sellername: {
        type: String, //data type
        required: true, //validate
    },
    selleremail: {
        type: String, //data type
        required: true, //validate
        match:[/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    sellerphone: {
        type: String, //data type
        required: true, //validate
    },
    buyername: {
        type: String, //data type
        required: true, //validate
    },      
    buyeremail: {
        type: String, //data type
        required: true, //validate
        match:[/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    buyerphone: {
        type: String, //data type
        required: true, //validate
    },
    weight: {
        type: Number, //data type
        required: true, //validate
    },
    shipmenttype: {
        type: String, //data type
        required: true, //validate
        enum: ['Local', 'International']
    },
    cost: {
        type: Number, //data type
        required: true, //validate
    },
});

module.exports = mongoose.model(
    "shipments",
    shipmentSchema); //export model User with UserSchema
    */