const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },

  shipping : {
    type : Number,
  },
  tax : {
    type : Number,
  },
  total : {
    type : Number,
    required : true
  },
  status : {
    type : String,
    required : true,
    default: 'Process order'
  },
  payment : {
    type : String,
    required : true
  },
  cartData : {
    type : Object,
    required : true
  },
  buyerInfo : {
    firstName : {
      type : String,
      required : true
    },
    lastName : {
      type : String,
      required : true
    },
    company : {
      type : String,
    },
    address : {
      type : String,
      required : true
    },
    country : {
      type : String,
      required : true
    },
    townCity : {
      type : String,
      required : true
    },
    stateCounty : {
      type : String,
      required : true
    },
    postCode : {
      type : String,
      required : true
    },
    email : {
      type : String,
      required : true
    },
    phone : {
      type : String,
      required : true
    },
    invoiceFileName : {
      type : String,
    }
  },
  invoice : {
    number : {
      type : Number,
      unique : true,
      default: 0
    },
    fileName : {
      type : String,
    },
    filePath : {
      type : String
    }
  }
}, {
  timestamps: true,
});

const Orders = mongoose.model('Orders', userSchema);

module.exports = Orders;