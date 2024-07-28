const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  size: String,
  imageUrl: String,
});

module.exports = mongoose.model('Product', ProductSchema);
