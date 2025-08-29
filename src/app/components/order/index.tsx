"use client"
import { createOrder } from "@/app/actions";
import { useCart } from "@/context/CartContext"
import { useState } from "react";
import { CiCircleMinus } from "react-icons/ci";

export function OrderCar(){
  const {cartItems, isCartOpen, removeFromCart, clearCart} = useCart()
  const [isSubmiting, setIsSubmiting] = useState(false)
 

  const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const handleFinishOrder = async () => {
    if(cartItems.length === 0)return;

    setIsSubmiting(true)

    const result = await createOrder(cartItems)

    setIsSubmiting(false)
  
    if(result.sucess){
      alert(result.message)
      clearCart()
    }else{
      alert(result.message)
    }
  }


  if(!isCartOpen){
    return null;
  }
  return(
    <>
      <div className="border-2 border-gray-300 rounded-l-md h-100 w-48 p-2 mr-1 bg-gray-100">
        {cartItems.map((item) =>
        <div className=" flex justify-around items-center" key={item.id}>
            <div key={item.id} className=" w-full p-2">
              <p className="font-bold ">{item.type} de {item.name}</p>
              <p>R${item.price},00</p>
              {/* Adicionei esta linha abaixo que voce nao havia colocado nos exemplos. por isso nao estava mostrando a quantidade, apesar de a logica estar funcionando corretamente. */}
              <span className="text-sm font-bold">x{item.quantity}</span>
           
            </div>
          <div className="drop-shadow-2xl ">
            <button
              title="Remover item" 
              className="cursor-pointer hover:scale-101 transition-all duration-200"
              onClick={() => removeFromCart(item.id)}>
              <CiCircleMinus size={26}/>
            </button>
          </div>

          <hr className="mt-2 border-1 border-gray-300"></hr>
        </div>
        
        )}

        <div className=" flex justify-center items mt-10">
          <button
            title="finalizar pedido"
            onClick={handleFinishOrder}
            disabled={isSubmiting || cartItems.length === 0}
            className="bg-gray-700 text-white rounded p-2 font-bold cursor-pointer hover:scale-101 transition-all duration-200"
          >
            {isSubmiting ? "Finalizando pedido..." : "Finalizar pedido"}
          
          </button>
        </div>
      </div>
    </>
  )
}