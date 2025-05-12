const mongoose = require('mongoose');

const shipProfileSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [/^\+?\d{10,15}$/, 'Please enter a valid phone number']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
    },
    profilePicture: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('AdminProfile', shipProfileSchema);