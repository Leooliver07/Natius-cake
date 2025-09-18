"use client";
import { createOrder } from "@/app/actions";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { CiCircleMinus } from "react-icons/ci";
import { ReceiptModal } from "./ReceiptModal";
import { PaymentMethod } from "./PaymentMethod";

interface OrderItem {
  id: string;
  type?: string;
  name: string;
  price: number;
  quantity: number;
  cost: number;
}

export function OrderCar() {
  const { cartItems, isCartOpen, removeFromCart, clearCart, toggleCart } =
    useCart();
  

  const [completedOrder, setCompletedOrder] = useState<OrderItem[] | null>(
    null
  );

  



  const formatNumbers = (data: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(data);
  };

  const handleFinishOrder = async () => {
    if (cartItems.length === 0) return;
   
   setCompletedOrder([...cartItems]);

    
  };

  if (!isCartOpen) {
    return null;
  }
  return (
    <>
      <div className="border-2 border-gray-300 rounded-l-md w-48 p-2  bg-gray-100 flex flex-col fixed top-18 right-0  transition-transform duration-300 ease-in-out">
        {cartItems.map((item) => (
          <div className=" flex justify-around items-center" key={item.id}>
            <div key={item.id} className=" w-full p-2">
              <p className="font-bold ">{item.name}</p>
              <p>{formatNumbers(item.price)}</p>

              <span className="text-sm font-bold">x{item.quantity}</span>
            </div>
            <div className="drop-shadow-2xl ">
              <button
                title="Remover item"
                className="cursor-pointer hover:scale-101 transition-all duration-200 mr-2 "
                onClick={() => removeFromCart(item.id)}
              >
                <CiCircleMinus size={26} />
              </button>
            </div>

            <hr className="mt-2 border-1 border-gray-300"></hr>
          </div>
        ))}

        <div className=" flex justify-center items mt-10">
          <button
            title="finalizar pedido"
            onClick={handleFinishOrder}
            
            className="bg-gray-700 text-white rounded p-2 font-bold cursor-pointer hover:scale-101 transition-all duration-200"
          >
            Avançar
          </button>
        </div>
      </div>

    

      <ReceiptModal
        orderItems={completedOrder}
        onClose={() => setCompletedOrder(null)}
        toggleCart={toggleCart}
      />
    </>
  );
}
