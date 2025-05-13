// Import the BidUser model
const BidUserModel = require("../Model/BidUserModel");

// Get all bid users from the database
const getAllBidUsers = async (req, res, next) => {
  let bidUsers;
  try {
    bidUsers = await BidUserModel.find(); // find all users
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error finding bid users" });
  }

  // if no users are found
  if (!bidUsers || bidUsers.length === 0) {
    return res.status(404).json({ message: "No bid users found" });
  }

  // send the users in response
  return res.status(200).json({ bidUsers });
};

// Create one or more bid users
const createBidUsers = async (req, res, next) => {
  const bidUserData = Array.isArray(req.body) ? req.body : [req.body]; // support array or single object
  let createdBidUsers = [];

  try {
    for (const data of bidUserData) {
      const {
        name,
        email,
        age,
        gender,
        address,
        phone,
        username,
        password,
      } = data;

      // if a picture was uploaded, get the file path
      const picture = req.file ? req.file.path : null;

      // create a new user object
      const newBidUser = new BidUserModel({
        name,
        email,
        age,
        gender,
        address,
        phone,
        username,
        password,
        picture,
      });

      // save to the database
      await newBidUser.save();
      createdBidUsers.push(newBidUser);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error adding bid users" });
  }

  // if no users were created
  if (createdBidUsers.length === 0) {
    return res.status(404).json({ message: "Unable to add bid users" });
  }

  // send the created users in response
  return res.status(200).json({ bidUsers: createdBidUsers });
};

// Get one user by ID
const getBidUserById = async (req, res, next) => {
  const bidUserId = req.params.id;
  let bidUser;

  try {
    // find user by id
    bidUser = await BidUserModel.findById(bidUserId);
    // you can also return only email using .select('email') if needed
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error finding bid user" });
  }

  // if user not found
  if (!bidUser) {
    return res.status(404).json({ message: "Bid user not found" });
  }

  // send the user in response
  return res.status(200).json({ bidUser });
};

// Update a user by ID
const updateBidUser = async (req, res, next) => {
  const bidUserId = req.params.id;
  const {
    name,
    email,
    age,
    gender,
    address,
    phone,
    username,
    password,
  } = req.body;

  // get the uploaded picture if any
  const picture = req.file ? req.file.path : undefined;
  let updatedBidUser;

  try {
    // create an object with updated values
    const updateData = {
      name,
      email,
      age,
      gender,
      address,
      phone,
      username,
      password,
    };

    // add picture only if uploaded
    if (picture) updateData.picture = picture;

    // update the user in the database
    updatedBidUser = await BidUserModel.findByIdAndUpdate(
      bidUserId,
      updateData,
      { new: true } // return the updated document
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error updating bid user" });
  }

  // if user was not found
  if (!updatedBidUser) {
    return res.status(404).json({ message: "Unable to update bid user details" });
  }

  // send the updated user in response
  return res.status(200).json({ bidUser: updatedBidUser });
};

// Delete a user by ID
const deleteBidUser = async (req, res, next) => {
  const bidUserId = req.params.id;
  let deletedBidUser;

  try {
    // delete the user from the database
    deletedBidUser = await BidUserModel.findByIdAndDelete(bidUserId);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error deleting bid user" });
  }

  // if user was not found
  if (!deletedBidUser) {
    return res.status(404).json({ message: "Unable to delete bid user" });
  }

  // send the deleted user in response
  return res.status(200).json({ bidUser: deletedBidUser });
};

// Export all functions so they can be used in routes
module.exports = {
  getAllBidUsers,
  createBidUsers,
  getBidUserById,
  updateBidUser,
  deleteBidUser,
};
