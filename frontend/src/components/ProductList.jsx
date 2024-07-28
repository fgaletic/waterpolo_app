import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

return (
<Container>
    <Typography variant="h3" component="h1" gutterBottom>
    Product List
    </Typography>
    <Grid container spacing={4}>
    {products.map(product => (
        <Grid item key={product._id} xs={12} sm={6} md={4}>
        <Card>
            <CardContent>
            <Typography variant="h5" component="h2">
                {product.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                {product.description}
            </Typography>
            <Typography variant="h6">
                ${product.price}
            </Typography>
            <Button component={Link} to={`/product/${product._id}`} variant="contained" color="primary">
                View Details
            </Button>
            </CardContent>
        </Card>
        </Grid>
    ))}
    </Grid>
</Container>
);
};

export default ProductList;
