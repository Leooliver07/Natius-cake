"use client"
import {FaShoppingCart} from 'react-icons/fa'
import { useCart } from "@/context/CartContext";

export function Header(){

   const {toggleCart} = useCart()
    
  
  return(
    <main className="mx-auto flex items-center justify-center">
      <header className="w-full h-14 flex justify-between px-2 py-4 bg-gray-200 rounded">
        <div>
          <h1>NatiusCake</h1>
        </div>
        <button onClick={toggleCart} className='relative cursor-pointer' title="Shopping Cart">
          <FaShoppingCart size={28}/>
          
        </button> 
        
      </header>

    </main>
      
  )
}