import React, { useEffect, useRef } from "react";
import { Typography } from "@material-tailwind/react";
import { useDispatch,useSelector } from "react-redux";
import { setTotalAmount } from "../../store/cartSlice";

const StepOne = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const lastDispatchedTotal = useRef(null);
  const total = Math.round(
    cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
  );

  useEffect(() => {
    if (lastDispatchedTotal.current !== total) {
      dispatch(setTotalAmount(total));
      lastDispatchedTotal.current = total;
    }
  }, [total, dispatch]);
  return (
    <div>
      <Typography variant="h5">Productos</Typography>

      {total === 0 ? (
        <div className="mt-4">
          <Typography variant="h6" color="red">
            Tienes el carrito vacío
          </Typography>
        </div>
      ) : (
        <>
          <ul className="flex gap-2 flex-col">
            {cartItems.map((item) => (
              <li
                key={item.name}
                className="flex justify-between py-2 flex-wrap sm:flex-nowrap gap-2 bg-main2/40 rounded-md"
              >
                <span className="w-[200px] overflow-hidden">{item.name.replace(/_/g, ' ')}</span>
                <span className="w-[50px] overflow-hidden">{item.quantity}</span>
                
                <span className="w-[100px] overflow-hidden">
                  ${item.quantity * item.price}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Typography variant="h6">
              Total: ${total.toLocaleString("es-CL")}
            </Typography>
          </div>
        </>
      )}
    </div>
  );
};

export default StepOne;
