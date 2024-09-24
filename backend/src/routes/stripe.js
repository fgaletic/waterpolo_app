import express from 'express';
import Product from '../models/product.js'; // Ensure the correct path to your Product model
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_KM6uJqqKNdXCXgrWCU7D3yKZ'); // Initialize Stripe

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  const { products } = req.body;

  try {
    // Log the incoming products from the request
    console.log('Incoming products:', products);

    // Fetch product details from MongoDB using the product IDs
    const productIds = products.map((p) => p.id);
    console.log('Fetching products with IDs:', productIds);

    const fetchedProducts = await Product.find({ _id: { $in: productIds } });
    console.log('Fetched products from DB:', fetchedProducts);

    // Create line items for Stripe Checkout session
    const lineItems = fetchedProducts.map((product) => {
      const cartItem = products.find((p) => p.id === product._id.toString());
      const quantity = cartItem.quantity;
      const size = cartItem.size;

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: `${product.name} (${size})`,
            description: product.description,
          },
          unit_amount: product.price, // Price in cents
        },
        quantity,
      };
    });

    console.log('Line items for Stripe session:', lineItems);

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    console.log('Stripe session created:', session.id);
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    res.status(500).send({ error: error.message });
  }
});

export default router;