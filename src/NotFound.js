import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found">
      <Header />
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Page not found</p>
      <Link to="/" className="not-found-link">Go to Home</Link>
    </div>
  );
}

export default NotFound;
