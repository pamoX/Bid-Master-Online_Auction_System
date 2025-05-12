
const Shipment = require('../Models/ShipmentModel.js');
const Shipper = require('../Models/ShipperModel.js');
const PendingShipment = require('../Models/PendingShipmentModel.js');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

const sendNotification = async (email, subject, message) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        text: message
    });
};

const assignCourier = async (shipmenttype) => {
    const couriers = await Shipper.find({ companytype: shipmenttype });
    if (!couriers.length) throw new Error('No couriers available');
    return couriers.reduce((min, curr) => curr.rateperkg < min.rateperkg ? curr : min).providerid;
};

const getAllShipments = async (req, res) => {
    try {
        const shipments = await Shipment.find();
        res.status(200).json({ success: true, data: shipments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const addShipments = async (req, res, next) => {
  const {
    itemid,
    itemname,
    from,
    to,
    userName,
    email,
    phone,
    
    weight,
    shipmenttype,
    cost,
  } = req.body;
  try {
    const shipments = new Shipments({
      itemid: itemid,
      itemname: itemname,
      from: from,
      to: to,
      userName: userName,
      email: email,
      phone: phone,
      weight: weight,
      shipmenttype: shipmenttype,
      cost: cost,
    });
    await shipments.save();
    res.status(201).json({ message: "Shipment added", shipments }); // Single response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserShipments = async (req, res) => {
    try {
        const { email } = req.query;
        const shipments = await Shipment.find({
            $or: [{email: email }]
        }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: shipments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const submitShippingDetails = async (req, res) => {
    const { auctionid, userType, details } = req.body;
    try {
        let pendingShipment = await PendingShipment.findOne({ auctionid });
        if (!pendingShipment) {
            pendingShipment = new PendingShipment({ auctionid, [userType + 'Details']: details });
        } else {
            pendingShipment[userType + 'Details'] = details;
        }
        await pendingShipment.save();

        if (pendingShipment.buyerDetails && pendingShipment.sellerDetails) {
            const courierid = await assignCourier(pendingShipment.sellerDetails.shipmenttype);
            const courier = await Shipper.findOne({ providerid: courierid });
            const cost = pendingShipment.sellerDetails.weight * courier.rateperkg;
            const shipment = new Shipment({
                itemid: pendingShipment.sellerDetails.itemid,
                itemname: pendingShipment.sellerDetails.itemname,
                from: pendingShipment.sellerDetails.from,
                to: pendingShipment.buyerDetails.to,
                userName: pendingShipment.sellerDetails.userName,
                selleremail: pendingShipment.sellerDetails.email,
                phone: pendingShipment.sellerDetails.phone,
                //buyername: pendingShipment.buyerDetails.buyername,
                //buyeremail: pendingShipment.buyerDetails.buyeremail,
                //buyerphone: pendingShipment.buyerDetails.buyerphone,
                weight: pendingShipment.sellerDetails.weight,
                shipmenttype: pendingShipment.sellerDetails.shipmenttype,
                cost,
                courierid
            });
            await shipment.save();
            await PendingShipment.deleteOne({ auctionid });
            await sendNotification(shipment.email, 'Shipment Created', `Your shipment ${shipment.itemid} is pending.`);
           req.io.emit('shipmentUpdate', { itemid: shipment.itemid, status: shipment.status });
            res.status(201).json({ success: true, data: shipment });
        } else {
            res.status(200).json({ success: true, message: 'Details submitted, awaiting other party' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getByIdShipments = async (req, res) => {
    try {
        const shipment = await Shipment.findById(req.params.id);
        if (!shipment) return res.status(404).json({ success: false, message: 'Shipment not found' });
        res.status(200).json({ success: true, data: shipment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateShipment = async (req, res) => {
    const { id } = req.params;
    const { status, courierid, cost } = req.body;
    try {
        const shipment = await Shipment.findByIdAndUpdate(id, { status, courierid, cost }, { new: true });
        if (!shipment) return res.status(404).json({ success: false, message: 'Shipment not found' });
        if (status) {
            await sendNotification(shipment.email, `Shipment ${shipment.itemid} Updated`, `Status: ${status}`);
            req.io.emit('shipmentUpdate', { itemid: shipment.itemid, status });
        }
        res.status(200).json({ success: true, data: shipment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteShipment = async (req, res) => {
    try {
        const shipment = await Shipment.findByIdAndDelete(req.params.id);
        if (!shipment) return res.status(404).json({ success: false, message: 'Shipment not found' });
        res.status(200).json({ success: true, message: 'Shipment deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { 
  getAllShipments, 
  addShipments,
  getUserShipments, 
  submitShippingDetails, 
  getByIdShipments, 
  updateShipment, 
  deleteShipment };

/*
const getAllShipments = async (req, res, next) => {
  try {
    const shipments = await Shipments.find();
    if (!shipments) {
      return res.status(404).json({ message: "No shipments found" });
    }
    res.status(200).json(shipments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const addShipments = async (req, res, next) => {
  const {
    itemid,
    itemname,
    from,
    to,
    sellername,
    selleremail,
    sellerphone,
    buyername,
    buyeremail,
    buyerphone,
    weight,
    shipmenttype,
    cost,
  } = req.body;
  try {
    const shipments = new Shipments({
      itemid: itemid,
      itemname: itemname,
      from: from,
      to: to,
      sellername: sellername,
      selleremail: selleremail,
      sellerphone: sellerphone,
      buyername: buyername,
      buyeremail: buyeremail,
      buyerphone: buyerphone,
      weight: weight,
      shipmenttype: shipmenttype,
      cost: cost,
    });
    await shipments.save();
    res.status(201).json({ message: "Shipment added", shipments }); // Single response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//get by id
const getByIdShipments = async (req, res, next) => {
  const { shipid } = req.params;
  let shipments;
  try {
    shipments = await Shipments.findById(shipid);
    if (!shipments) {
      return res.status(404).json({ message: "Shipment not found" });
    }
    res.status(200).json(shipments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//update User detail
const updateShipments = async (req, res, next) => {
  const { shipid } = req.params;
  const {
    itemid,
    itemname,
    from,
    to,
    sellername,
    selleremail,
    sellerphone,
    buyername,
    buyeremail,
    buyerphone,
    weight,
    shipmenttype,
    cost,
  } = req.body;
  let shipments;

  try {
    shipments = await Shipments.findByIdAndUpdate(
      shipid,
      {
        itemid: itemid,
        itemname: itemname,
        from: from,
        to: to,
        sellername: sellername,
        selleremail: selleremail,
        sellerphone: sellerphone,
        buyername: buyername,
        buyeremail: buyeremail,
        buyerphone: buyerphone,
        weight: weight,
        shipmenttype: shipmenttype,
        cost: cost,
      },
      { new: true }
    );
    //save the updated data
    //shipments = await shipments.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }

  if (!shipments) {
    return res.status(404).json({ message: "Unable to update" });
  }
  res.status(200).json({ message: "Shipment updated", shipments });
};

//delete user details

const deleteShipments = async (req, res, next) => {
  const shipid = req.params.id;

  //create variable
  let shipments;

  try {
    shipments = await Shipments.findByIdAndDelete(shipid);
  } catch (err) {
    console.log(err);
  }

  if (!shipments) {
    return res
      .status(404)
      .json({ message: "Unable to delete -Shipment not found " });
  }

  return res.status(200).json({ message: "Shipment deleted", shipments });
};

// const getUserShipments = async (req, res, next) => {
//   try {
//     const shipments = await Shipments.find({
//       $or: [{ selleremail: req.body.email }, { buyeremail: req.body.email }],
//     }).sort({ createdAt: -1 });
//     res.status(200).json(shipments);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

exports.getAllShipments = getAllShipments;
exports.addShipments = addShipments;
exports.getByIdShipments = getByIdShipments;
exports.updateShipments = updateShipments;
exports.deleteShipments = deleteShipments;
//exports.getUserShipments = getUserShipments;
*/
