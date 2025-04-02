const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // For serving static files (optional)
const bidUserRoutes = require("./Route/BidUserRoutes");
const bidShipRoutes = require("./Route/BidShipRoutes");
const bidFeedbackUserRoutes = require("./Route/BidFeedbackUserRoutes");
const Stripe = require('stripe');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));//profile pic

// Initialize Stripe with your secret key from .env
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Mount API routes
app.use("/bid-users", bidUserRoutes);
app.use("/bid-ship-users", bidShipRoutes);
app.use("/bid-feedback-users", bidFeedbackUserRoutes);

// Payment route with dynamic success_url
// app.js (partial)
app.post('/create-checkout-session', async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const frontendPort = req.body.frontendPort || 3000;
    console.log('Using frontendPort:', frontendPort); // Debug log
    const items = req.body.items || [{ name: 'Auction Item', price: 1000, quantity: 1 }];

    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `http://localhost:${frontendPort}/success`,
      cancel_url: `http://localhost:${frontendPort}/cancel`,
    });
    res.json({ id: session.id });
  } catch (error) {
    console.error('FULL Checkout session error:', error);
    res.status(500).json({ 
      error: 'Failed to create checkout session',
      details: error.message,
      stack: error.stack 
    });
  }
});

// Optional: Serve React frontend (only if built and served on 5000)
// Uncomment if you want backend to serve frontend
/*
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});
*/

mongoose
  .connect("mongodb+srv://admin:OohgQREfU16jEpue@cluster0.mbzct.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000);
    console.log("Server running on port 5000");
  })
  .catch((err) => console.log(err));