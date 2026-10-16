import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import Header from './Header';
import Button from './components/Button';
import './Checkout.css';

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Address must be at least 10 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    clearCart();
    setOrderPlaced(true);
    setIsSubmitting(false);
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="checkout">
        <Header />
        <div className="checkout-empty">
          <h1>Your cart is empty</h1>
          <Button onClick={() => navigate('/')} className="continue-shopping-button">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="checkout">
        <Header />
        <div className="order-confirmation">
          <h1 className="confirmation-title">Order Placed Successfully!</h1>
          <p className="confirmation-message">
            Thank you for your purchase, {formData.name}!
          </p>
          <p className="confirmation-details">
            Your order will be shipped to: {formData.address}
          </p>
          <Button onClick={() => navigate('/')} className="continue-shopping-button">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <Header />
      <div className="checkout-container">
        <div className="checkout-form-section">
          <h1 className="checkout-title">Checkout</h1>
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'form-input error' : 'form-input'}
                placeholder="Enter your full name"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="address">Shipping Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? 'form-input error' : 'form-input'}
                placeholder="Enter your shipping address"
                rows="4"
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'form-input error' : 'form-input'}
                placeholder="Enter your phone number"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <Button
              type="submit"
              size="large"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : `Place Order - $${cartTotal.toFixed(2)}`}
            </Button>
          </form>
        </div>

        <div className="checkout-summary">
          <h2 className="summary-title">Order Summary</h2>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="summary-item-image"
                />
                <div className="summary-item-details">
                  <p className="summary-item-title">{item.title}</p>
                  <p className="summary-item-quantity">Qty: {item.quantity}</p>
                </div>
                <p className="summary-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total:</span>
            <span className="summary-total-amount">${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
