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
 


  return (
    <div>
      <Card products={products}  />
      
    </div>
  )
}