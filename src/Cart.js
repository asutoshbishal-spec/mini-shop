import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import Header from './Header';
import Button from './components/Button';
import './Cart.css';

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <Header />
        <h1 className="cart-title">Shopping Cart</h1>
        <p className="cart-empty">Your cart is empty</p>
        <Link to="/" className="cart-link">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <Header />
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img 
              src={item.image} 
              alt={item.title} 
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <Link to={`/products/${item.id}`} className="cart-item-title">
                {item.title}
              </Link>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
              <div className="cart-item-quantity">
                <Button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  variant="secondary"
                  size="small"
                  className="quantity-button"
                >
                  -
                </Button>
                <span className="quantity-value">{item.quantity}</span>
                <Button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  variant="secondary"
                  size="small"
                  className="quantity-button"
                >
                  +
                </Button>
              </div>
              <p className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <Button
                onClick={() => removeFromCart(item.id)}
                variant="danger"
                size="small"
                className="remove-button"
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="cart-total">
          <span>Total:</span>
          <span className="cart-total-amount">${cartTotal.toFixed(2)}</span>
        </div>
        <Link to="/checkout" className="checkout-button">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default Cart;
