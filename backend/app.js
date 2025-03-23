//P0ELXe3zDiPFGZsh

const express =require("express");
const mongoose =require("mongoose");
const router=require("./Route/UserRoute");

const app = express();

//middlweare
app.use(express.json());
app.use("/users",router);


mongoose.connect("mongodb+srv://Seller:P0ELXe3zDiPFGZsh@cluster0.r9x82.mongodb.net/")
.then(()=>console.log("Connected to MongoDB"))
.then(()=>{
    app.listen(5000);
})
.catch((err)=>console.log((err)));
