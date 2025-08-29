"use client"
import {FaShoppingCart} from 'react-icons/fa'
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import logoimg from "@/app/assets/natiuslogo.png"
import Link from 'next/link';

export function Header(){

   const {toggleCart} = useCart()
    
  
  return(
    <main className="mx-auto flex items-center justify-center w-full">
      <header className="w-full h-18 flex justify-between px-2 py-4 bg-red-500">
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
        <button onClick={toggleCart} className='relative cursor-pointer mr-4' title="Shopping Cart">
          <FaShoppingCart size={28}/>
          
        </button> 
        
      </header>

    </main>
      
  )
}