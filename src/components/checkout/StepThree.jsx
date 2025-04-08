import React, {useEffect,useRef} from "react";
import { useSelector } from "react-redux";
import { Typography } from "@material-tailwind/react";
import axios from "axios";
import { BASE_URL } from "../../App";
const StepThree = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const paymentMethod = useSelector((state) => state.cart.paymentMethod);
  const detallesEnviados = useRef(false);
  const order = useSelector((state) => state.order.pedido);
  const guestData = useSelector((state) => state.order.guestData);
  useEffect(() => {
    const enviarDetallesPedido = async () => {
      if (detallesEnviados.current || !order?.id || !cartItems.length) return;
  
      detallesEnviados.current = true;
  
      for (const item of cartItems) {
        const payload = {
          item_type: "producto",
          cantidad: item.quantity,
          precio: item.price,
          pedido: order.id,
          producto: item.productID
        };
  
        try {
          const response = await axios.post(`${BASE_URL}/api/detalles-pedido/`, payload);
          // console.log("/api/detalles-pedido/ response:", response.data);
        } catch (error) {
          console.error("Error al enviar detalle de pedido:", error);
        }
      }
    };
  
    enviarDetallesPedido();
  }, [order, cartItems]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <Typography variant="h5">Resumen Final</Typography>

      <div>
        <Typography variant="h6">Productos:</Typography>
        <ul className="pl-4">
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name.replace(/_/g, ' ')} x {item.quantity} = ${item.quantity * item.price}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Typography variant="h6">Total:</Typography>
        <p>${totalAmount.toLocaleString("es-CL")}</p>
      </div>

      <div>
        <Typography variant="h6">Método de Pago:</Typography>
        <p>{paymentMethod || order?.pago}</p>
      </div>

      {order && (
        <>
          <div>
            <Typography variant="h6">Dirección de Envío:</Typography>
            <p>{order.direccion_envio}</p>
          </div>

          <div>
            <Typography variant="h6">Número de Seguimiento:</Typography>
            <p>{order.tracking_number}</p>
          </div>

          <div>
            <Typography variant="h6">Fecha de Creación:</Typography>
            <p>{new Date(order.fecha_creacion).toLocaleString("es-CL")}</p>
          </div>

          <div>
            <Typography variant="h6">ID del Pedido:</Typography>
            <p>{order.id}</p>
          </div>
        </>
      )}

      {guestData && (
        <div>
          <Typography variant="h6">Datos del Cliente Invitado:</Typography>
          <ul className="pl-4">
            <li>Nombre: {guestData.primer_nombre} {guestData.segundo_nombre}</li>
            <li>Apellido: {guestData.primer_apellido} {guestData.segundo_apellido}</li>
            <li>RUN: {guestData.run}-{guestData.dv}</li>
            <li>Región ID: {guestData.region}</li>
            <li>Comuna ID: {guestData.comuna}</li>
            <li>Dirección: {guestData.direccion}</li>
            <li>Email: {guestData.email}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default StepThree;
