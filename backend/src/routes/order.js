const express = require('express');
const Order = require('../models/order');

const router = express.Router();

// Create new order
router.post('/', async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.status(201).send(order);
});

// Get orders for a user
router.get('/:userId', async (req, res) => {
  const orders = await Order.find({ user: req.params.userId }).populate('products.product');
  res.send(orders);
});

module.exports = router;