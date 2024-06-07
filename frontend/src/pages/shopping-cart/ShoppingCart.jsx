import { useState } from 'react';

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);

  
  const removeFromCart = (itemToRemove) => {
    setCart(cart.filter((item) => item !== itemToRemove));
  };


  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.map((item, index) => (
        <div key={index}>
          <p>{item.name}</p>
          <p>{item.price}</p>
          <button onClick={() => removeFromCart(item)}>Remove from cart</button>
        </div>
      ))}
    </div>
  );
}

export default ShoppingCart;