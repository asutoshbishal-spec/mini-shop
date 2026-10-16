import React from 'react';
import './Card.css';

function Card({ children, className = '', onClick }) {
  const cardClass = `card ${className} ${onClick ? 'card-clickable' : ''}`;

  return (
    <div className={cardClass} onClick={onClick}>
      {children}
    </div>
  );
}

export default Card;
