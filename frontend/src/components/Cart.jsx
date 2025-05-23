import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Button, Typography, Box, CardMedia, Grid2 } from "@mui/material";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_jHYQewRzwvMvdRHwTBbM8si3');

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const handleCheckout = async () => {
    try {

      // Prepare cart items to send to the back end
      const products = cart.map((item) => ({
        id: item._id,
        quantity: item.quantity,
        size: item.size,
      }));

      // Request Stripe Checkout Session creation from the back end
      const { data } = await axios.post(
        "http://localhost:3000/stripe/create-checkout-session",
        { products }
      );

      // Redirect to Stripe Checkout page using the returned session ID
      window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;

      // Initialize Stripe.js
      const stripe = await stripePromise;

      // Redirect to Stripe Checkout page using the returned session ID
      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      // Handle errors if the redirect fails
      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error creating Stripe checkout session", error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {/* Back to Products Button */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          sx={{ fontSize: "12px", padding: "5px 10px", marginBottom: 2 }}
        >
          Back to Products
        </Button>
      </Link>

      {cart.length > 0 ? (
        cart.map((item) => (
          <Grid2
            container
            spacing={4}
            key={`${item._id}-${item.size}`} // Use item._id and item.size instead of item.product
            sx={{
              borderBottom: "1px solid #ddd",
              paddingBottom: 2,
              marginBottom: 2,
            }}
          >
            <Grid2 item xs={4}>
              {/* Directly access item.image */}
              <CardMedia
                component="img"
                height="100"
                image={item.image}
                alt={item.name}
                sx={{
                  objectFit: "contain",
                  width: "100%",
                  maxWidth: "150px",
                }}
              />
            </Grid2>
            <Grid2 item xs={8}>
              {/* Directly access item.name, item.description, etc. */}
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body1">{item.description}</Typography>
              {item.size && (
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Size: {item.size}
                </Typography>
              )}
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Price: €{item.price / 100}
              </Typography>
              <Typography variant="body2">Quantity: {item.quantity}</Typography>

              <Button
                variant="outlined"
                color="secondary"
                onClick={() => removeFromCart(item._id)}
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
          sx={{ fontSize: "14px", marginTop: 2 }}
          onClick={handleCheckout}
        >
          Checkout with Stripe
        </Button>
      )}
    </Box>
  );
};

export default Cart;