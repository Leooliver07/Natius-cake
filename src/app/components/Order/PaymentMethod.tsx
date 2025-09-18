import { on } from "events";
import { useState } from "react"

interface PaymentMethodProps{
  selectedMethod: string | null;
  onMethodChange: (method: string) => void;
}


export function PaymentMethod({selectedMethod, onMethodChange}: PaymentMethodProps){
  console.log(selectedMethod)


  return(
    
      <div className="flex justify-between gap-4">
            <button 
            className={`bg-gray-500 ${selectedMethod === 'dinheiro' ? 'bg-green-500' : ''}  text-white rounded p-2 font-bold cursor-pointer hover:scale-101 transition-all duration-200`}
            onClick={() => onMethodChange('dinheiro')}
            >Dinheiro
            </button>
            <button 
            className={`bg-gray-500 ${selectedMethod === 'credito' ? 'bg-green-500' : ''}  text-white rounded p-2 font-bold cursor-pointer hover:scale-101 transition-all duration-200`}
            onClick={() => onMethodChange('credito')}
            >Crédito
            </button>
            <button 
            className={`bg-gray-500 ${selectedMethod === 'debito' ? 'bg-green-500' : ''}  text-white rounded p-2 font-bold cursor-pointer hover:scale-101 transition-all duration-200`}
            onClick={() => onMethodChange('debito')}
            >Débito
            </button>
            <button 
            className={`bg-gray-500 ${selectedMethod === 'pix' ? 'bg-green-500' : ''}  text-white rounded p-2 font-bold cursor-pointer hover:scale-101 transition-all duration-200`}
            onClick={() => onMethodChange('pix')}
            >PIX
            </button>
      
    </div>
  )

}