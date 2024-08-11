import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  size: String,
  imageUrl: String,
});

export default mongoose.model('Product', ProductSchema);
