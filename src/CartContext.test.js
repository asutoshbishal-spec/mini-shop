import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';

describe('CartContext', () => {
  const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

  test('should initialize with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cartItems).toEqual([]);
    expect(result.current.cartTotal).toBe(0);
    expect(result.current.cartCount).toBe(0);
  });

  test('should add product to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: 1, title: 'Test Product', price: 10 };

    act(() => {
      result.current.addToCart(product);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]).toEqual({ ...product, quantity: 1 });
    expect(result.current.cartTotal).toBe(10);
    expect(result.current.cartCount).toBe(1);
  });

  test('should increase quantity when adding same product', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: 1, title: 'Test Product', price: 10 };

    act(() => {
      result.current.addToCart(product);
      result.current.addToCart(product);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].quantity).toBe(2);
    expect(result.current.cartTotal).toBe(20);
    expect(result.current.cartCount).toBe(2);
  });

  test('should remove product from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: 1, title: 'Test Product', price: 10 };

    act(() => {
      result.current.addToCart(product);
      result.current.removeFromCart(1);
    });

    expect(result.current.cartItems).toHaveLength(0);
    expect(result.current.cartTotal).toBe(0);
    expect(result.current.cartCount).toBe(0);
  });

  test('should update quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: 1, title: 'Test Product', price: 10 };

    act(() => {
      result.current.addToCart(product);
      result.current.updateQuantity(1, 5);
    });

    expect(result.current.cartItems[0].quantity).toBe(5);
    expect(result.current.cartTotal).toBe(50);
    expect(result.current.cartCount).toBe(5);
  });

  test('should remove product when quantity is set to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = { id: 1, title: 'Test Product', price: 10 };

    act(() => {
      result.current.addToCart(product);
      result.current.updateQuantity(1, 0);
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  test('should clear cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product1 = { id: 1, title: 'Product 1', price: 10 };
    const product2 = { id: 2, title: 'Product 2', price: 20 };

    act(() => {
      result.current.addToCart(product1);
      result.current.addToCart(product2);
      result.current.clearCart();
    });

    expect(result.current.cartItems).toHaveLength(0);
    expect(result.current.cartTotal).toBe(0);
    expect(result.current.cartCount).toBe(0);
  });

  test('should calculate total correctly with multiple items', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product1 = { id: 1, title: 'Product 1', price: 10 };
    const product2 = { id: 2, title: 'Product 2', price: 20 };

    act(() => {
      result.current.addToCart(product1);
      result.current.addToCart(product2);
      result.current.addToCart(product1);
    });

    expect(result.current.cartTotal).toBe(40);
    expect(result.current.cartCount).toBe(3);
  });
});
