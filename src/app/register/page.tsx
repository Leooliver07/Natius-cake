"use client"
// import supabase from '@/services/supabaseClient'
import { useState, useEffect } from "react"
import { ModalRegister } from "@/app/register/modalRegister"
import { ProductTable } from "./ProductTable"
import { supabase } from "@/services/supabaseClient";


type Product = {
  id: number;
  name: string;
  price: number;
  cost: number;
};

export default function Register(){

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts(){
      const {data, error} = await supabase
      .from("products")
      .select("*")
      
      if(data){
        setProducts(data)
      }
      if(error){
        console.log(error)
    }

  }
  fetchProducts()
  },[])

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
          <div className="items-center justify-center mx-auto mt-10">
            <ProductTable  products={products}/>
          </div>
         
        
      </main> 
  )
  
}