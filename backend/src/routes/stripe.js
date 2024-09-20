import express from 'express';
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  const { products } = req.body;

  try {
    // Fetch product details from MongoDB using the product IDs
    const productIds = products.map((p) => p.id);
    const fetchedProducts = await Product.find({ _id: { $in: productIds } });

    // Create line items for Stripe Checkout session
    const lineItems = fetchedProducts.map((product) => {
      const cartItem = products.find((p) => p.id === product._id.toString());
      const quantity = cartItem.quantity;
      const size = cartItem.size;

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: `${product.name} (${size})`, // Include size in the product name
            description: product.description,
          },
          unit_amount: product.price, // Price in cents
        },
        quantity,
      };
    });

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;