// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for the vendor
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);
