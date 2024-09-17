import { AppBar, Toolbar, IconButton, Badge, Button, Box } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import logo from '/assets/logo_pg.png';

const Header = ({ cartItemCount }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Shop logo */}
        <Box component={Link} to="/" sx={{ flexGrow: 1 }}>
          <img src={logo} alt="pg.waterpolo shop logo" style={{ height: 40 }} />
        </Box>

        {/* Navigation Links */}
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/products">
          Products
        </Button>
        <Button color="inherit" href="https://www.panteresgrogues.org/es/waterpolo-es/" target="_blank" rel="noopener noreferrer">
          About Us
        </Button>

        {/* Cart Icon with badge showing the number of items */}
        <IconButton color="inherit" component={Link} to="/cart">
          <Badge badgeContent={cartItemCount} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;