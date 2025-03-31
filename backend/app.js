const express = require("express");
const mongoose = require("mongoose");
const UserRoute = require("./Route/UserRoute");
const SellerRoute = require("./Route/SellerRoute");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Define routes
app.use("/users", UserRoute);
app.use("/items", SellerRoute);

// MongoDB connection
mongoose
    .connect("mongodb+srv://Seller:ZFi98iqbEniPHrOp@cluster0.r9x82.mongodb.net/")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });
    })
    .catch((err) => console.log("MongoDB connection error:", err));