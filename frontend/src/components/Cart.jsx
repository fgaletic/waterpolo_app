
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.map(item => (
        <div key={item.product._id}>
          <h2>{item.product.name}</h2>
          <p>{item.product.description}</p>
          <p>${item.product.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => removeFromCart(item.product._id)}>Remove</button>
        </div>
      ))}
      <Link to="/checkout">
        <button>Proceed to Checkout</button>
      </Link>
    </div>
  );
};
