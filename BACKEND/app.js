//password = VrARJmEJAsPQ24Dp
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const shipmentRouter = require('./Routes/ShipmentRouter.js');
const shipperRouter = require('./Routes/ShipperRouter.js');
const shipAdminRouter = require('./Routes/ShipAdminRouter.js');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: 'http://localhost:3000' } });

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/v1/shipments', shipmentRouter);
app.use('/api/v1/shippers', shipperRouter);
app.use('/api/v1/shipadmin', shipAdminRouter);
app.use('/api/v1/shadmin', require('./Routes/ShipProfileRouter.js'));

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log('Connected to MongoDB'))
    .then(() => {
        server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error('MongoDB connection error:', err));

// Socket.IO
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

/*
require('events').EventEmitter.defaultMaxListeners = 20;
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

//const userRouter = require("./Routes/UserRouter.js");
const shipmentRouter = require("./Routes/ShipmentRouter.js");
const shipperRouter = require("./Routes/ShipperRouter.js");

const app = express();
const cors = require('cors');

 
const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json());
app.use(cors());+


//Routesapp.use("/users", userRouter);

app.use("/shipments", shipmentRouter);
app.use("/shippers", shipperRouter);

//mongoDB connection
mongoose.connect("mongodb+srv://admin:VrARJmEJAsPQ24Dp@bidshipping.zfwc4.mongodb.net/bidShipping?retryWrites=true&w=majority", {}) 
.then(() => console.log("Connected to MongoDB"))
.then(() => {
    //app.listen(5000);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => console.log((err)));

*/
 

