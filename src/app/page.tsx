import Image from "next/image";
import { Container } from "./components/container";
import {supabase} from "@/services/supabaseClient"
import { SalesPanel } from "./components/SalesPanel/SalesPanel";



export default async function Home() {
  let { data: products, error } = await supabase
    .from("products")
    .select("*");
  
  return (
    <div>
      
      <div className="flex flex-col">
      
        <Container>
          <SalesPanel products={products || []}/>
        </Container>
      </div>
      
    
   
     </div> 
  );
}
