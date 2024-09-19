import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Button, Typography, Box, CardMedia, Grid2 } from '@mui/material';

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
          <Grid2 container spacing={4} key={item.product._id} sx={{ borderBottom: '1px solid #ddd', paddingBottom: 2, marginBottom: 2 }}>
            <Grid2 item xs={4}>
              {/* Small Product Image */}
              <CardMedia
                component="img"
                height="100"
                image={item.product.image} // Use the product image dynamically
                alt={item.product.name}
                sx={{
                  objectFit: 'contain',
                  width: '100%',
                  maxWidth: '150px', // Adjust the size of the image
                }}
              />
            </Grid2>
            <Grid2 item xs={8}>
              {/* Product Details */}
              <Typography variant="h6">{item.product.name}</Typography>
              <Typography variant="body1">{item.product.description}</Typography>
              {item.product.selectedSize && ( // Only show size if available
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Size: {item.product.selectedSize}
                </Typography>
              )}
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
            </Grid2>
          </Grid2>
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