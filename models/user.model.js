const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1
  },
  username: {
    type: String,
    required: true,
    minlength: 1
  },
  role: {
    type: String
  },
  password: {
    type: String,
    required: true,
    minlength: 1
  },
  status: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
    minlength: 1
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1
  },
  mobile: {
    type: String,
    required: true,
    minlength: 1
  },
  accountname: {
    type: String,
    required: true,
    minlength: 1
  },
  accounturl: {
    type: String
  },
  businesstype: {
    type: String,
    required: true,
    minlength: 1
  },
  msg: {
    type: String,
    required: true,
    minlength: 1
  },
  companyName: {
    type: String,
    required: true,
    minlength: 1
  },
  signupStatus: {
    type: String,
    required: false,
    default: "Pending", 
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;