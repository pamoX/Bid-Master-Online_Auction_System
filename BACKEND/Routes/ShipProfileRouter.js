const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
    createOrUpdateProfile,
    getProfile,
    updateProfile,
    deleteProfile
} = require('../Controllers/ShipProfileController');

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

shprofilerouter.post('/profile', upload.single('profilePicture'), createOrUpdateProfile);
shprofilerouter.get('/profile', getProfile);
shprofilerouter.put('/profile', upload.single('profilePicture'), updateProfile);
shprofilerouter.delete('/profile', deleteProfile);

module.exports = shprofilerouter;