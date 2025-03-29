const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    ReportName:{
        type:String,//datatype
        required:true,//validate
    },
    ReportReason:{
        type:String,//datatype
        required:true,//validate
    },
    Date:{
        type:Date,//datatype
        required:true,//validate
    }
});

module.exports = mongoose.model(
    "ReportModel",//file name
    reportSchema//function name
)