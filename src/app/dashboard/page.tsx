import { Container } from "../components/container";
import { ItemsSoldChart } from "./components/ItemsSoldChart";
import { supabase } from "@/services/supabaseClient";
import { DateRangeFilter } from "./components/DateRangeFilter";
import { ProfitPieChart } from "./components/ProfitPieChart";

// type DashboardProps = {

//   searchParams: {[key: string]: string | string[] | undefined};
// }
type ItemsSold = {
  product: string;
  quantity: number;
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchP = await searchParams;

  const rangeInDays = Number(searchP.range || "7");

  const fromDate = new Date();
  if (rangeInDays === 1) {
    fromDate.setHours(0, 0, 0, 0);
  } else {
    fromDate.setDate(fromDate.getDate() - rangeInDays);
  }
  const isoDateString = fromDate.toISOString();

  //Funcao que le os dados da tabela orders para pegar valores de vendas e mostrar no grafico
  
  const { data: orders, error } = await supabase
    .from("orders")
    .select("created_at, total_amount, total_cost, id")
    .gte("created_at", isoDateString)
    .order("created_at", { ascending: true });

  if (error) {
    console.log(error);
    return <div>Ocorreu um erro ao buscar os dados</div>;
  }

  const totalSales = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const totalProfit = orders.reduce(
    (sum, order) => sum + order.total_amount - order.total_cost,
    0
  );
  const totalCost = orders.reduce((sum, order) => sum + order.total_cost, 0);

  const salesData = [{ name: "Vendas", value: totalSales }];

  const pieChartData = [
    { name: "Lucro", value: totalProfit },
    { name: "Gastos", value: totalCost },
  ];


  //Funcao que pega os dados ta tabela order_items para o grafico de items mais vendidos
  
  const orderIds = orders?.map(order => order.id);
  let itemsSoldData: ItemsSold[] = [];


  if(orderIds.length > 0){  
  const {data: order_items, error: orderItemsError} = await supabase
  .from("order_items")
  .select("product_name, quantity")
  .in("order_id", orderIds);
  


  if(orderItemsError){
    console.log(orderItemsError)
    return <div>Ocorreu um erro ao buscar os dados</div>
  }
  
  const salesAggregtion = order_items.reduce((acc, item) => {
    const productName = item.product_name;
    if(!acc[productName]){
      acc[productName] = 0;
    }
    acc[productName] += item.quantity;
    return acc;
    
  }, {} as Record<string, number>);

  
  
  const formattedData = Object.entries(salesAggregtion).map(([productName, quantity]) => ({
    product: productName,
    quantity: quantity,
  }));

  itemsSoldData = formattedData
  .sort((a, b) => b.quantity - a.quantity)
  .slice(0, 8);
}



//Console para testes
console.log("Pedidos encontrados no periodo:", orders.length)
console.log("Items vendidos", itemsSoldData)
console.log ("ids dos pedidos", orderIds)

  return (
    <Container>
      <div className="w-full">
       <DateRangeFilter />

      <ProfitPieChart data={pieChartData} salesData={salesData} />

      <ItemsSoldChart data={itemsSoldData}/>

      </div>
     
    </Container>
  );
}
