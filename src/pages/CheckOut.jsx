import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import { useSelector, useDispatch } from 'react-redux';
import StepOne from "../components/checkout/StepOne";
import StepTwo from "../components/checkout/StepTwo";
import StepThree from "../components/checkout/StepThree";
import axios from 'axios';
const CheckOut = () => {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  
  const dispatch = useDispatch();

  const paymentMethod = useSelector(state => state.cart.paymentMethod);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const pdfSent = useSelector(state => state.cart.pdfSent);

  const handleNext = () => {
    if (!isLastStep) {
      setActiveStep((cur) => cur + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setActiveStep((cur) => cur - 1);
      window.scrollTo(0, 0);
    }
  };
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const fetchAllRegions = async () => {
      try {
        let allRegions = [];
        let nextPage = 'https://ecosustentable.azurewebsites.net/api/RegionYComunaCL/region/';
        while (nextPage) {
          const response = await axios.get(nextPage);
          allRegions = [...allRegions, ...response.data.results];
          nextPage = response.data.next;
        }

        setRegions(allRegions);
      } catch (error) {
        console.error('Error al obtener las regiones:', error.message);
      }
    };

    fetchAllRegions();
  }, []);

  return (
    <div className="w-full min-h-[70vh] h-fit overflow-hidden flex flex-col justify-between px-8 py-4 ">
      <div className="flex-grow">
        {activeStep === 0 && <StepOne cartItems={cartItems} />}
        {activeStep === 1 && <StepTwo regions={regions} />}
        {activeStep === 2 && <StepThree 
          paymentMethod={paymentMethod} 
          totalAmount={totalAmount} 
          pdfSent={pdfSent} 
        />}
      </div>

      <div className="mt-8 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Atrás
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Siguiente
        </Button>
      </div>

      <div className="bottom-0 left-0 w-full px-8 py-4">
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
        >
          <Step onClick={() => setActiveStep(0)} className="relative">
            <div className=" hidden sm:block md:hidden w-max text-center absolute top-[40px]">
              <Typography
                variant="h6"
                color={activeStep === 0 ? "blue-gray" : "gray"}
              >
                Productos
              </Typography>
            </div>
            <div className="hidden md:block w-max text-center absolute top-[40px]">
              <Typography
                variant="h6"
                color={activeStep === 0 ? "blue-gray" : "gray"}
              >
                Confirmar Productos
              </Typography>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(1)} className="relative">
            <div className="hidden sm:block md:hidden w-max text-center absolute top-[40px]">
              <Typography
                variant="h6"
                color={activeStep === 1 ? "blue-gray" : "gray"}
              >
                Método de Pago
              </Typography>
            </div>
            <div className="hidden md:block w-max text-center absolute top-[40px]">
              <Typography
                variant="h6"
                color={activeStep === 1 ? "blue-gray" : "gray"}
              >
                Confirmar Método de Pago
              </Typography>
            </div>
          </Step>
          <Step onClick={() => setActiveStep(2)} className="relative">
            <div className="hidden sm:block md:hidden w-max text-center absolute top-[40px]">
              <Typography
                variant="h6"
                color={activeStep === 2 ? "blue-gray" : "gray"}
              >
                Gracias por Comprar
              </Typography>
            </div>
          </Step>
        </Stepper>
      </div>
    </div>
  );
};

export default CheckOut;
