"use client";

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartDataProps {
  id?: string;
  payment_method: string;
  total_amount: number; 
}

interface PaymentChartProps {
  data: ChartDataProps[];
}

export function PaymentChart({ data }: PaymentChartProps) {

  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3 " />
        <XAxis dataKey='payment_method' tickFormatter={(value: string) => value.toUpperCase()} />
        <YAxis  dataKey='total_amount' tickFormatter={(value: number) => `R$ ${value.toFixed(2)}` }/>
        <Tooltip formatter={(value: number)=>`R$${value.toFixed(2)}`}   />
        <Legend />
       
        
        <Bar dataKey="total_amount" name="Valor" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}