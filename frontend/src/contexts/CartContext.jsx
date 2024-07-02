

import React, { createContext, useState, useEffect } from "react";
import {
  fetchCart as fetchCartAPI,
  addToCart as addToCartAPI,
  updateCartItem as updateCartItemAPI,
  removeCartItem as removeCartItemAPI,
  clearCart as clearCartAPI
} from "../services/cartService"
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // cart state
  const [cart, setCart] = useState([]);
  // item amount state
  const [itemAmount, setItemAmount] = useState(0);
  // total price state
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);
    setTotal(total);
  });

  // update item amount
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  // add to cart
  const addToCart = async (product, id) => {
    const newItem = { ...product, amount: 1 };
    // check if the item is already in the cart
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 };
        } else return item;
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
    // Prepare the payload for the API request
    const payload = { productId: product.id };

    try {
      await addToCartAPI(payload);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  // remove from cart
  const removeFromCart = async (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);

    // // Prepare the payload for the API request
    // const payload = { productId: id };

    // try {
    //   await removeCartItemAPI(payload);
    // } catch (error) {
    //   console.error('Failed to remove to cart:', error);
    // }
  };

  // cleart cart
  const clearCart = async () => {
    setCart([]);

    try {
      await clearCartAPI();
    } catch (error) {
      console.error('Failed to remove all from cart:', error);
    }
  };

  // increase amount
  const increaseAmount = async (id) => {
    const cartItem = cart.find((item) => item.id === id);
    addToCart(cartItem, id);
    try {
      await addToCartAPI(payload);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  // decrease amount
  const decreaseAmount = async (id) => {
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    if (cartItem.amount < 2) {
      removeFromCart(id);
    }

    // Prepare the payload for the API request
    const payload = { productId: id };

    try {
      await removeCartItemAPI(payload);
    } catch (error) {
      console.error('Failed to remove to cart:', error);
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
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
