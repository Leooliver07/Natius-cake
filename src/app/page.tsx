import Image from "next/image";
import { Container } from "./components/container";
import { SubMenu } from "./components/submenu";
import {createClient} from '@supabase/supabase-js';
import { Card } from "./components/cards";
import { OrderCar } from "./components/order";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default async function Home() {
  let {data: cakes, error} = await supabase.from('cakes').select('*');
  console.log(cakes);
  return (
    <div>
      <SubMenu />
      <div className="flex flex-col">
      
        <Container>
          <Card/>
     
        </Container>
      </div>
      
    
   
     </div> 
  );
}
