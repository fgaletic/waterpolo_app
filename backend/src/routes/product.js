import express from 'express';
import Product from '../models/product.js';

const router = express.Router();

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send({ error: 'Failed to fetch products' });
  }
});

// Get a single product by ID
router.get('/products/:id', async (req, res) => {
  console.log('Route handler executed');
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }

    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch product' });
  }
});

// Add a new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);

    // Validate before saving
    if (!product.name || !product.price || !product.sizes) {
      return res.status(400).send({ error: 'Missing required fields: name, price, sizes' });
    }

    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create product' });
  }
});

export default router;