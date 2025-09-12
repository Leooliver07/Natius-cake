"use client";

import { useState } from "react"
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { ModalUpdate } from "./modalUpdate";
import { deleteProductAction } from "@/app/actions";
import toast from "react-hot-toast";


type Product = {
  id: string;
  name: string;
  price: number;
  cost: number;
  type: string;
  
}
interface ProductTableProps{
  products: Product[];
  onRefresh: () => void;
}




export function ProductTable({products, onRefresh}: ProductTableProps){
  const formatNumbers = (data:  number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(data);
  }
  
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)



  const handleDelete = async (idProduct: string) => {
    const result = await deleteProductAction(idProduct)

    if(result.success){
     toast.success(result.message)
      onRefresh()
    }else{
      toast.error(result.message)
      
    }
  }
  

  return(
    <div  className="relative flex flex-col w-full h-full overflow-hidden bg-white shadow-md rounded-lg bg-clip-border">
       <table className="table-auto w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left text-gray-700">Produto</th>
            <th>Preço</th>
            <th>Custo</th>
            <th>Opções</th>
          </tr>


        </thead>
        <tbody>
           {products?.map((product) => (
              <tr className="border border-gray-300"
                key={product.id}
              >
                <td className="border border-gray-200 p-4 text-left">{product.name}</td>
                <td className="border border-gray-300 p-4 text-left">{formatNumbers(product.price)}</td>
                <td className="border border-gray-300 p-4 text-left">{formatNumbers(product.cost)}</td>
                <td className="border border-gray-300 p-4 text-left">
                  <div className="flex gap-2">
                    <button 
                      title="Editar"
                      
                      onClick={() => {
                        setIsModalOpen(true)
                        setSelectedProduct(product)
                      }}
                      >
                        <FaEdit size={22} className="cursor-pointer"/>
                    </button>
                    <button
                      title="Excluir"
                      onClick={() => {
                        setSelectedProduct(product)
                        
                        handleDelete(product.id as string)
                      }}
                     >
                      <FaTrashAlt size={22} color="#cf1515" className="cursor-pointer"/>
                      </button>
                  </div>
                </td>
              </tr>

))}
         

        </tbody>
         
       </table>

      {/* The ModalUpdate component is rendered here */}
    <div>
      <ModalUpdate 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onRefresh={onRefresh}
        
      /> 

      </div>
    </div>
  )
}