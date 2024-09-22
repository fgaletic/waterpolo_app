import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Button, Typography, Box, CardMedia, Grid2 } from '@mui/material';
import axios from 'axios';

export const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const handleCheckout = async () => {
    try {
      // Prepare cart items to send to the back end
      const products = cart.map(item => ({
        id: item.product._id,
        quantity: item.quantity,
        size:  item.selectedSize,
      }));

          // Check the product object here
    console.log(products); // You can log the products array to the console to inspect it
    products.forEach(product => {
      if (!product.id || !product.quantity || !product.size) {
        throw new Error('Invalid product object');
      }
    });
    
    // Request Stripe Checkout Session creation from the back end
      const { data } = await axios.post('http://localhost:3000/create-checkout-session', { products });

      // Redirect to Stripe Checkout page
      window.location.href = `https://checkout.stripe.com/pay/${data._id}`;
    } catch (error) {
      console.error('Error creating Stripe checkout session', error);
    }
  };

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
          <Grid2
            container
            spacing={4}
            key={`${item.product._id}-${item.selectedSize}`}
            sx={{ borderBottom: '1px solid #ddd', paddingBottom: 2, marginBottom: 2 }}
          >
            <Grid2 item xs={4}>
              {/* Small Product Image */}
              <CardMedia
                component="img"
                height="100"
                image={item.product.image}
                alt={item.product.name}
                sx={{
                  objectFit: 'contain',
                  width: '100%',
                  maxWidth: '150px'
                }}
              />
            </Grid2>
            <Grid2 item xs={8}>
              {/* Product Details */}
              <Typography variant="h6">{item.product.name}</Typography>
              <Typography variant="body1">{item.product.description}</Typography>
              {item.product.selectedSize && (
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Size: {item.product.selectedSize}
                </Typography>
              )}
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Price: €{item.product.price / 100} {/* Adjusted for cents */}
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
        <Button
          variant="contained"
          color="primary"
          sx={{ fontSize: '14px', marginTop: 2 }}
          onClick={handleCheckout}
        >
          Checkout with Stripe
        </Button>
      )}
    </Box>
  );
};