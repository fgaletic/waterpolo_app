import { Link, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/system';
import banador from '../assets/banador.png';

const StyledLink = styled(Link)({
    textDecoration: 'none',
    marginBottom: '20px',
    display: 'inline-block'
});

const ProductCard = () => {
    const product = {
        name: 'Product 1',
        description: 'This is some text about product 1.',
        price: '€29.99',
        stock: 100,
        image: banador
    }; {/* Later remove these */}

    return (
        <div>
            <StyledLink to="/">Go back to home</StyledLink>
            <Card>
                <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.name}
                />
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
                    <Typography variant="body2" color="text.secondary">
                        Stock left: {product.stock}
                    </Typography>
                    <Button variant="contained">Add to Cart</Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default ProductCard;
