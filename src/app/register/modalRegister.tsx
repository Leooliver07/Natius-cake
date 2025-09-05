"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { addProductAction } from "@/app/actions";
import {useEffect, useRef} from 'react'
import { useActionState } from "react";
import {toast} from 'sonner'



interface ModalRegisterProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialState = {
  sucess: false, 
  message: '',
};


export function ModalRegister({ isOpen, onClose }: ModalRegisterProps) {
  const [state, formAction] = useActionState(addProductAction, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.message){
      if(state.sucess){
        toast.success(state.message)
        formRef.current?.reset()
        onClose()
      }else{
        toast.error(state.message)
      }
      
    }
  },[state, onClose])

  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm=:max-w-md lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Cadastrar Produto</DialogTitle>
        </DialogHeader>
        <form ref={formRef} action={formAction} >
          <div className="flex flex-col w-full mb-4 gap-6">
            <div className="flex flex-col w-full mb-4">
              <label htmlFor="name">Nome </label>
              <input
                name="name"
                type="text"
                placeholder="Nome do produto"
                required
              />
            </div>

            <div className="flex flex-col w-full mb-4">
              <label htmlFor="price">Preço</label>
              <input
                className="appearance-none"
                name="price"
                placeholder="Preço do produto"
                required
                type="number"

              />
            </div>

            <div className="flex flex-col w-full mb-4">
              <label htmlFor="cost">Custo</label>
              <input
                name="cost"
                placeholder="Custo de produção"
                required
                type="number"
              />
            </div>
            <div className="flex flex-col w-full mb-4">
              <label htmlFor="type">Tipo</label>
              <select 
                title="Selecione um tipo"
                name="type"
                required>
                <option value={"Bolo"}>Bolo</option>
                <option value={"Bebida"}>Bebida</option>
                <option value={"Doce"}>Outros</option>
              </select>
            </div>
          </div>

          <button
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
            type="submit"
          >
            Cadastrar
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
