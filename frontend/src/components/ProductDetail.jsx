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
        const response = await axios.get(`/api/products/${id}`);
        if (Array.isArray(response.data)) {
          setProduct(response.data);
        } else {
          throw new Error('Invalid API response format');
        }
        setProduct(response.data);
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
            price: 29.99,
            sizes: ['S', 'M', 'L', 'XL',  'XXL',  'XXXL'],
          },
          {
            _id: '2',
            name: 'Swimsuit 2',
            image: '/assets/speedo.png',
            description: 'Description for Swimsuit 2',
            price: 49.99,
            sizes: ['S', 'M', 'L', 'XL',  'XXL',  'XXXL'],
          },
          {
            _id: '3',
            name: 'Cap',
            image: '/assets/banador.png',
            description: 'Description for Cap',
            price: 19.99,
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
    addToCart({ ...product, selectedSize }, 1); // Pass selected size along with product
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <Container>
      {/* Back to Products Button */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="contained" sx={{ fontSize: '12px', padding: '5px 10px' }}>
          Back to Products
        </Button>
      </Link>

      {/* Error Message */}
      {error && (
        <Typography variant="body1" sx={{ padding: '10px 0px' }} color="error" gutterBottom>
          {error}
        </Typography>
      )}

      {/* Product Card */}
      <Card sx={{ marginTop: 1, width: '50vh', marginLeft:"auto", marginRight:"auto" }}>
        {/* Product Image */}
        <CardMedia
          component="img"
          height="300"
          image={product.image}
          alt={product.name}
          sx={{ objectFit: 'contain' }}
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
            €{product.price}
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