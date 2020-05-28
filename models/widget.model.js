const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const widgetSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
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

const Widget = mongoose.model('Widget', widgetSchema);

module.exports = Widget;