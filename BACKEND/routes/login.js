
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Customer = require("../models/Customers.js");
const Staff = require("../models/Staff.js");
const { comparePasswords } = require("../Utilities/hashPassword.js");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    
    let user = await Customer.findOne({ email });

    
    if (!user) {
      user = await Staff.findOne({ email });
    }

    
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    
    const passwordMatch = await comparePasswords(password, user.password);

    
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    
    const userType = user instanceof Customer ? 'customer' : 'staff';

    // If credentials are valid, generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });

    
    res.status(200).json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});






module.exports = router;

