"use client"
import { useState } from "react";
import {supabase} from "@/services/supabaseClient";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  name: string;
  price: number;
  cost: number;
  type?: string;
}

export function AddCartButton ({product}: {product: Product}){

  const {addToCart} = useCart();
  const [added, setAdded] = useState(false);

  function handleClick(){

    addToCart(product);
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
    }, 1500)


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