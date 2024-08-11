import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
  totalPrice: Number,
  status: { type: String, default: 'Pending' },
});

export default mongoose.model('Order', OrderSchema);
