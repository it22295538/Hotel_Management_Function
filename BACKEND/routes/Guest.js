const express = require("express");

const router = express.Router();


const Guest = require("../models/Guest.js");


//to insert/add a guest

router.route("/register").post(async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const address =  req.body.address;
  const nic  = req.body.nic;
  const country  = req.body.country;
  const passportNum  = req.body.passportNum;
  const children  = req.body.children;
  const roomDetails  = req.body.roomDetails;
  const checkin  = req.body.checkin;
  const checkout  = req.body.checkout;


  

  try {
    const newGuest = new Guest({
      firstName,
      lastName,
      email,
      mobile,
      address,
      nic,
      country,
      passportNum,
      children,
      roomDetails,
      checkin,
      checkout
    });

    const savedGuest= await newGuest.save();

    console.log("Guest Added:", savedGuest);
    res.status(200).json({
      success: true,
      data: savedGuest,
      message: "Guest added successfully!",
    });
  } catch (err) {
    console.error("Error adding Guest:", err);
    res.status(500).json({
      success: false,
      data: {},
      message: err,
    });
  }
});


//To display Guest //get details of all the Guest


router.route("/displayAll").get(async (req, res) => {
  try {
    const guestList = await Guest.find();
    res.status(200).json({
      success: true,
      data: guestList,
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      data: [],
      message: "Fail",
    });
  }

  
});

//To update Guest


router.route("/update/:id").put(async (req, res) => {
  try {
    let guestId = req.params.id;
    const {
        firstName,
        lastName,
        email,
        mobile,
        address,
        nic,
        country,
        passportNum,
        children,
        roomDetails,
        checkout,
        checkin
    } = req.body;

    const updateGuest= {
        firstName,
        lastName,
        email,
        mobile,
        address,
        nic,
        country,
        passportNum,
        children,
        roomDetails,
        checkout,
        checkin
    };

    const update = await Guest
      .findByIdAndUpdate(guestId, updateGuest)
      .then(() => {
        res.status(200).json({
          success: true,
          data: updateGuest,
          message: "Guest updated",
        });
      });
  } catch (err) {
    console.error("Error updating the Guest:", err);
    res.status(500).json({
      success: false,
      data: {},
      message: err,
    });
  }
});

//To delete Guest


router.route("/deleteGuest/:id").delete(async (req, res) => {
  let guestId = req.params.id;
  try {
    await Guest.findByIdAndDelete(guestId).then(() => {
      res.status(200).json({
        success: true,
        message: "Guest deleted",
      });
    });
  } catch (err) {
    console.log("Error deleting a Guest:", err);
    res.status(500).send({
      success: false,
      status: "Error with deleting the Guest",
      message: err,
    });
  }
});

//Fetch details of one Guest
router.route("/get/:id").get(async (req, res) => {
  let guestId = req.params.id;
  try {
    const user = await Guest.findById(guestId).then((Guest) => {
      res.status(200).json({
        success: true,
        message: "guest fetched",
        data: guestId,
      });
    });
  } catch (err) {
    console.error("Error getting Guest details", err);
    res.status(500).json({
      success: false,
      data: {},
      message: err,
    });
  }
});


router.route('/summary').get(async (req, res) => {
  try {
    const guestProfiles = await Guest.find();
    const totalProfiles = guestProfiles.length;
    const averageProfilesPerMonth = totalProfiles / 12; // assuming data is for a year
    const nationalityCounts = {};
    guestProfiles.forEach(profile => {
      nationalityCounts[profile.country] = (nationalityCounts[profile.country] || 0) + 1;
    });
    const topNationalities = Object.entries(nationalityCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([country, count]) => ({ country, count }));

    res.json({
      totalProfiles,
      averageProfilesPerMonth,
      topNationalities
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});








module.exports = router;




