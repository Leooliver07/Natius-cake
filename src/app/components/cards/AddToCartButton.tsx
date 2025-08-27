"use client"
import { useState } from "react";
import {supabase} from "@/services/supabaseClient";


interface Product {
  id: number;
  name: string;
  price: number;
  cost: number;
}

export function AddCartButton ({product, onAddToCart}: {product: Product, onAddToCart: (product: Product) => void}){

  
  const [added, setAdded] = useState(false);

  function handleClick(){

    onAddToCart(product)
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
    }, 2000)


  }

  return(
    <button
      onClick={handleClick}
      disabled={added}
      className={`h-20 w-48 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-200
        ${added ? 'bg-green-400 hover:bg-green-500': 'bg-red-200 hover:bg-red-300'}`}
    >
      <p>{added ? 'Adicionado!' : `Bolo de ${product.name}`}</p>

    </button>
  )
}