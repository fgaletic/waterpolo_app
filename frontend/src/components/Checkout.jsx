import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-publishable-key-here');

const CheckoutForm = () => {
  const { cart } = useContext(CartContext);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    address: ''
  });
  const stripe = useStripe();
  const elements = useElements();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  };

  const handleCheckout = async () => {
    if (!stripe || !elements) {
      return;
    }

    const order = {
      user: userInfo,
      products: cart.map(item => ({ product: item.product._id, quantity: item.quantity })),
      totalPrice: cart.reduce((total, item) => total + item.product.price * item.quantity, 0),
    };

    const { data: clientSecret } = await axios.post('/api/payment-intent', { amount: order.totalPrice });

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: userInfo.name,
          email: userInfo.email,
          address: {
            line1: userInfo.address,
          },
        },
      },
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        await axios.post('/api/orders', order);
        alert('Order placed successfully');
      }
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={userInfo.name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={userInfo.email} onChange={handleInputChange} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={userInfo.address} onChange={handleInputChange} />
        </div>
        <div>
          <CardElement />
        </div>
        <button type="button" onClick={handleCheckout} disabled={!stripe}>Place Order</button>
      </form>
    </div>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;