// queue for products on the way of selling
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const queueSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
  },
  city: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

const Queue = mongoose.model('Queue', queueSchema);

module.exports = Queue;