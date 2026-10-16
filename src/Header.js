import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import './Header.css';

function Header() {
  const { cartCount } = useCart();

  return (
    <header className="header">
      <Link to="/" className="header-title">
        <h1>Mini Shop</h1>
      </Link>
      <Link to="/cart" className="cart-link">
        Cart
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </Link>
    </header>
  );
}

export default Header;
