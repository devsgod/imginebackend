const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderidSchema = new Schema({
  orderid: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  }
}, {
  timestamps: true,
});

const Orderid = mongoose.model('Orderid', orderidSchema);

module.exports = Orderid;