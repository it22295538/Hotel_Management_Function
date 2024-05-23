const express = require("express");
const { GeneratehashPassword } = require("../Utilities/hashPassword.js");
const router = express.Router();
const Staff = require("../models/Staff.js");
const nodemailer = require('nodemailer');

// To insert/add a Staff member
router.route("/register").post(async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobile,
      address,
      nic,
      gender,
      birthdate,
      password,
      role
    } = req.body;

    // Hash the password
    const hashedPassword = await GeneratehashPassword(password);

    // Create new Staff instance
    const newStaff = new Staff({
      firstName,
      lastName,
      email,
      mobile,
      address,
      nic,
      gender,
      birthdate,
      password: hashedPassword,
      role
    });

    // Save new staff member to the database
    const savedStaff = await newStaff.save();

    console.log("Staff Added:", savedStaff);

    // Send email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Send mail with defined transport object
    await transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'Registration Successful',
      text: `Your registration as a staff member is successful. Your first time login password is your NIC +@Bay.You can reset your password by using forget password.`
    });

    console.log('Email sent successfully');

    // Send response to client
    res.status(200).json({
      success: true,
      data: savedStaff,
      message: "Staff added successfully!"
    });
  } catch (err) {
    console.error("Error adding Staff:", err);
    res.status(500).json({
      success: false,
      data: {},
      message: err.message || "Internal Server Error"
    });
  }
});

//To update Staff


router.route("/register/:id").put(async (req, res) => {
  try {
    let staffId = req.params.id;
    const {
        firstName,
        lastName,
        email,
        mobile,
        address,
        nic,
        gender,
        birthdate,
        password,
        role,
    } = req.body;

    const updateStaff = {
        firstName,
        lastName,
        email,
        mobile,
        address,
        nic,
        gender,
        birthdate,
        password,
        role,
    };

    if (password) {
      const hashedPassword = await GeneratehashPassword(password);
      updateStaff.password = hashedPassword;
    }

    const update = await Staff
      .findByIdAndUpdate(staffId, updateStaff)
      .then(() => {
        res.status(200).json({
          success: true,
          data: updateStaff,
          message: "Staff updated",
        });
      });
  } catch (err) {
    console.error("Error updating the Staff:", err);
    res.status(500).json({
      success: false,
      data: {},
      message: err,
    });
  }
});

//To delete Staff


router.route("/deleteStaff/:id").delete(async (req, res) => {
  let staffId = req.params.id;
  try {
    await Staff.findByIdAndDelete(staffId).then(() => {
      res.status(200).json({
        success: true,
        message: "Staff deleted",
      });
    });
  } catch (err) {
    console.log("Error deleting a Staff:", err);
    res.status(500).send({
      success: false,
      status: "Error with deleting the Staff",
      message: err,
    });
  }
});

//display all staff
router.route("/displayAll").get(async (req, res) => {
  try {
    const staffList = await Staff.find();
    res.status(200).json({
      success: true,
      data: staffList,
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

// Fetch details of Staff
router.route("/get/:id").get(async (req, res) => {
  let staffId = req.params.id;
  try {
    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
        data: null
      });
    }
    res.status(200).json({
      success: true,
      message: "Staff fetched",
      data: staff
    });
  } catch (err) {
    console.error("Error getting Staff details", err);
    res.status(500).json({
      success: false,
      data: {},
      message: err.message
    });
  }
});

module.exports = router;




