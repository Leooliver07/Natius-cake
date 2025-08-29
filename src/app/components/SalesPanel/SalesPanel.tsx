"use client"

import { useState } from "react"
import { Card } from "../cards/Card"
import { SubMenu } from "../Submenu/SubMenu"



// Tipagem de produtos recebidos
interface Product {
  id: string;
  name: string;
  price: number;
  cost: number;
  type?: string;

}

export function SalesPanel({products}: {products: Product[]}){
 
  const [selectedCategory, setSelectedCategory] = useState('Bolo')
 
  const filteredProducts = products.filter(product => product.type === selectedCategory)



  return (
    <div>
      <div className='mb-6'>
         <SubMenu
        selectedCategory={selectedCategory}
        onSelectedCategory={setSelectedCategory}
        
      />

      </div>
      <div>
         <Card products={filteredProducts}  />

      </div>
     
      
    </div>
  )
}