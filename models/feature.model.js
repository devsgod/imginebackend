const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const featureSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  imageurl: {
    type: String,
  },
}, {
  timestamps: true,
});

const Feature = mongoose.model('Feature', featureSchema);

module.exports = Feature;