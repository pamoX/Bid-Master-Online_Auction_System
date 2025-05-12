const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const shipAdminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: { 
    type: String }
  

});

module.exports = mongoose.model("ShipAdmin", shipAdminSchema); 