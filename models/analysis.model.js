const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const analysisSchema = new Schema({
  today: {
    type: String,
    required: true,
  },
  signin: {
    type: Number,
  },
  signup: {
    type: Number,
  },
  signout: {
    type: Number,
  },
  soldproducts: {
    type: Number,
  }
}, {
  timestamps: true,
});

const Analysis = mongoose.model('Analysis', analysisSchema);

module.exports = Analysis;