import React from "react";
import { useSelector } from "react-redux"; 
import { Typography } from "@material-tailwind/react";

const StepThree = () => {
  
  const { items = [], paymentMethod, totalAmount, orderCode: cartOrderCode } = useSelector((state) => state.cart);
  const { tracking_number } = useSelector((state) => state.order);  

  
  if (!items.length) {
    return <p>No hay productos en tu carrito.</p>;
  }

  
  const orderCode = tracking_number || cartOrderCode || "Generando...";

  return (
    <div>
      <Typography variant="h5">Gracias por tu compra</Typography>
      <p>Tu pedido está en proceso.</p>

      <div className="mt-4 p-4 bg-gray-100 rounded-md">
        <pre className="text-sm text-gray-700 overflow-auto max-w-full whitespace-pre-wrap break-words">
          {`Pedido:
Productos: 
${items.map((item) => `${item.name.replace(/_/g, ' ')} (Cantidad: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}

Precio Total: $${totalAmount}

Código de Pedido (Tracking): ${orderCode} 

Recibirás un PDF con los detalles de tu pedido por WhatsApp/Correo.`}
        </pre>
      </div>
    </div>
  );
};

export default StepThree;
