"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { addProductAction } from "@/app/actions";
import { useRef } from "react";
import { toast } from "react-hot-toast";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-6"
    >
      {pending ? "Cadastrando..." : "Cadastrar"}
    </button>
  );
}

interface ModalRegisterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalRegister({ isOpen, onClose }: ModalRegisterProps) {
  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  const formRef = useRef<HTMLFormElement>(null);

  async function handleAction(formData: FormData) {
    const result = await addProductAction(formData);

    if (result.success) {
      toast.success(result.message);
      formRef.current?.reset();
      onClose();
    } else {
      toast.error(result.message);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm=:max-w-md lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Cadastrar Produto</DialogTitle>
        </DialogHeader>
        <form ref={formRef} action={handleAction}>
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
              <select title="Selecione um tipo" name="type" required>
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
