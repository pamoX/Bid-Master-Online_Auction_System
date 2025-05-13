// Import the BidShipUser model
const BidShipUserModel = require("../Model/BidShipModel");

// Get all bid ship users from the database
const getAllBidShipUsers = async (req, res, next) => {
  let bidShipUsers;
  try {
    bidShipUsers = await BidShipUserModel.find(); // find all users
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error finding bid ship users" });
  }

  // check if no users were found
  if (!bidShipUsers || bidShipUsers.length === 0) {
    return res.status(404).json({ message: "No bid ship users found" });
  }

  // return the list of users
  return res.status(200).json({ bidShipUsers });
};

// Create one or more bid ship users
const createBidShipUsers = async (req, res, next) => {
  // support both single object and array of objects
  const bidShipUserData = Array.isArray(req.body) ? req.body : [req.body];
  let createdBidShipUsers = [];

  try {
    for (const data of bidShipUserData) {
      const { fullname, email, age, mobileNo, shippingAddress, postalCode, country } = data;

      // create a new user
      const newBidShipUser = new BidShipUserModel({
        fullname,
        email,
        age,
        mobileNo,
        shippingAddress,
        postalCode,
        country,
      });

      // save to the database
      await newBidShipUser.save();
      createdBidShipUsers.push(newBidShipUser);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error adding bid ship users" });
  }

  // check if users were not added
  if (createdBidShipUsers.length === 0) {
    return res.status(404).json({ message: "Unable to add bid ship users" });
  }

  // return the created users
  return res.status(200).json({ bidShipUsers: createdBidShipUsers });
};

// Get a single bid ship user by ID
const getBidShipUserById = async (req, res, next) => {
  const bidShipUserId = req.params.id;
  let bidShipUser;

  try {
    bidShipUser = await BidShipUserModel.findById(bidShipUserId); // find by ID
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error finding bid ship user" });
  }

  // if user not found
  if (!bidShipUser) {
    return res.status(404).json({ message: "Bid ship user not found" });
  }

  // return the user
  return res.status(200).json({ bidShipUser });
};

// Update a bid ship user by ID
const updateBidShipUser = async (req, res, next) => {
  const bidShipUserId = req.params.id;
  const { fullname, email, age, mobileNo, shippingAddress, postalCode, country } = req.body;
  let updatedBidShipUser;

  try {
    // update the user and return the new updated one
    updatedBidShipUser = await BidShipUserModel.findByIdAndUpdate(
      bidShipUserId,
      { fullname, email, age, mobileNo, shippingAddress, postalCode, country },
      { new: true }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error updating bid ship user" });
  }

  // if update failed
  if (!updatedBidShipUser) {
    return res.status(404).json({ message: "Unable to update bid ship user details" });
  }

  // return the updated user
  return res.status(200).json({ bidShipUser: updatedBidShipUser });
};

// Delete a bid ship user by ID
const deleteBidShipUser = async (req, res, next) => {
  const bidShipUserId = req.params.id;
  let deletedBidShipUser;

  try {
    // delete the user by ID
    deletedBidShipUser = await BidShipUserModel.findByIdAndDelete(bidShipUserId);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error deleting bid ship user" });
  }

  // if delete failed
  if (!deletedBidShipUser) {
    return res.status(404).json({ message: "Unable to delete bid ship user" });
  }

  // return the deleted user
  return res.status(200).json({ bidShipUser: deletedBidShipUser });
};

// Export all functions
module.exports = {
  getAllBidShipUsers,
  createBidShipUsers,
  getBidShipUserById,
  updateBidShipUser,
  deleteBidShipUser,
};
