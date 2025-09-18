import { Container } from "../components/container";
import { ItemsSoldChart } from "./components/ItemsSoldChart";
import { supabase } from "@/services/supabaseClient";
import { DateRangeFilter } from "./components/DateRangeFilter";
import { ProfitPieChart } from "./components/ProfitPieChart";
import { PaymentChart } from "./components/PaymentChart";

interface AggregatedPaymentData {
  payment_method: string;
  total_amount: number;
}

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
    .select("created_at, total_amount, total_cost, id, payment_method")
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

//---------I moved here the logical of paymentMethod chart data: --------------
const allPaymentMethods = ['dinheiro', 'credito', 'debito', 'pix'];

  const initialData: Record<string, AggregatedPaymentData> = allPaymentMethods.reduce((acc, method) => {
    acc[method] = { payment_method: method, total_amount: 0 };
    return acc;
  }, {} as Record<string, AggregatedPaymentData>);

  const aggregatedData = orders.reduce<Record<string, AggregatedPaymentData>>((acc, order) => {
    const method = order.payment_method;
    if (acc[method]) {
      // Converta o valor para um número antes de somar
      acc[method].total_amount += Number(order.total_amount);
    }
    return acc;
  }, initialData);

  const chartData = Object.values(aggregatedData);

  return (
    <Container>
      <div className="w-full mx-auto">
       <div className="items-center justify-center mx-auto">
        <DateRangeFilter />
       </div>
       
        <div>
          <div className="flex items-center justify-between gap-2">
            <ProfitPieChart data={pieChartData} salesData={salesData} />
            <PaymentChart data={chartData} />
          </div>
          <div>
             <ItemsSoldChart data={itemsSoldData}/>
          </div>
         
        </div>
      

      

      </div>
     
    </Container>
  );
}
