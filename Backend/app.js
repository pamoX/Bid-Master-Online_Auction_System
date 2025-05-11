const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const reportRouter = require("./Routes/ReportRoutes");
const itemRouter = require("./Routes/ItemRoutes");

const app = express();
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/reports", reportRouter);
app.use("/items", itemRouter);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
const fs = require('fs');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: "Something went wrong!", 
    error: err.message 
  });
});

mongoose.connect("mongodb+srv://pamo:hICN2z11pmV4ChPu@cluster0.qy66w.mongodb.net/")
.then(() => console.log("Connected to MongoDB"))
.then(() => {
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
})
.catch((err) => console.log((err)));