'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartService } from '@/services/cartService';
import { productService } from '@/services/productService';  
import { useAuth } from '@/services/auth-context'; 

interface CartItem {
  id: number;  
  ProductId?: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  CartId?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductDetails {
  price: number;
  image: string;
}

interface CartItemWithProduct extends CartItem, ProductDetails {
  id: number;  
}

interface CartContextType {
  cartItems: CartItemWithProduct[]; 
  addToCart: (product: CartItemWithProduct) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]); 
  const { isLoggedIn, userId } = useAuth();  

  useEffect(() => {
    if (isLoggedIn && userId !== null) {
      const fetchCart = async () => {
        try {
          const data = await cartService.getCart(userId);
          console.log('Fetched cart data:', data);

          const productDetailsPromises = data.CartItems.map(async (cartItem: CartItem) => { 
            const productData = await productService.getProductById(cartItem.ProductId);
            return {
              ...cartItem,
              ...productData, 
              id: cartItem.ProductId,  
              price: Number(productData.price),  
            };
          });

          const updatedCartItems = await Promise.all(productDetailsPromises);
          console.log('Updated Cart Items:', updatedCartItems);
          setCartItems(updatedCartItems);  

        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      };

      fetchCart();
    }
  }, [isLoggedIn, userId]);

  const addToCart = async (product: CartItemWithProduct) => {
    if (userId === null) {
      console.log('User not logged in');
      return;
    }
    try {
      await cartService.updateCart(userId, product.id, product.quantity || 1);
      const updatedCart = await cartService.getCart(userId);
      setCartItems(updatedCart.CartItems || []);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId: number) => {
    if (userId === null) {
      console.log('User not logged in');
      return;
    }
    try {
      await cartService.removeFromCart(userId, productId);
      const updatedCart = await cartService.getCart(userId);
      setCartItems(updatedCart.CartItems || []);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (userId === null) {
      console.log('User not logged in');
      return;
    }
    try {
      await cartService.updateCart(userId, productId, quantity);
      const updatedCart = await cartService.getCart(userId);
      setCartItems(updatedCart.CartItems || []);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    if (userId === null) {
      console.log('User not logged in');
      return;
    }
    try {
      await cartService.clearCart(userId);
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
