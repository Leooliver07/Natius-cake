"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,PieChart, Pie, Cell } from "recharts"

interface ChartData {
  
  product: string;
  quantity: number;
}


export function ItemsSoldChart({data}: {data: ChartData[]}){
  

  return(

    <div className="w-full max-w-4xl p-4 bg-white shadow rounded-lg mt-10 mx-auto h-dvh">
      <h2 className="text-lg font-semibold mb-4 text-center">Itens Vendidos no Período</h2>
      <ResponsiveContainer width="100%" height={400}>
        {/* 1. Aumentar o espaçamento entre as barras */}
        <BarChart data={data} barCategoryGap="10%" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />

          {/* 2. Mostrar o nome do produto e ajustar a fonte */}
         
           <XAxis 
            scale={"auto"}
            height={100}
            
            dataKey="product" 
            tickMargin={16}
            angle={23} 
            className="font-bold" // Diz ao eixo X para usar a chave "product" dos seus dados
            tick={{ fontSize: 12 }} // Define o tamanho da fonte para os nomes dos itens
            interval={0} // Garante que todos os nomes sejam exibidos

          />

       
         
          <YAxis allowDecimals={false} />
          <Tooltip formatter={(value: number) => `${value} unidades`} />
          
          <Legend verticalAlign="top"/>
          <Bar dataKey="quantity" fill="#8884d8" name="Unidades Vendidas"/>
        </BarChart>
      </ResponsiveContainer>
    </div>

  )
}