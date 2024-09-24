import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Header from './components/Header';
import Footer from './components/Footer';
import SuccessPage from  './components/SuccessPage';
import CancelPage from './components/CancelPage'
import { Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CartContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0e4b67',
    },
    secondary: {
      main: '#ffba00',
    },
  },
  typography: {
    fontFamily: "Roboto Condensed",
  },
});

function App() {
  // Assuming you have a way to track the cart item count
  const cartItemCount = 0; // Replace with actual cart state

  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        {/* Header Component */}
        <Header cartItemCount={cartItemCount} />

        {/* Main content */}
        <Box component="main" sx={{ minHeight: '80vh', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            {/* <Route path="/checkout" element={<Checkout />} /> */}
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/cancel" element={<CancelPage />} />
          </Routes>
        </Box>

        {/* Footer Component */}
        <Footer />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;