import { Container } from "../components/container";
import { Dashboard } from "./components/Dashboard";
import { supabase } from "@/services/supabaseClient";
import { DateRangeFilter } from "./components/DateRangeFilter";
import { ProfitPieChart } from "./components/ProfitPieChart";

export default async function DashboardPage({
  searchParams,
}:{
  searchParams:{ [key: string]: string | string[] | undefined}
}) {

  

  const rangeInDays = Number(searchParams.range || '7')

  const fromDate = new Date();
  if (rangeInDays === 1){
    fromDate.setHours(0, 0, 0, 0)
  } else {
    fromDate.setDate(fromDate.getDate() - rangeInDays);
  }
  const isoDateString = fromDate.toISOString();


  
  const {data: orders, error} = await supabase
    .from('orders')
    .select('created_at, total_amount, total_cost')
    .gte('created_at', isoDateString)
    .order('created_at', {ascending: true})
  
  if(error){
    console.log(error)
    return <div>Ocorreu um erro ao buscar os dados</div>
  }


  const aggregatedData = orders.reduce((acc, order) => {

      const date = new Date(order.created_at).toISOString().split('T')[0];
      if(!acc[date]){
        acc[date] = {
          date, vendas: 0, lucro: 0, gastos: 0
        }}
        acc[date].vendas += order.total_amount;
        acc[date].lucro += order.total_amount - order.total_cost;
        acc[date].gastos += order.total_cost;
      return acc;
      }, {} as Record<string, {date: string, lucro: number, gastos: number, vendas: number}>
    );

    const totalSales = orders.reduce((sum, order) => sum + order.total_amount, 0);
    const totalProfit = orders.reduce((sum, order) => sum + order.total_amount - order.total_cost, 0);
    const totalCost = orders.reduce((sum, order) => sum + order.total_cost, 0);

    const salesData = [ 
      {name: 'Vendas', value: totalSales},
    ]

    const pieChartData = [
     
      {name: 'Lucro', value: totalProfit},
      {name: 'Gastos', value: totalCost},
    ]


    const chartData = Object.values(aggregatedData);



  return(
    <Container>
      
      <DateRangeFilter />

      <ProfitPieChart data={pieChartData} salesData={salesData}/>

      {/* <Dashboard data={chartData}/>
      */}
      
    
    </Container>
    
  )
}