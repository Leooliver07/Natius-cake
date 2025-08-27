"use client"

import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem{
  id: string;
  name: string;
  price: number;
  cost: number;
  quantity: number;

}

interface CartContextType{
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  isCartOpen: boolean;
  toggleCart: () => void;


}

const CartContext = createContext<CartContextType>(null!);

export function useCart(){
  return useContext(CartContext);

}

export function CartProvider({children}: {children: ReactNode}){
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    console.log("Adicionando produto: ",product);
    setCartItems((prevItems) => {

    const existingItem = prevItems.find((item) => item.id === product.id);

    if(existingItem){
      return prevItems.map((item) =>
        item.id === product.id ? {...item, quantity: item.quantity + 1} : item
    );
  } else {
    return [...prevItems, {...product, quantity: 1}];
  }
    });

  }
  const value = {
    cartItems,
    addToCart,
    isCartOpen,
    toggleCart,
    };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
  }

