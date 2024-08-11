import express from 'express';
import stripePackage from 'stripe';

const router = express.Router();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) { 
  console.error('STRIPE_SECRET_KEY is not defined in the environment variables');
  process.exit(1);
}

const stripe = stripePackage(stripeSecretKey);

// Endpoint to create a payment intent
router.post('/payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;