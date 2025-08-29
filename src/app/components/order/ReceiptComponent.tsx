
interface OrderItem {
  id: string;
  type?: string;
  name: string;
  price: number;
  quantity: number;
  cost: number;
}

interface ReceiptProps{
  orderItems: OrderItem[];

}

export function ReceiptComponent({orderItems}: ReceiptProps){
  const total = orderItems.reduce((sum, item)=> sum + item.price * item.quantity, 0);
  const now = new Date();

  return(
    <div>
      <div className="flex flex-col items-center justify-center">
        
        <p>Recibo de venda</p>
        <p>{now.toLocaleDateString('pt-BR')} - {now.toLocaleTimeString('pt-BR')}</p>
        </div>
      <div className="border-t border-b border-dashed border-black py-2 myy-2">
        {orderItems.map((item) => (
        <div key={item.id} className="flex justify-between">
          <span>{item.quantity}x {item.name}</span>
          <span>{(item.price * item.quantity).toFixed(2)}</span>


          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <span>Total</span>
        <span>{total.toFixed(2)}</span>
      </div> 
    </div>


)}


    
    