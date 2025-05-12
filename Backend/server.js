const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
require('./utils/auctionWinnerNotifier');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./Route/UserRoute'));
app.use('/api/bid-users', require('./Route/BidUserRoutes'));
// Add the Stripe webhook route - must be before express.json() middleware
app.use('/api/stripe', require('./Route/stripeWebhook'));
app.use('/api/items', require('./Route/ItemRoutes'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 