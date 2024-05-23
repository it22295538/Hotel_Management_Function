const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guestSchema = new Schema({
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
  },
  mobile: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
  },
  passportNum: {
    type: String
  },
  address: {
    type: String,
    required:true,
  },
  children: {
    type:Number,
    required:true,
  },

  roomDetails: {
    type: String,
    required:true,
  },

  checkin: {
    type: String,
    required:true,
  },
  checkout: {
    type: String,
    required:true,
  }

});

const Guest = mongoose.model("Guest", guestSchema);

module.exports = Guest;