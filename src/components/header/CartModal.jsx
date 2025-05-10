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
    if (totalItems > cartCount) {
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 500);
    }
    setCartCount(totalItems);
  }, [cartItems]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleQuantityChange = (name, quantity) => dispatch(updateQuantity({ name, quantity }));
  const handleRemoveItem = (name) => dispatch(removeFromCart(name));
  const handleConfirm = () => {
    handleClose();
    navigate("/checkOut");
  };

  return (
    <>
      {cartCount > 0 ? (
        <Badge
          content={cartCount > 4 ? "4+" : cartCount}
          className={`translate-y-[1px] translate-x-2 transition-transform ${isBouncing ? "animate-bounce" : ""}`}
        >
          <Button
            size="sm"
            color="white"
            onClick={handleOpen}
            className="px-2 bg-transparent hover:bg-white capitalize"
          >
            <img src={directory.cart} className="h-8 min-w-[30px]" alt="Carrito" />
          </Button>
        </Badge>
      ) : (
        <Button
          size="sm"
          color="white"
          onClick={handleOpen}
          className="px-2 bg-transparent border-[2px] border-transparent hover:border-black active:border-white/80 hover:bg-white/90 capitalize hover:py-2 flex items-center justify-center"
        >
          <img src={directory.cart} className="h-8 min-w-[30px] transition-all" alt="Carrito vacío" />
        </Button>
      )}

      <Dialog open={isOpen} size="xl" handler={handleClose} className="pl-7">
        <DialogHeader className="text-2xl font-bold">Tu Carrito</DialogHeader>
        <DialogBody className="max-h-[70vh] overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-gray-600 text-center text-lg">Tu carrito está vacío.</p>
          ) : (
            <>
              <ul className="flex flex-col gap-4">
                {cartItems.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between p-3 bg-main2/30 rounded-md shadow-sm flex-wrap sm:flex-nowrap gap-3"
                  >
                    <img src={item.image1} alt={item.name} className="w-14 h-14 object-cover rounded" />
                    <span className="flex-1 min-w-[150px] md:min-w-[200px] font-medium truncate">
                      {item.name.replace(/_/g, ' ')}
                    </span>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outlined"
                        onClick={() => handleQuantityChange(item.name, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outlined"
                        onClick={() => handleQuantityChange(item.name, item.quantity + 1)}
                        disabled={item.quantity >= 10}
                      >
                        +
                      </Button>
                    </div>

                    <span className="w-[90px] text-right font-bold">
                      ${(item.quantity * item.price).toLocaleString("es-CL")}
                    </span>

                    <Button
                      color="red"
                      size="sm"
                      variant="text"
                      className="ml-auto"
                      onClick={() => handleRemoveItem(item.name)}
                    >
                      ✕
                    </Button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t pt-4 flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-green-700">
                  $
                  {cartItems
                    .reduce((total, item) => total + item.quantity * item.price, 0)
                    .toLocaleString("es-CL")}
                </span>
              </div>
            </>
          )}
        </DialogBody>

        <DialogFooter className="flex justify-between gap-3">
          <Button variant="text" color="red" onClick={handleClose}>
            Volver
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleConfirm}
            disabled={cartItems.length === 0}
          >
            Proceder al Checkout
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default CartModal;
