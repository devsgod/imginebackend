const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  oldPrice : {
    type : Number,
  },
  quantity : {
    type : Number,
    required : true,
    default : 1
  },
  rating: {
    type: Number,
    required: true,
  },
  imageurl: {
    type: String,
    required : true
  },
  categoryInfo : {
    type : Schema.Types.ObjectId,
    ref  : "Category"
  },
  description : {
    type : String,
    default : ''
  }
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', userSchema);

module.exports = Product;