const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
  totalPrice: Number,
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Order', OrderSchema);
