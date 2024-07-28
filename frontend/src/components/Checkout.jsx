import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import axios from 'axios';

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    address: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  };

  const handleCheckout = async () => {
    const order = {
      user: userInfo,  // Collect user info at checkout
      products: cart.map(item => ({ product: item.product._id, quantity: item.quantity })),
      totalPrice: cart.reduce((total, item) => total + item.product.price * item.quantity, 0),
    };
    await axios.post('/api/orders', order);
    alert('Order placed successfully');
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
        <button type="button" onClick={handleCheckout}>Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;