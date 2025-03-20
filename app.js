//exFSN0N4bmM58Yn3
const express = require("express");
const mongoose = require("mongoose");

const app =express();

//middleware
app.use("/",(req, res, next)=> {
    res.send("It's Working.............");
})

mongoose.connect("mongodb+srv://Seller:exFSN0N4bmM58Yn3@cluster0.r9x82.mongodb.net/")
.then(()=> console.log("Connected to MongoDB"))
.then(()=>{
    app.listen(5000);
})
.catch((err)=> console.log((err)));
