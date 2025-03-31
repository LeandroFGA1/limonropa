import React from "react";
import { useSelector } from "react-redux"; 
import { Typography } from "@material-tailwind/react";

const StepThree = () => {
  // Código original, actualmente inhabilitado mientras se desarrolla la funcionalidad:
  /*
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
          {`Productos: 
${items.map((item) => `${item.name.replace(/_/g, ' ')} (Cantidad: ${item.quantity}) - $${(item.price * item.quantity)}`).join('\n')}

Precio Total: $${totalAmount}

Código de Pedido (Tracking): ${orderCode} 

Recibirás un PDF con los detalles de tu pedido por WhatsApp/Correo.`}
        </pre>
      </div>
    </div>
  );
  */

  // Nuevo retorno mientras se desarrolla la funcionalidad:
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Typography variant="h5">Funcionalidad en Desarrollo</Typography>
      <p className="text-gray-700 mt-4">
        La funcionalidad actual se encuentra en fase de desarrollo técnico. Por el momento, no es posible continuar con el proceso hasta completar la integración de la lógica necesaria.
      </p>
    </div>
  );
};

export default StepThree;
