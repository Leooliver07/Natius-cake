import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { addProductAction } from "@/app/actions";

interface ModalRegisterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalRegister({ isOpen, onClose }: ModalRegisterProps) {
  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm=:max-w-md lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Cadastrar Produto</DialogTitle>
        </DialogHeader>
        <form action={async (formData) => { await addProductAction(formData); }}>
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
