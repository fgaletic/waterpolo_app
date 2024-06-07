import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import banador from '../../assets/banador.png';

const ProductPage = () => {
    // Mock product data to remove later
    const product = {
        name: 'Product 1',
        description: 'This is some text about product 1.',
        price: '€29.99',
        stock: 100,
        image: banador
    };

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100vh', boxSizing: 'border-box', overflow: 'auto' }}> 
            <Link to="/" style={{ textDecoration: 'none', marginBottom: '20px' }}>Go back to home</Link>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '2px', flex: 1 }}>
                <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    style={{ width: '50%', height: '70%', objectFit: 'contain' }}
                />
                <Card style={{ flex: 1, height: '25%' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Price: {product.price}
                        </Typography>
                        <Button variant="contained">Add to Cart</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default ProductPage;