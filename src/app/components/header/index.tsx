import { headers } from "next/headers";
import {FaShoppingCart} from 'react-icons/fa'
import { OrderCar } from "../order";

export function Header(){

  function toggleOrderCar(){
    
  }
  return(
    <main className="mx-auto flex items-center justify-center">
      <header className="w-full h-14 flex justify-between px-2 py-4 bg-gray-200 rounded">
        <div>
          <h1>NatiusCake</h1>
        </div>
     
        <FaShoppingCart size={28} className="mr-2"/>
        
      </header>

    </main>
      
  )
}