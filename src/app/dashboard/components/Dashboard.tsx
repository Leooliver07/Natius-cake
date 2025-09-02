"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,PieChart, Pie, Cell } from "recharts"

interface ChartData {
  date: string;
  vendas: number;
  lucro: number;
  gastos: number;
}


export function Dashboard({data}: {data: ChartData[]}){
  const formattedData = data.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('pt-BR',{day: '2-digit', month: '2-digit'}),
  }))

  return(

    <ResponsiveContainer width="70%" height={400} className="mt-10">
      <BarChart data={formattedData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(value:number)=> `R$ ${value.toFixed(2)}`} />
        <Legend />
        <Bar dataKey="lucro" fill="#8884d8" />
        <Bar dataKey="gastos" fill="#82ca9d" />

      </BarChart>

    </ResponsiveContainer>

  )
}