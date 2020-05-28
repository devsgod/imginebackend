const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  // id:{
  //   type: String,
  //   required: true,
  //   unique: true,
  //   trim: true,
  //   minlength: 1
  // },
  name: {
    type: String,
    required: true,
    minlength: 1
  },
  email: {
    type: String,
    required: true,
    minlength: 1
  },
  subject: {
    type: String,
    required: true,
    minlength: 1
  },
  phone: {
    type: String,
    required: true,
    minlength: 1
  },
  message: {
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

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;