import Image from "next/image";
import { Container } from "./components/container";
import { SubMenu } from "./components/submenu";
import {supabase} from "@/services/supabaseClient"
import { Card } from "./components/cards/Card";
import { OrderCar } from "./components/order";
import { SalesPanel } from "./components/SalesPanel/SalesPanel";



export default async function Home() {
  let { data: products, error } = await supabase
    .from("products")
    .select("*");
  
  return (
    <div>
      <SubMenu />
      <div className="flex flex-col">
      
        <Container>
          <SalesPanel products={products || []}/>
        </Container>
      </div>
      
    
   
     </div> 
  );
}
