"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

import { ReceiptComponent } from "./ReceiptComponent";
import logoimg from "@/app/assets/natiuslogo.png";
import Image from "next/image";
import { PaymentMethod } from "./PaymentMethod";
import { useState } from "react";
import { createOrder } from "@/app/actions";
import { useCart } from "@/context/CartContext";
import toast, { Toast } from "react-hot-toast";

interface OrderItem {
  id: string;
  type?: string;
  name: string;
  price: number;
  quantity: number;
  cost: number;
}

interface ReceiptModalProps {
  orderItems: OrderItem[] | null;
  onClose: () => void;
  toggleCart: () => void;
}

export function ReceiptModal({orderItems, onClose, toggleCart}: ReceiptModalProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const { cartItems, clearCart } = useCart();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const isOpen = orderItems !== null;

  const handlePrint = () => {
    window.print();
  };

  async function handleFinish(){
    if(selectedPaymentMethod === null){
      toast.error('Selecione um método de pagamento')
      return
    }
    setIsSubmiting(true);
    
    

    const result = await createOrder(cartItems, selectedPaymentMethod as string)

    setIsSubmiting(false)

    if(!result.success){
      console.log('erro ao criar pedido', result.message) 
    }
    toast.success('Pedido finalizado com sucesso')
    clearCart()
    onClose();
    toggleCart();
  }

  if (!isOpen) {
    return null;
  }

  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent  aria-describedby="receipt-content">
        <DialogHeader>
          <DialogTitle>
            <div className="flex justify-center items-center">
              <Image
                src={logoimg}
                quality={100}
                width={100}
                height={100}
                alt="Logo Natius"
              />
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="printable-area">
          <ReceiptComponent orderItems={orderItems} />
        </div>
        <DialogFooter>
          <div className="flex flex-col items-center justify-center gap-2 mt-10 mx-auto">
            <div className="flex justify-between">
              <PaymentMethod
                selectedMethod={selectedPaymentMethod}
                onMethodChange={setSelectedPaymentMethod}
              />
            </div>
            <div className="flex justify-between gap-2">
              <button
                className="bg-gray-700 text-white rounded p-2 font-bold cursor-pointer hover:scale-101 transition-all duration-200"
                
                onClick={handleFinish}
              >
                Finalizar
              </button>

              <button
                className="bg-red-500 hover:bg-red-600 text-white  font-bold py-2 px-4 rounded  cursor-pointer"
                onClick={handlePrint}
              >
                Imprimir
              </button>

              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
                onClick={() => {
                  onClose();
                  toggleCart();
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
