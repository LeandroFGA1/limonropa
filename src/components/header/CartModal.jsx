import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Badge,
} from "@material-tailwind/react";
import { updateQuantity, removeFromCart } from "../../store/cartSlice";
import directory from "../../assets/imgs/directory";
import { useNavigate } from "react-router-dom";

export function CartModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isBouncing, setIsBouncing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(totalItems);

    if (totalItems > cartCount) {
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 500);
    }
  }, [cartItems]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleQuantityChange = (name, quantity) => {
    dispatch(updateQuantity({ name, quantity }));
  };

  const handleRemoveItem = (name) => {
    dispatch(removeFromCart(name));
  };

  const handleConfirm = () => {
    handleClose();
    navigate("/checkOut", { state: { cartItems } });
  };

  return (
    <>
      
      {cartCount > 0 && (
        <Badge
          content={cartCount > 4 ? "4+" : cartCount}
          className={`transition-transform ${isBouncing ? "animate-bounce" : ""}`}
        >
          <Button
            size="sm"
            color="white"
            onClick={handleOpen}
            className="px-2 bg-transparent hover:bg-yellow-600 capitalize"
          >
            <img src={directory.cart} className="h-8" alt="Cart" />
          </Button>
        </Badge>
      )}
      {cartCount === 0 && (
        <Button
        size="sm"
        color="white"
        onClick={handleOpen}
        className="px-2 bg-transparent hover:bg-yellow-600 capitalize"
      >
        <img src={directory.cart} className="h-8" alt="Cart" />
      </Button>
      )}

      
      <Dialog open={isOpen} size="xl" handler={handleClose} className="pl-7">
        <DialogHeader>Tu Carrito</DialogHeader>
        <DialogBody>
          {cartItems.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <div>
              <ul className="flex flex-col gap-2">
                {cartItems.map((item) => (
                  <li
                    key={item.name}
                    className="flex sm:justify-between items-center py-2 bg-main2/40 rounded-md flex-wrap sm:flex-nowrap gap-2"
                  >
                    <img src={item.image1} alt="" className="w-10 h-10" />
                    <span className="w-[150px] md:w-[250px] overflow-hidden">{item.name}</span>
                    <div className="flex items-center gap-2 w-[110px] overflow-hidden">
                      <Button
                        size="sm"
                        onClick={() =>
                          handleQuantityChange(item.name, item.quantity - 1)
                        }
                      >
                        -
                      </Button>
                      <span className="w-[30px]">{item.quantity}</span>
                      <Button
                        size="sm"
                        onClick={() =>
                          handleQuantityChange(item.name, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                    <span className="w-[80px] overflow-hidden">
                      ${(item.quantity * item.price).toLocaleString("es-CL")}
                    </span>
                    <Button
                      color="red"
                      size="sm"
                      onClick={() => handleRemoveItem(item.name)}
                    >
                      Eliminar
                    </Button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between font-bold">
                <span>Total:</span>
                <span>
                  $
                  {cartItems
                    .reduce(
                      (total, item) => total + item.quantity * item.price,
                      0
                    )
                    .toLocaleString("es-CL")}
                </span>
              </div>
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleClose}>
            Volver
          </Button>
          <Button variant="gradient" color="green" onClick={handleConfirm}>
            Proceder al Checkout
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default CartModal;
