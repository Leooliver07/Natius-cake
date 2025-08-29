"use client"
// import supabase from '@/services/supabaseClient'
import { useState } from "react"
import { ModalRegister } from "@/app/register/modalRegister"

export default function Register(){

  const [isModalOpen, setIsModalOpen] = useState(false)

  return(
    
      <main className="mt-6 w-md px-5 mx-auto h-screen flex flex-col sm:w-xl md:w-3xl lg:w-5xl">
        
          <div className="flex items-center justify-center mb-6">
            <h1 className="font-bold text-xl">Gerenciamento de produtos</h1>
          </div>
          <div className="w-full flex items-end justify-end mx-auto">
            <button
              name="register"
              className="bg-blue-600 text-white font-bold rounded p-2 inline-block align-middle cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
               Novo Produto
            </button>

            
          </div>
          <div>
            <ModalRegister isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            /> 

          </div>
         
        
      </main> 
  )
  
}