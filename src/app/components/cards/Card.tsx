import { AddCartButton } from "./AddToCartButton";
import { supabase } from "@/services/supabaseClient";

interface Product{
  id: string;
  name: string;
  price: number;
  cost: number;
}


export function Card( { products }: { products: Product[] }){
  // Fetch cakes data from Supabase
  
  return (
    <div className="flex  gap-4">
      {products.map(product => (
        <div className="flex gap-6" key={product.id}>
          {/* <div className="h-20 bg-red-200 w-48 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-red-300 transition-all duration-200"> */}
            {/* <p>Bolo de {cake.name}</p> */}
          <AddCartButton product={product} />
          </div>
        
      ))}
    </div>
  );
}