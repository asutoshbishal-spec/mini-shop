import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import Header from './Header';
import Button from './components/Button';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Product not found');
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loading">Loading product...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="product-detail">
      <Header />
      <Button onClick={() => navigate(-1)} variant="secondary" className="back-button">
        ← Back
      </Button>
      <div className="product-detail-content">
        <img 
          src={product.image} 
          alt={product.title} 
          className="product-detail-image"
        />
        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.title}</h1>
          <p className="product-detail-category">
            Category: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </p>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          <p className="product-detail-description">{product.description}</p>
          <div className="product-detail-rating">
            <span>Rating: {product.rating.rate} ★</span>
            <span>({product.rating.count} reviews)</span>
          </div>
          <Button
            onClick={() => addToCart(product)}
            size="large"
            className="add-to-cart-button"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
