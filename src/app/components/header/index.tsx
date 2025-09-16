"use client"
import {FaShoppingCart} from 'react-icons/fa'
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import logoimg from "@/app/assets/natiuslogo.png"
import Link from 'next/link';
import { useUI } from '@/context/UIContext';

export function Header(){

   const {toggleCart, cartItems} = useCart()
   const {toggleSidebar} = useUI()
  
  return(
    <main className="mx-auto flex items-center justify-center w-full">
      <header className="w-full h-18 flex justify-between px-2 py-4 bg-red-500">
        <div>
          <button title="Menu" onClick={toggleSidebar} className=" bg-black text-white p-2 rounded-md hover:bg-gray-100 hover:text-black cursor-pointer">
            Menu
        </button>
        </div>
        <div className='flex items-center justify-center mt-2'>
          <Link href="/">
            <Image
            alt='logo'
            src={logoimg}
            height={100}
            width={100}
            quality={100}
          />
          
          </Link>
          
        </div>
        <button onClick={toggleCart} className='relative cursor-pointer mr-12' title="Shopping Cart">
          <FaShoppingCart size={28}/>
          {cartItems.length > 0 && (
            <div className='bg-white rounded-2xl fixed top-2 right-9 w-6 h-6 flex items-center justify-center text-xs font-bold'>
            <span
              className='font-medium '
            >
              {cartItems.length}
            </span>
          </div>
          )}
          
        </button> 
        
      </header>

    </main>
      
  )
}