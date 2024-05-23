const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  
  country: {
    type: String,
    required: true,
  },
  
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "CUSTOMER",
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },

  
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;