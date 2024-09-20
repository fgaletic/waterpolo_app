import express from 'express';
import productRoutes from './product.js';
import stripeRoutes from './stripe.js';
// import orderRoutes from './order.js';
// import userRoutes from './user.js';

const router = express.Router();

// Use individual route files
router.use('/', productRoutes);
router.use('/stripe', stripeRoutes);
// router.use('/orders', orderRoutes);
// router.use('/users', userRoutes);

export default router;