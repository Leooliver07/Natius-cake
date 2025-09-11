import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { supabase } from "@/services/supabaseClient";


type Product = {
  id: number;
  name: string;
  price: number;
  cost: number;
  
}
interface ProductTableProps{
  products: Product[];
}






export function ProductTable({products}: ProductTableProps){
  const formatNumbers = (data:  number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(data);
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
                    <button title="Editar"><FaEdit size={22} className="cursor-pointer"/></button>
                    <button title="Excluir"><FaTrashAlt size={22} color="#cf1515" className="cursor-pointer"/></button>
                  </div>
                </td>
              </tr>

))}
         

        </tbody>
         
       </table>


    <div>
      
      </div>
    </div>
  )
}