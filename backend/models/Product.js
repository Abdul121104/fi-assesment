const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  image_url: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Product', ProductSchema); 