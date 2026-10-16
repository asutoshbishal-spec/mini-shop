import React from 'react';
import './Button.css';

function Button({ children, variant = 'primary', size = 'medium', disabled, onClick, type = 'button', className = '' }) {
  const buttonClass = `button button-${variant} button-${size} ${className} ${disabled ? 'button-disabled' : ''}`;

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
