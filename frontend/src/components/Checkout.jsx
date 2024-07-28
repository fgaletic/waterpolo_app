import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import axios from 'axios';

const Checkout = () => {
  const { cart } = useContext(CartContext);

  const handleCheckout = async () => {
    const order = {
      user: 'user-id-placeholder',  // Replace with actual user ID
      products: cart.map(item => ({ product: item.product._id, quantity: item.quantity })),
      totalPrice: cart.reduce((total, item) => total + item.product.price * item.quantity, 0),
    };
    await axios.post('/api/orders', order);
    alert('Order placed successfully');
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={handleCheckout}>Place Order</button>
    </div>
  );
};

export default Checkout;
