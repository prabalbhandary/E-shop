import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    const total = cart.reduce((acc, item) => {
      const price = parseFloat(item.price);
      if (!isNaN(price)) {
        return acc + price * item.amount;
      } else {
        return acc;
      }
    }, 0);
    setTotal(total);
  
    const amount = cart.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);
    setItemAmount(amount);
  }, [cart]);  

  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
      const newCart = cart.map(item =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      );
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = id => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseAmount = id => {
    const cartItem = cart.find(item => item.id === id);
    addToCart(cartItem, id);
  };

  const decreaseAmount = id => {
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
      const newCart = cart.map(item =>
        item.id === id ? { ...item, amount: item.amount - 1 } : item
      );
      setCart(newCart);
      if (cartItem.amount < 2) {
        removeFromCart(id);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
