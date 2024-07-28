import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
// import banador from '../assets/banador.png';

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
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    );
  };
  
  export default ProductDetail;