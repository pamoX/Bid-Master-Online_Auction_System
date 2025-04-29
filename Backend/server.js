const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb+srv://admin:OohgQREfU16jEpue@cluster0.mbzct.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Import routes
const bidNowRoutes = require('./Route/BidNowRoutes');
const bidUserRoutes = require('./Route/BidUserRoutes');

// Use routes
app.use('/api/bid-now', bidNowRoutes);
app.use('/bid-users', bidUserRoutes);

// Serve uploads directory statically
app.use('/uploads', express.static('uploads'));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 