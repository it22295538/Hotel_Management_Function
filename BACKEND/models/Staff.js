const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const satffSchema = new Schema({
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
  
  address: {
    type: String,
    required: true,
  },

  nic: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  birthdate: {
    type: String,
    required: true,
  },
  
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ['Manager','FrontDesk','HouseKeeper','PackageManager'],
    required: true,
    
  },

  
});

const Staff = mongoose.model("Staff", satffSchema);

module.exports = Staff;