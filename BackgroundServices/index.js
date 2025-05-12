const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cron = require('node-cron'); 
const mongoose = require('mongoose');

dotenv .config();

//db connection
const db = process.env.DB;
mongoose.connect(db).then(() => {
    console.log("MongoDB connection successful");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

//task scheduler
const run = () =>{
    cron.schedule('* * * * * *', () => {
 });
}
run();
//server connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backgound services are running on port ${PORT}`);
})