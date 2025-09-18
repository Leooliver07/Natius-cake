import { supabase } from "@/services/supabaseClient"
import { PaymentChart } from "./PaymentChart"

interface AggregatedPaymentData {
  payment_method: string;
  total_amount: number;
}

export default async function FinancePage(){
  
const { data: orders, error } = await supabase
    .from("orders")
    .select("total_amount, id, payment_method")
    

  if (error) {
    console.log(error);
    return <div>Ocorreu um erro ao buscar os dados</div>;
  }
  
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

  console.log("Dados finais para o gráfico:", chartData);
  

  return(
    <div className="flex items-center justify-center h-screen mx-auto max-w-lg">
      <PaymentChart data={chartData} />
    </div>
  )
}