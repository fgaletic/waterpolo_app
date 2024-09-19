import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Button, Typography, Box } from '@mui/material';

export const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {/* Back to Products Button */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="contained" sx={{ fontSize: '12px', padding: '5px 10px', marginBottom: 2 }}>
          Back to Products
        </Button>
      </Link>

      {cart.length > 0 ? (
        cart.map(item => (
          <Box key={item.product._id} sx={{ borderBottom: '1px solid #ddd', paddingBottom: 2, marginBottom: 2 }}>
            <Typography variant="h6">{item.product.name}</Typography>
            <Typography variant="body1">{item.product.description}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Price: ${item.product.price}
            </Typography>
            <Typography variant="body2">Quantity: {item.quantity}</Typography>

            {/* Remove Button */}
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => removeFromCart(item.product._id)}
              sx={{ marginTop: 1 }}
            >
              Remove
            </Button>
          </Box>
        ))
      ) : (
        <Typography variant="body1">Your cart is empty.</Typography>
      )}

      {/* Proceed to Checkout Button */}
      {cart.length > 0 && (
        <Link to="/checkout" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" sx={{ fontSize: '14px', marginTop: 2 }}>
            Proceed to Checkout
          </Button>
        </Link>
      )}
    </Box>
  );
};