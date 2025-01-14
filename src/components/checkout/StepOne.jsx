import React, { useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { setTotalAmount } from "../../store/cartSlice";

const StepOne = ({ cartItems }) => {
  const dispatch = useDispatch();


  const total = Math.round(cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0));


  useEffect(() => {
    dispatch(setTotalAmount(total));
  }, [cartItems, dispatch, total]);

  return (
    <div>
      <Typography variant="h5">Productos</Typography>
      <ul className="flex gap-2 flex-col">
        {cartItems.map((item) => (
          <li key={item.name} className="flex justify-between py-2 flex-wrap sm:flex-nowrap gap-2 bg-main2/40 rounded-md">
            <span className="w-[200px] overflow-hidden">{item.name}</span>
            <span className="w-[50px] overflow-hidden">{item.quantity}</span>
            <span className="w-[100px] overflow-hidden">
              ${ (item.quantity * item.price).toLocaleString("es-CL") }
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Typography variant="h6">Total: ${ total.toLocaleString("es-CL") }</Typography>
      </div>
    </div>
  );
};

export default StepOne;
