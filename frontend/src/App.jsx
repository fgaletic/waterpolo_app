import { ProductList}  from './components/ProductList';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CartContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;