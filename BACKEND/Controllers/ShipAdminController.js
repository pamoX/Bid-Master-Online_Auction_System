const ShipAdminModel = require("../Models/ShipAdminModel");

const getAllShipAdmins = async (req, res, next) => {
  let shipAdmins;
  try {
    shipAdmins = await ShipAdminModel.find();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error finding ship admins" });
  }
  if (!shipAdmins || shipAdmins.length === 0) {
    return res.status(404).json({ message: "No ship admins found" });
  }
  return res.status(200).json({ shipAdmins });
};

const createShipAdmins = async (req, res, next) => {
  const shipAdminData = Array.isArray(req.body) ? req.body : [req.body];
  let createdShipAdmins = [];
  try {
    for (const data of shipAdminData) {
      const {
        name,
        email,
        dob,
        gender,
        address,
        phone,
        username,
        password,
      } = data;
      const picture = req.file ? req.file.path : null;
      const newShipAdmin = new ShipAdminModel({
        name,
        email,
        dob,
        gender,
        address,
        phone,
        username,
        password,
        picture,
      });
      await newShipAdmin.save();
      createdShipAdmins.push(newShipAdmin);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error adding ship admins" });
  }
  if (createdShipAdmins.length === 0) {
    return res.status(404).json({ message: "Unable to add ship admins" });
  }
  return res.status(200).json({ shipAdmins: createdShipAdmins });
};

const getShipAdminById = async (req, res, next) => {
  const shipAdminId = req.params.id;
  let shipAdmin;
  try {
    shipAdmin = await ShipAdminModel.findById(shipAdminId);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error finding ship admin" });
  }
  if (!shipAdmin) {
    return res.status(404).json({ message: "Ship admin not found" });
  }
  return res.status(200).json({ shipAdmin });
};

const updateShipAdmin = async (req, res, next) => {
  const shipAdminId = req.params.id;
  const {
    name,
    email,
    dob,
    gender,
    address,
    phone,
    username,
    password,
  } = req.body;
  const picture = req.file ? req.file.path : undefined;
  let updatedShipAdmin;
  try {
    const updateData = {
      name,
      email,
      dob,
      gender,
      address,
      phone,
      username,
      password,
    };
    if (picture) updateData.picture = picture;
    updatedShipAdmin = await ShipAdminModel.findByIdAndUpdate(
      shipAdminId,
      updateData,
      { new: true }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error updating ship admin" });
  }
  if (!updatedShipAdmin) {
    return res.status(404).json({ message: "Unable to update ship admin details" });
  }
  return res.status(200).json({ shipAdmin: updatedShipAdmin });
};

const deleteShipAdmin = async (req, res, next) => {
  const shipAdminId = req.params.id;
  let deletedShipAdmin;
  try {
    deletedShipAdmin = await ShipAdminModel.findByIdAndDelete(shipAdminId);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error deleting ship admin" });
  }
  if (!deletedShipAdmin) {
    return res.status(404).json({ message: "Unable to delete ship admin" });
  }
  return res.status(200).json({ shipAdmin: deletedShipAdmin });
};

module.exports = {
  getAllShipAdmins,
  createShipAdmins,
  getShipAdminById,
  updateShipAdmin,
  deleteShipAdmin,
};
