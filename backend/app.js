const express = require("express");
const mongoose = require("mongoose");
const UserRoute = require("./Route/UserRoute");
const SellerRoute = require("./Route/SellerRoute");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // Add fs for file deletion

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Define routes
app.use("/users", UserRoute);
app.use("/items", SellerRoute);
app.use("/files", express.static(path.join(__dirname, "../frontend/src/Components/ImgUploader/files")));

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

// Image Handling
const ImgSchema = require("./Model/ImgModel");

const storageimg = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/src/Components/ImgUploader/files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const uploadimg = multer({ storage: storageimg });

app.post("/upload-img", uploadimg.single("image"), async (req, res) => {
  const imageName = req.file.filename;
  try {
    await ImgSchema.create({ image: imageName });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: error.message });
  }
});

app.get("/getImage", async (req, res) => {
  try {
    const data = await ImgSchema.find({});
    res.json({ status: "ok", data: data });
  } catch (error) {
    res.json({ status: "error", error: error.message });
  }
});

// New Delete Endpoint
app.delete("/delete-image/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the image document
    const imageDoc = await ImgSchema.findById(id);
    if (!imageDoc) {
      return res.status(404).json({ status: "error", message: "Image not found" });
    }

    // Delete the file from the filesystem
    const filePath = path.join(__dirname, "../frontend/src/Components/ImgUploader/files", imageDoc.image);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Remove the file
    }

    // Delete the document from MongoDB
    await ImgSchema.findByIdAndDelete(id);

    res.json({ status: "ok", message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});