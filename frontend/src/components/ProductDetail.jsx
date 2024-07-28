import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
// import banador from '../assets/banador.png';
import { Container, Typography, Button } from '@mui/material';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useContext(CartContext);
  
    useEffect(() => {
      const fetchProduct = async () => {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      };
      fetchProduct();
    }, [id]);
  
    const handleAddToCart = () => {
      addToCart(product, 1);
    };
  
    if (!product) return <div>Loading...</div>;
  
    return (
        <Container>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Typography variant="h5">
            ${product.price}
          </Typography>
          <Button onClick={handleAddToCart} variant="contained" color="primary">
            Add to Cart
          </Button>
        </Container>
      );
    };
    
    export default ProductDetail;