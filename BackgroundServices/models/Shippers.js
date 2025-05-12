const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shipperSchema = new Schema({
    providerid: {
        type: String, //data type
        required: true, //validate
    },
    companyname: {
        type: String, //data type
        required: true, //validate
    },
    companyemail: {
        type: String, //data type
        required: true, //validate
    },  
    companyphone: {
        type: String, //data type
        required: true, //validate
    },
    companyaddress: {
        type: String, //data type
        required: true, //validate
    },companytype: {
        type: String, //data type
        required: true, //validate
        order: ['Local', 'International']
    },
});

module.exports = mongoose.model(
    "ShipperModel.js",
    shipperSchema); //export model User with UserSchema