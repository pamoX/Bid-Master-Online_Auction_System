const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const UserRoute = require("./Route/UserRoute");
const SellerRoute = require("./Route/SellerRoute");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define routes
app.use("/users", UserRoute);
app.use("/items", SellerRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    // Handle multer errors specifically
    if (err.name === 'MulterError') {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
    
    res.status(500).json({
        success: false,
        message: 'Something went wrong on the server',
        error: err.message
    });
});

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