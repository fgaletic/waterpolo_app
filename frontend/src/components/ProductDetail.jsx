import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { Container, Typography, Button, Card, CardContent, CardMedia, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(''); 
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(response.data); //TODO fix the assets thingy
      } catch (error) {
        console.error("Error fetching product, using mock data:", error);
        setError("Failed to load product details. Using mock data.");

        // Fallback mock data
        const mockProducts = [
          {
            _id: '1',
            name: 'Swimsuit 1',
            image: '/assets/banador.png',
            description: 'Description for Swimsuit 1',
            price: 2999,
            sizes: ['S', 'M', 'L', 'XL',  'XXL',  'XXXL'],
          },
          {
            _id: '2',
            name: 'Swimsuit 2',
            image: '/assets/speedo.png',
            description: 'Description for Swimsuit 2',
            price: 4999,
            sizes: ['S', 'M', 'L', 'XL',  'XXL',  'XXXL'],
          },
          {
            _id: '3',
            name: 'Cap',
            image: '/assets/banador.png',
            description: 'Description for Cap',
            price: 1999,
            sizes: ['S', 'M', 'L', 'XL',  'XXL',  'XXXL'],
          },
        ];

      // Find the mock product by id
      const mockProduct = mockProducts.find(p => p._id === id);
      if (mockProduct) {
        setProduct(mockProduct);
      } else {
        setError('Product not found in mock data');
      }
    }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size before adding to the cart');
      return;
    }
    const productToAdd = { ...product, quantity: 1, size: selectedSize, image: product.image }; // TODO: Review productToAdd object and consider removing sizes property, as it might not be needed when adding the product to the cart.
    console.log('Product to add:', productToAdd); // TODO remove this
    addToCart(productToAdd);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <Container>
      {/* Back to Products Button */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          sx={{ fontSize: "12px", padding: "5px 10px" }}
        >
          Back to Products
        </Button>
      </Link>

      {/* Error Message */}
      {error && (
        <Typography
          variant="body1"
          sx={{ padding: "10px 0px" }}
          color="error"
          gutterBottom
        >
          {error}
        </Typography>
      )}

      {/* Product Card */}
      <Card
        sx={{
          mt: 1,
          ml: "auto",
          mr: "auto",
          width: "35%",
          "@media (max-width: 600px)": {
            width: "100%",
          },
        }}
      >
        {/* Product Image */}
        <CardMedia
          component="img"
          height="300"
          image={product.image}
          alt={product.name}
          sx={{ objectFit: "contain" }}
        />

        {/* Product Details */}
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Typography variant="h5" color="primary">
            €{(product.price / 100).toFixed(2)}
          </Typography>

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <InputLabel id="size-label">Size</InputLabel>
              <Select
                labelId="size-label"
                value={selectedSize}
                onChange={handleSizeChange}
                label="Size"
              >
                {product.sizes.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Add to Cart Button */}
          <Button onClick={handleAddToCart} variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};