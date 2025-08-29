"use client"
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { ReceiptComponent } from "./ReceiptComponent"
import logoimg from "@/app/assets/natiuslogo.png"
import Image from "next/image"


interface OrderItem{
  id: string;
  type?: string;
  name: string;
  price: number;
  quantity: number;
  cost: number;

}

interface ReceiptModalProps{
  orderItems: OrderItem[] | null;
  onClose: () => void;
}

export function ReceiptModal({orderItems, onClose}: ReceiptModalProps){
  const isOpen = orderItems !== null;

  const handlePrint = () =>{
    window.print()
  }

  if(!isOpen){
    return null;
  }
  return(
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex justify-center items-center">
              <Image src={logoimg} quality={100} width={100} height={100} alt="Logo Natius"/>
            </div>
            
          </DialogTitle>
        </DialogHeader>
          <div className="printable-area">
          <ReceiptComponent orderItems={orderItems} />
        </div>
        <DialogFooter>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handlePrint}>Imprimir</button>
          
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  
            onClick={onClose}
            
            >Fechar</button>
        </DialogFooter>

      </DialogContent>

    </Dialog>



  )
}