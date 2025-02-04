import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';

const QuantityComp = ({ productStock, productPrice, quantity, onQuantityChange }) => {
    const [maxOrder, setMaxOrder] = useState(10); // Usar estado para maxOrder
    const currentStock = productStock - quantity; 
    let totalPrice = productPrice * quantity;

    const handleQuantityChange = (action) => {
        const newQuantity = quantity + action;
        
        if (newQuantity < 1) {
            return; 
        }
        if (newQuantity > productStock) {
            alert("Todo agotado");
            return; 
        }
        if (quantity === maxOrder && action === 1) {
            alert("Estas haciendo una compra grande, puede que sea mas conveniente contactar con el vendedor por un mejor precio");
            // setMaxOrder(maxOrder + 10); // Actualizar maxOrder usando setMaxOrder
            return;
        }

        onQuantityChange(newQuantity);
    };

    return (
        <div className="flex gap-4 flex-wrap items-center justify-start w-full px-[10%]">
            <span className="text-xl">unidades</span>
            <div className="cantidad flex flex-row items-center" >
                <Button
                    className="p-3 hover:bg-white group transition-all rounded-lg"
                    onClick={() => handleQuantityChange(-1)}
                >
                    <div className="h-[3px] bg-white group-hover:bg-black w-5"></div>
                    <div className="h-[3px] w-5 bg-transparent"></div>
                </Button>
                <span className="mx-4 text-3xl font-bold">{quantity}</span>
                <Button
                    className="p-3 hover:bg-white group transition-all rounded-lg"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity===10}
                    
                >
                    <div className="h-[3px] bg-white w-5 group-hover:bg-black"></div>
                    <div className="h-[3px] bg-white w-5 group-hover:bg-black rotate-90 -translate-y-[2px]"></div>
                </Button>
            </div>
            <div className='w-full xl:w-fit'>
                <span className="text-xl font-bold">Total: <strong className='text-2xl font-semibold'>${totalPrice}</strong></span>
                <span className="ml-4"> disponible: {currentStock}</span>
            </div>
        </div>
    );
};

export default QuantityComp;
