const AdminProfile = require('../Models/ShipProfileModel');

// Create or Update Admin Profile (Upsert)
exports.createOrUpdateProfile = async (req, res) => {
    try {
        const { fullName, email, phone, password } = req.body;
        const profilePicture = req.file ? `/uploads/${req.file.filename}` : '';
        const profileData = { fullName, email, phone, password };
        if (profilePicture) profileData.profilePicture = profilePicture;

        const profile = await AdminProfile.findOneAndUpdate(
            { email },
            profileData,
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read Admin Profile
exports.getProfile = async (req, res) => {
    try {
        const profile = await AdminProfile.findOne();
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Admin Profile
exports.updateProfile = async (req, res) => {
    try {
        const { fullName, email, phone, password } = req.body;
        const profileData = { fullName, phone, password };
        if (req.file) profileData.profilePicture = `/uploads/${req.file.filename}`;

        const profile = await AdminProfile.findOneAndUpdate(
            { email },
            profileData,
            { new: true }
        );
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Admin Profile
exports.deleteProfile = async (req, res) => {
    try {
        const profile = await AdminProfile.findOneAndDelete();
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};