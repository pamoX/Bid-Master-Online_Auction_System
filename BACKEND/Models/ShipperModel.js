const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shipperSchema = new Schema({
    providerid: { type: String, required: true, unique: true },
    companyname: { type: String, required: true },
    companyemail: { type: String, required: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },
    companyphone: { type: String, required: true },
    companyaddress: { type: String, required: true },
    companytype: { type: String, required: true, enum: ['Local', 'International'] },
    rateperkg: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('shippers', shipperSchema);

/*
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
        enum: ['Local', 'International'] //allowed values
    },
    rateperkg:{
        type: Number, //data type
        required: true, //validate
    }
});

module.exports = mongoose.model(
    "shippers",
    shipperSchema); //export model User with UserSchema
    */