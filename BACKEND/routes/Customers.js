const express = require("express");
const { GeneratehashPassword } = require("../Utilities/hashPassword.js");
const router = express.Router();
const Customer = require("../models/Customers.js");
const PDFDocument = require('pdfkit');

const fs = require('fs');



router.route('/register').post(async (req, res) => {
  try {
    
    const { firstName, lastName, email, mobile, country, password } = req.body;

    
    const hashedPassword = await GeneratehashPassword(password);
    const registrationDate = new Date();

    
    const newCustomer = new Customer({
      firstName,
      lastName,
      email,
      mobile,
      country,
      password: hashedPassword,
      role: "CUSTOMER",
      registrationDate
    });

    
    await newCustomer.save();

   
    res.status(201).json({
      success: true,
      data: {},
      message: 'Customer registered successfully'
    });
  } catch (error) {
    console.error('Error registering customer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//To update customers


router.route("/update/:id").put(async (req, res) => {
  try {
    let userid = req.params.id;
    const {
      firstName,
      lastName,
      email,
      mobile,
      country,
      
    } = req.body;

    const updateCustomer = {
      firstName,
      lastName,
      email,
      mobile,
      country,
      
    };

    const updatedCustomer = await Customer.findByIdAndUpdate(userid, updateCustomer)

    if (!updatedCustomer) {

      res.status(404).json({
        success: false,
        data: updateCustomer,
        message: "customer update fail",
      });

    }

    res.status(200).json({
      success: true,
      data: updateCustomer,
      message: "customer updated",
    });

  } catch (err) {
    console.error("Error updating the customer:", err);
    res.status(500).json({
      success: false,
      data: {},
      message: err,
    });
  }
});

//To display Customers ,get details of all the Customers


router.route("/displayAll").get(async (req, res) => {
  try {
    const customerList = await Customer.find();
    res.status(200).json({
      success: true,
      data: customerList,
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
//To delete customer


router.route("/deleteCustomer/:id").delete(async (req, res) => {
  let userid = req.params.id;
  try {
    await Customer.findByIdAndDelete(userid).then(() => {
      res.status(200).json({
        success: true,
        message: "Customer deleted",
      });
    });
  } catch (err) {
    console.log("Error deleting a customer:", err);
    res.status(500).send({
      success: false,
      status: "Error with deleting the customer",
      message: err,
    });
  }
});

//Fetch one customers details
router.route("/get/:id").get(async (req, res) => {
  let userid = req.params.id;
  try {
    const customer = await Customer.findById(userid);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
        data: null
      });
    }
    res.status(200).json({
      success: true,
      message: "Customer fetched",
      data: customer
    });
  } catch (err) {
    console.error("Error getting customer details", err);
    res.status(500).json({
      success: false,
      data: {},
      message: err.message
    });
  }
});

router.route('/generatePDF/:month/:year').get(async (req, res) => {
  const { month, year } = req.params;

  try {
    // Convert month and year to numbers
    const targetMonth = parseInt(month);
    const targetYear = parseInt(year);

    // Query the database for new customer accounts created within the specified month and year
    const newCustomers = await Customer.find({
      registrationDate: {
        $gte: new Date(targetYear, targetMonth - 1, 1), // Start of the month
        $lt: new Date(targetYear, targetMonth, 1) // Start of the next month
      }
    });

    // Count the number of new accounts
    const newAccountsCount = newCustomers.length;

    // Group customers by country
    const countriesCount = {};
    newCustomers.forEach(customer => {
      const country = customer.country;
      countriesCount[country] = (countriesCount[country] || 0) + 1;
    });

    // Create a PDF document
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=new_accounts_report_${month}_${year}.pdf`);

    doc.pipe(res);

    doc.fontSize(16).text(`New Accounts Report - ${month}/${year}`, { align: 'center' }).moveDown();
    doc.fontSize(14).text(`Total New Accounts: ${newAccountsCount}`, { align: 'center' }).moveDown();
    doc.fontSize(12).text('Accounts by Country:', { align: 'left' }).moveDown();

    // Display accounts by country
    Object.entries(countriesCount).forEach(([country, count]) => {
      doc.text(`${country}: ${count}`, { align: 'left' }).moveDown();
    });

    doc.end();

    console.log('PDF report generated successfully.');
  } catch (error) {
    console.error('Error generating PDF report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;




