import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import NavSearch from "./header/CartModal";

export function CartModal() {
  const [size, setSize] = useState(null);
  

  const cartItems = useSelector((state) => state.cart.items);
  
  const handleOpen = (value) => setSize(value);
  
  const handleClose = () => setSize(null);

  const handleConfirm = () => {
    handleClose();
  };

  return (
    <>
      <NavSearch handleOpen={handleOpen} />

      <Dialog
        open={size === "xl"}
        size={size || "md"}
        handler={handleOpen}
      >
        <DialogHeader>Tu carrito</DialogHeader>
        <DialogBody>
          {cartItems.length === 0 ? (
            <p>Tu carrito esta vacio</p>
          ) : (
            <div>
              <ul>
                {cartItems.map((item, index) => (
                  <li key={index} className="flex justify-between py-2">
                    <img src={item.image1} alt="" />
                    <span>{item.name}</span>
                    
                    <span>{item.quantity} x ${item.price}</span>
                    <span>
                      ${(item.quantity * item.price).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between font-bold">
                <span>Total:</span>
                <span>
                  ${cartItems.reduce(
                    (total, item) => total + item.quantity * item.price,
                    0
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1"
          >
            <span>volver</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleConfirm}
          >
            <span>Proceder al checkout</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
