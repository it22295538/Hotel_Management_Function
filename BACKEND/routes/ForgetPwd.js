
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Staff = require('../models/Staff'); 
const Customer = require('../models/Customers'); 
const { GeneratehashPassword } = require("../Utilities/hashPassword.js");




// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

router.route('/send-otp').post(async (req, res) => {
    const { email } = req.body;

    try {
       
        const existingUser = await Staff.findOne({ email }) || await Customer.findOne({ email });

        
        if (!existingUser) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Generate random OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpTimestamp = Date.now();

        //email
        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: 'Password Reset OTP',
            text: `Here we are Hotel elephant bay crew. Your OTP for password reset is ${otp}.`
        };

        // Send email with OTP
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.log(error);
                res.status(500).json({ error: 'Failed to send OTP' });
            } else {
                res.json({ success: true, otp: otp.toString(), timestamp: otpTimestamp });
            }
        });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.route('/reset-password').post(async (req, res) => {
    const { email, newPassword  } = req.body;

    try {
        
        let user;

        
        user = await Staff.findOne({ email });

        
        if (!user) {
            user = await Customer.findOne({ email});
        }

        
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        
       

        
        const hashedPassword = await GeneratehashPassword(newPassword);

        if (!hashedPassword) {
            return res.status(400).json({ error: 'Failed to generate hashed password' });
        }

      
        await user.updateOne({ password: hashedPassword });

      
        res.status(200).json({ success: true, message: 'Password reset successfully' });

    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;

