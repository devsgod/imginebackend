const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsletterSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  }
}, {
  timestamps: true,
});

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

module.exports = Newsletter;