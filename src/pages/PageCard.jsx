import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import { addToCart, updateProductQuantity } from '../store/cartSlice';
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
  const [showStock, setShowStock] = useState(product?.stock);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const initialStock = product?.stock || 0;
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const itemInCart = cartItems.find(item => item.name === product?.name);
    if (!itemInCart) {
      setQuantity(1);
      setShowStock(initialStock);
      setAddedItem(false);
      setTooltipVisible(false); 
    }
  }, [cartItems, initialStock, product?.name]);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    setAddedItem(false);
    setTooltipVisible(false); 
  };

  const handleAddCart = (newAdded) => {
    if (newAdded) {
      const existingItem = cartItems.find(item => item.name === product.name);
      const newTotalQuantity = (existingItem?.quantity || 0) + quantity;
      const quantityToAdd = newTotalQuantity > 10 ? 10 - (existingItem?.quantity || 0) : quantity;

      if (quantityToAdd > 0) {
        const productToAdd = {
          ...product,
          quantity: quantityToAdd,
          productID: product.productID,
          id: product.id
        };
        
        dispatch(addToCart(productToAdd));
        setAddedItem(true);
      } else {
        setTooltipVisible(true); 
      }
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
        <HeroProduct productID={product.id} />
        <div className='min-h-[calc(100vh-100px)] h-fit w-[100%] lg:w-[50%] flex flex-wrap flex-col lg:justify-between lg:py-10 '>
          <div className="header-page px-[10%] w-full">
            <h1 className='text-xl uppercase line-clamp-3'>{productName}</h1>
            <span className='text-sm uppercase line-clamp-2'>{product.description}</span>
            <span className="text-sm">
              costo por unidad: ${Number(product.price).toLocaleString('de-DE')}
            </span>

          </div>
          <div className='divisor lg:border-t-[2px] rounded lg:w-[90%] lg:mx-[5%] '></div>
          <Size />
          <ColorComp />
          <QuantityComp
            productStock={showStock}
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
          
          {tooltipVisible && (
            <div className="fixed top-4 right-4 z-50 bg-red-600 text-white px-4 py-2 rounded shadow-md">
              ¡Has alcanzado el límite de 10 unidades en este producto!
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PageCard;
