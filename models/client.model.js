const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  imageurl: {
    type: String,
  },
}, {
  timestamps: true,
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;