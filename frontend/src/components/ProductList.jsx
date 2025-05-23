import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Grid2, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products'); /*TODO*/
        
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          throw new Error('Invalid API response format');
        }
      } catch (error) {
        console.error("Error fetching products, using mock data:", error);
        setError("Failed to load products. Using mock data.");

        // Fallback mock data
        const mockProducts = [
          {
            _id: '1',
            name: 'Swimsuit 1',
            image: '/assets/banador.png',  // Product 1 image
            description: 'Description for Swimsuit 1',
            price: 2999
          },
          {
            _id: '2',
            name: 'Swimsuit 2',
            image: '/assets/speedo.png',   // Product 2 image
            description: 'Description for Swimsuit 2',
            price: 4999
          },
          {
            _id: '3',
            name: 'Cap',
            image: '/assets/banador.png',  // Reuse banador for Cap
            description: 'Description for Cap',
            price: 1999
          },
        ];

        setProducts(mockProducts);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to our Shop
      </Typography>

      {error && (
        <Typography variant="body1" color="error" gutterBottom>
          {error}
        </Typography>
      )}

<Grid2 container spacing={4}>
        {Array.isArray(products) && products.length > 0 ? (
          products.map(product => (
            <Grid2 item key={product._id} xs={12} sm={6} md={4} sx={{
              '@media (max-width: 600px)': {
                width: '100%',
              },
            }}>
              <Card>
                {/* Product Image */}
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    m: 0, mt: 2,
                    objectFit: 'cover', /* optional: scale the image to fit the container */
                  }}
                />
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h6">
                    €{(product.price / 100).toFixed(2)}
                  </Typography>
                  <Button component={Link} to={`/products/${product._id}`} variant="contained" color="primary">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid2>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No products available
          </Typography>
        )}
      </Grid2>
    </Container>
  );
};

export default ProductList;