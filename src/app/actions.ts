"use server";

import { supabase } from "@/services/supabaseClient";
import { revalidatePath } from "next/cache";

type CartItem = {
  id: string;
  name: string;
  price: number;
  cost: number;
  quantity: number;
  type?: string;
};

export async function createOrder(CartItems: CartItem[], selectPaymentMethod: string) {
  try {
    const totalAmount = CartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const totalCost = CartItems.reduce(
      (sum, item) => sum + item.cost * item.quantity,
      0
    );

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert({
        total_amount: totalAmount,
        total_cost: totalCost,
        payment_method: selectPaymentMethod,
      })
      .select("id")
      .single();

    if (orderError) throw orderError;
    const newOrderId = orderData.id;

    const orderItemsToInsert = CartItems.map((item) => ({
      order_id: newOrderId,
      product_id: item.id,
      quantity: item.quantity,
      unit_price: item.price,
      unit_cost: item.cost,
      product_name: item.name,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItemsToInsert);

    if (itemsError) throw itemsError;

    revalidatePath("/");

    return { success: true, message: "Pedido finalizado com sucesso!" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Erro ao finalizar pedido. Tente novamente!",
    };
  }
}

export async function addProductAction(formData: FormData) {
  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const cost = formData.get("cost") as string;
  const type = formData.get("type") as string;

  if (!name || !price || !cost) {
    return { success: false, message: "Todos os campos são obrigatórios!" };
  }

  try {
    const { error } = await supabase.from("products").insert({
      name,
      price: Number(price),
      cost: Number(cost),
      type,
    });

    if (error) throw error;

    revalidatePath("/");
    revalidatePath("/register");

    return { success: true, message: "Produto adicionado com sucesso!" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Erro ao adicionar produto. Tente novamente!",
    };
  }
}


export async function updateProductAction(formData: FormData) {
  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const cost = formData.get("cost") as string;
  const type = formData.get("type") as string;
  const id = formData.get("id") as string;


  try {
    const { error } = await supabase
    .from("products")
    .update({
      name,
      price: Number(price),
      cost: Number(cost),
      type,
    })
    .eq("id", id)
    ;

    if (error) throw error;
    revalidatePath("/");
    revalidatePath("/register");

    return { success: true, message: "Produto atualizado com sucesso!" }; 
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProductAction(idProduct: string) {
  console.log(idProduct);
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", idProduct);

  if (error) throw error;
  console.log("Produto deletado com sucesso!");
  revalidatePath("/");
  revalidatePath("/register");

  return { success: true, message: "Produto deletado com sucesso!" };

    
}