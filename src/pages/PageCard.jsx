import React, { useState,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {Button} from "@material-tailwind/react";
import { addToCart,updateProductQuantity } from '../store/cartSlice';
import { useDispatch, useSelector } from "react-redux";
import directory from '../assets/imgs/directory';
import HeroProduct from '../components/pageCardComp/HeroProduct';
import Size from '../components/pageCardComp/Size';
import QuantityComp from '../components/pageCardComp/Quantity';

import ColorComp from '../components/pageCardComp/Color';
import BtnsComp from '../components/pageCardComp/BtnsComp';


const PageCard = () => {
  const location = useLocation();
  const { product } = location.state || {}; 
  const [quantity, setQuantity] = useState(1);
  const [addedItem, setAddedItem] = useState(false);
  const [animationState, setAnimationState] = useState("default");
  const[showStock, setShowStock] = useState(product.stock);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();


  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    setAddedItem(false);
    dispatch(updateProductQuantity({ name: product.name, quantity: newQuantity }));
  }

  const handleAddCart = (newAdded) => {
    setAddedItem(newAdded);
    if(newAdded){
      const productToAdd = { ...product, quantity };
      dispatch(addToCart(productToAdd));
    }
};


  const getDivColor = () => {
    if (showStock === 0) return "bg-gray-500 p-1";
    if (showStock < 5) return "bg-red-500 p-2";
    if (showStock <= 10) return "bg-yellow-500 p-1";
    return "";
};
  

  

  if (!product) {
    return <div>Producto no encontrado</div>;
  }
  const productName = product.name.replace(/_/g, ' ');
  return (
    <div className='bg-main2'>
      <div className='h-full w-full flex flex-col lg:flex-row flex-wrap overflow-hidden'>
        <HeroProduct/>
        <div className='  min-h-[calc(100vh-100px)] h-fit w-[100%] lg:w-[50%] flex flex-wrap flex-col lg:justify-between lg:py-10 '>
          <div className="header-page  px-[10%]  w-full">
            <h1 className='text-xl uppercase line-clamp-3'>{productName}</h1>
            <span className='text-sm'>costo por unidad: ${product.price}</span>
          </div>
          <div className='divisor lg:border-t-[2px] rounded lg:w-[90%] lg:mx-[5%] '></div>
          <Size/>
          <ColorComp/>
          <QuantityComp 
            productStock={product.stock} 
            productPrice={product.price} 
            quantity={quantity} 
            onQuantityChange={handleQuantityChange} 
          />
          <div className='divisor lg:border-t-[2px] rounded lg:w-[90%] lg:mx-[5%] py-4'></div>
          <BtnsComp 
            added={addedItem} 
            setAdded={setAddedItem} 
            onAddCartChange={handleAddCart} 
          />

        </div>
      </div>
    </div>

  );
};

export default PageCard;