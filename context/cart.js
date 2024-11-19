"use client";

import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const getLocalStorage = () => {
  if (typeof window !== "undefined") {
    let cartItems = localStorage.getItem("cartItems");

    if (cartItems) {
      return JSON.parse(localStorage.getItem("cartItems"));
    }
  } else {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getLocalStorage());

  const addToCart = (item) => {
    // Check if the item is already in the cart
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.name === item.name,
    );

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    // Check if the item is already in the cart
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.name === item.name,
    );

    // If the quantity is equal to 1, the remove the item from the cart
    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.name !== item.name));
    } else {
      // If the quantity is greater than 1, then subtract 1
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        ),
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  // Persist state in localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");

    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
