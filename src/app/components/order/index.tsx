"use client"
import { useCart } from "@/context/CartContext"

export function OrderCar(){
  const {cartItems, isCartOpen} = useCart()

  const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  if(!isCartOpen){
    return null;
  }
  return(
    <>
      <div className="border-2 border-gray-300 rounded-l-md h-100 w-40 p-2 mr-1 bg-gray-100">
        {cartItems.map((item) =>
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.price}</p>
            {/* Adicionei esta linha abaixo que voce nao havia colocado nos exemplos. por isso nao estava mostrando a quantidade, apesar de a logica estar funcionando corretamente. */}
            <span className="text-sm font-bold">x{item.quantity}</span>
          </div>
        )}
      </div>
    </>
  )
}