"use client"

import { useState } from "react"
import { Card } from "../cards/Card"
import { OrderCar } from "../order"

//Tipagem para item do carrinho
interface CartItem {
  id: number;
  name: string;
  price: number;
  cost: number;
  quantity: number;
}

// Tipagem de produtos recebidos
interface Product {
  id: number;
  name: string;
  price: number;
  cost: number;

}

export function SalesPanel({products}: {products: Product[]}){
  // Estado do carrinho onde podemos ter a manipulação dos valores antes de ir para o database
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const handleAddToCart = (product: Product) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
  };


  return (
    <div>
      <Card products={products} onAddToCart={handleAddToCart} />
      
    </div>
  )
}