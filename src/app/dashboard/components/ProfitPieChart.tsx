"use client"

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer  } from "recharts"

interface PieChartData {
  name: string
  value: number
}

//Cores das partes do grafico
const COLORS = ['#82ca9d', '#8884d8']
const COLORS_INT = ["#35a608", '#c90404']
export function ProfitPieChart ({ data, salesData }: { data: PieChartData[]; salesData: PieChartData[]}) {
  
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={salesData}
          
          
          label={salesData[0]}
          labelLine={false}
          outerRadius={100}
          innerRadius={85}
          fill="#8884d8"
          dataKey="value"
          nameKey="name" 
          paddingAngle={5}
       >

          </Pie>
          <Pie 
          data={data}
          dataKey="value"
          nameKey="name"
          labelLine={false}
          outerRadius={80}
          innerRadius={0}
          fill="#82ca9d"
          label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS_INT[index % COLORS_INT.length]} />
          ))}
          </Pie>
        <Tooltip formatter={(value: number)=>`R$${value.toFixed(2)}`} />
        <Legend />

      </PieChart>

    </ResponsiveContainer>
    

);

}