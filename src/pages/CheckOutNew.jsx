import React, { useState } from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetCart } from "../store/cartSlice";
import StepOne from "../components/checkout/StepOne";
import StepTwoNew from "../components/checkout/StepTwoNew";
import StepThreeNew from "../components/checkout/StepThreeNew";

const steps = ["Confirmar Productos", "Confirmar Método de Pago", "Gracias por Comprar"];

const CheckOutNew = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const handleNext = () => {
    setActiveStep((cur) => cur + 1);
    window.scrollTo(0, 0);
  };
  const handlePrev = () => {
    setActiveStep((cur) => cur - 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full min-h-[70vh] flex flex-col justify-between px-8 py-4">
      <div className="flex-grow">
        {activeStep === 0 && <StepOne />}
        {activeStep === 1 && <StepTwoNew />}
        {activeStep === 2 && <StepThreeNew />}
      </div>

      <div className="mt-8 flex justify-between">
        <Button onClick={handlePrev} disabled={activeStep === 0 || totalAmount === 0}>
          Atrás
        </Button>

        {activeStep === 2 ? (
          <Link to="/" onClick={() => dispatch(resetCart())}>
            <Button>Regresar al inicio</Button>
          </Link>
        ) : (
          <Button onClick={handleNext}>Siguiente</Button>
        )}
      </div>

      <div className="bottom-0 left-0 w-full px-8 py-4">
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={index} onClick={() => setActiveStep(index)} className="relative">
              <div className="hidden sm:block  w-max text-center absolute top-[40px]">
                <Typography variant="h6" color={activeStep === index ? "blue-gray" : "gray"}>
                  {label}
                </Typography>
              </div>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
};

export default CheckOutNew;
