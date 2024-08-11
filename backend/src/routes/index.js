import express from 'express';
import orderRoutes from './order.js';
import productRoutes from './product.js';
import stripeRoutes from './stripe.js';
import userRoutes from './user.js';

const router = express.Router();

// Use individual route files
router.use('/orders', orderRoutes);
router.use('/products', productRoutes);
router.use('/stripe', stripeRoutes);
router.use('/users', userRoutes);

export default router;