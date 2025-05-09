const express = require("express");
const mongoose = require("mongoose");
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

mongoose.connect("mongodb+srv://pamo:hICN2z11pmV4ChPu@cluster0.qy66w.mongodb.net/")
.then(() => console.log("connected to mongoDB"))
.then(() => {
    app.listen(5000);
})
.catch((err) => console.log((err)));