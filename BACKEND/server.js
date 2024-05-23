const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const bcrypt = require('bcrypt');

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connection success!");
})
.catch((error) => {
    console.error("MongoDB connection error:", error);
});




//Customer routes
const customerRoutes = require('./routes/Customers.js');
app.use("/Hotel/Customer",customerRoutes) ;


//Staff routes
const staffRoutes = require('./routes/Staff.js');
app.use("/Hotel/Staff",staffRoutes) ;

//guest rotes

const guestRoutes = require('./routes/Guest.js');
app.use("/Hotel/Guest",guestRoutes) ;


//login 

const login = require('./routes/login.js');
app.use("/Hotel/User",login)

//check emails
const emailCheck = require('./routes/checkEmails.js');
app.use("/Hotel",emailCheck);

//reset password
const resetPWd = require('./routes/ForgetPwd.js');
app.use("/Hotel/Reset",resetPWd);


app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
})



