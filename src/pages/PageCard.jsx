import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {Button} from "@material-tailwind/react";
import { addToCart,updateProductQuantity } from '../store/cartSlice';
import { useDispatch, useSelector } from "react-redux";
import directory from '../assets/imgs/directory';


const PageCard = () => {
  const location = useLocation();
  const { product } = location.state || {}; 
  const [quantity, setQuantity] = useState(1);
  const [animationState, setAnimationState] = useState("default");
  const[showStock, setShowStock] = useState(product.stock);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const totalPrice = (Number(product.price) * Number(quantity));
  const isProductInCart = cartItems.some(item => item.name === product.name);

  const getDivColor = () => {
    if (showStock === 0) return "bg-gray-500 p-1";
    if (showStock < 5) return "bg-red-500 p-2";
    if (showStock <= 10) return "bg-yellow-500 p-1";
    return "";
};


  useEffect(() => {
    if (isProductInCart) {
      const cartProduct = cartItems.find(item => item.name === product.name);
      setQuantity(cartProduct.quantity);
    }
  }, [cartItems, product, isProductInCart]);

  const handleQuantityChange = (action) => {
    if(action >0 && showStock === 0) return;
    if (quantity >= 1) {
      if (quantity === 1 && action === -1) {
        return;
      }
      const newQuantity = quantity + action;
      setQuantity(newQuantity);
      dispatch(updateProductQuantity({ name: product.name, quantity: newQuantity }));
      setShowStock(showStock - action);
    } else {
      setQuantity(1);
    }
    setAnimationState("default");
  };

  useEffect(() => {
    if (!isProductInCart) {
      setQuantity(1);
    }
  }, [cartItems, isProductInCart]);
  

  const handleAddToCart = () => {
    if (showStock === 0) return;
    setAnimationState("animating");
    setTimeout(() => {
      setAnimationState("done");
    }, 1000);
    if (!isProductInCart) {
      dispatch(addToCart({ ...product, quantity }));
    }
  };
  

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  const productName = product.name.replace(/_/g, ' ');

  return (
    <div className=' w-full flex items-center justify-center '> 
      <div className="group border-gray-100/30 flex w-[35%] min-w-[290px] max-w-full flex-col self-center overflow-hidden rounded-lg border bg-main/20 shadow-md">
        <div className='contenedor'>
          <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl max-w-[800px]">
            <img
              className="peer absolute top-0 right-0 h-full w-full object-cover"
              src={product.image1}
              alt={"producto" + " " + product.name}
            />
            <div
              className="peer peer-hover:right-0 absolute top-0 -right-[800px] h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 bg-main"
            >
              Posible ficha tecnica u otro detalle
            </div>
          </div>
          <div className="mt-4 px-5 pb-5">
            <div>
              <span className="text-green-400"><strong>{product.brand}</strong></span>
              <span className="text-red-200"><strong> {product.category}</strong></span>
              <h5 className="text-xl tracking-tight">{productName}</h5>
                <span className={`text-sm ${getDivColor()} rounded`}>{showStock === 0 ? "AGOTADO!!" : `Stock: ${showStock}`}</span>
              
              
            </div>
            <div className="mt-2 mb-5 flex gap-3   items-center justify-between">
              <span className="text-4xl font-bold">${totalPrice}</span>
              
              <div className="flex items-center">
                <Button className="px-4 py-2 text-white rounded-full"
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </Button>
                <span className="mx-4 text-xl">{quantity}</span> 
                <Button className="px-4 py-2 text-white rounded-full"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <Button className="bg-green-500 w-[70%] h-10 text-white relative overflow-hidden"
          onClick={handleAddToCart}
          >
            {animationState === "default" && (
            <div className="transition-opacity duration-300 opacity-100">
              Agregar al carrito
            </div>
            )}
            {animationState === "animating" && (
            <div className="animation-buy animate-cartAnimation absolute inset-0 flex items-center justify-center">
              <img src={directory.cart} alt="carrito de compra" className="h-8" />
            </div>
            )}
            {animationState === "done" && (
            <div className="transition-opacity duration-300 opacity-100">✔</div>
            )}
          </Button>
        </div>
          </div>
    </div>

  );
};

export default PageCard;