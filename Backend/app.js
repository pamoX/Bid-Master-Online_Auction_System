//pass= hICN2z11pmV4ChPu

const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/UserRoutes");

const app = express();

//Middleware
app.use(express.json());
app.use("/users",router);

mongoose.connect("mongodb+srv://pamo:hICN2z11pmV4ChPu@cluster0.qy66w.mongodb.net/")
.then(()=> console.log("connected to mongoDB"))
.then(() =>{
    app.listen(5000);
})
.catch((err) => console.log((err)));