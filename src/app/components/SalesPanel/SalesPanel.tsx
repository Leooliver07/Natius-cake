"use client"

import { useState } from "react"
import { Card } from "../cards/Card"
import { OrderCar } from "../order"

//Tipagem para item do carrinho
interface CartItem {
  id: string;
  name: string;
  price: number;
  cost: number;
  quantity: number;
  type?: string;
}

// Tipagem de produtos recebidos
interface Product {
  id: string;
  name: string;
  price: number;
  cost: number;
  type?: string;

}

export function SalesPanel({products}: {products: Product[]}){
  // Estado do carrinho onde podemos ter a manipulação dos valores antes de ir para o database
 


  return (
    <div className="mt-6 ">
      <Card products={products}  />
      
    </div>
  )
}