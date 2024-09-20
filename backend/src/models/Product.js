import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  sizes: { type: [String], required: true },
  price: { type: Number, required: true },
  image: { type: String, required: false },
});

export default mongoose.model('Product', ProductSchema);