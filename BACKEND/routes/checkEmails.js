const express = require("express");
const router = express.Router();

const Customer = require("../models/Customers.js");
const Staff = require("../models/Staff.js");


router.get("/emailCheck/:email", async (req, res) => {
  const { email } = req.params;

  try {
    // Check if the email already exists in the customer database
    const existingCustomer = await Customer.findOne({ email });

    // Check if the email already exists in the staff database
    const existingStaff = await Staff.findOne({ email });

   
    const emailExists = existingCustomer || existingStaff;

    res.status(200).json({ exists: emailExists });
  } catch (err) {
    console.error("Error checking email:", err);
    res.status(500).json({
      success: false,
      message: "Error checking email",
      error: err,
    });
  }
});

module.exports = router;
