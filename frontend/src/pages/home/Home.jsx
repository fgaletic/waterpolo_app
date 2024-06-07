import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>This is some text on the home page.</p>
            <p><a href="/product1">Product 1</a></p>
            <p><a href="/product2">Product 2</a></p>
            <Link to="/cart" style={{ position: 'absolute', top: '10px', right: '10px' }}>Shopping Cart</Link>
        </div>
    );
}

export default Home;