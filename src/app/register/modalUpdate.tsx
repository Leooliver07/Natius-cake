"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {  updateProductAction } from "@/app/actions";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { revalidatePath } from "next/cache";


type Product = {
  id: string;
  name: string;
  price: number;
  cost: number;
  type: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-6"
    >
      {pending ? "Atualizando" : "Atualizar"}
    </button>
  );
}

interface ModalUpdateProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onRefresh: () => void;
}

export function ModalUpdate({ isOpen, onClose, product, onRefresh }: ModalUpdateProps) {
  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    cost: product?.cost || '',
    type: product?.type || '',
    id: product?.id || '',
  })
  

  useEffect(() => {
    if (product) {
      setFormData({
        // @ts-ignore
        id: product.id,
        name: product.name,
        price: product.price,
        cost: product.cost,
        type: product.type,
      });
    }
  }, [product]);

  const formRef = useRef<HTMLFormElement>(null);

  async function handleAction(formData: FormData) {
    const result = await updateProductAction(formData);

    if (result) { // Check if result is not undefined
      if (result.success) {
        toast.success(result.message);
        formRef.current?.reset();
        onClose();
        onRefresh();
      } else {
        toast.error(result.message);
      }
    }
  }



  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm=:max-w-md lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Atualizar Produto</DialogTitle>
        </DialogHeader>
        <form ref={formRef} action={handleAction}>
          {product && <input type="hidden" name="id" value={product.id} />}
          <div className="flex flex-col w-full mb-4 gap-6">
            <div className="flex flex-col w-full mb-4">
              <label htmlFor="name">Nome </label>
              <input
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                placeholder="Preço do produto"
                required
                type="float"
              />
            </div>

            <div className="flex flex-col w-full mb-4">
              <label htmlFor="cost">Custo</label>
              <input
                name="cost"
                value={formData.cost}
                onChange={(e) => setFormData({...formData, cost: e.target.value})}
                placeholder="Custo de produção"
                required
                type="float"
              />
            </div>
            <div className="flex flex-col w-full mb-4">
              <label htmlFor="type">Tipo</label>
              <select title="Selecione um tipo" name="type" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} required>
                <option value={"Bolo"}>Bolo</option>
                <option value={"Bebida"}>Bebida</option>
                <option value={"Doce"}>Outros</option>
              </select>
            </div>
          </div>

          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  );
}
