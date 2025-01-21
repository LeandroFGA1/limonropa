import React, { useState,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {Button} from "@material-tailwind/react";
import { addToCart,updateProductQuantity } from '../store/cartSlice';
import { useDispatch, useSelector } from "react-redux";
import directory from '../assets/imgs/directory';


const PageCard = () => {
  const location = useLocation();
  const { product } = location.state || {}; 
  const [quantity, setQuantity] = useState(1);
  const [showCheckOut,setShowCheckOut]=useState(false);
  const [animationState, setAnimationState] = useState("default");
  const[showStock, setShowStock] = useState(product.stock);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const totalPrice = (Number(product.price) * Number(quantity));
  const isProductInCart = cartItems.some(item => item.name === product.name);
  const [selectedColor, setSelectedColor] = useState(null); 
  const [selectedSize, setSelectedSize] = useState(null);

  const colors = [
    { label: 'morado', bgColor: 'bg-purple-500', hoverColor: 'hover:bg-purple-400' },
    { label: 'amarillo', bgColor: 'bg-yellow-500', hoverColor: 'hover:bg-yellow-400' },
    { label: 'azul', bgColor: 'bg-blue-500', hoverColor: 'hover:bg-blue-400' },
    { label: 'naranja', bgColor: 'bg-orange-500', hoverColor: 'hover:bg-orange-400' },
    { label: 'gris', bgColor: 'bg-gray-500', hoverColor: 'hover:bg-gray-400' },
  ];

  const sizes = ['1', '2', '3', '4', '5'];

  const getDivColor = () => {
    if (showStock === 0) return "bg-gray-500 p-1";
    if (showStock < 5) return "bg-red-500 p-2";
    if (showStock <= 10) return "bg-yellow-500 p-1";
    return "";
};
  const handleScroll = () => {
    window.scrollBy({
      top: window.innerHeight * 0.9,
      behavior: 'smooth', 
    });
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
    setShowCheckOut(true);
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
    <div className=''>
      <div className='h-[calc(100vh-100px)]  w-full  flex flex-col lg:flex-row'>
        <div className='h-[70%] lg:h-[100%] rounded-md w-full overflow-hidden  relative lg:w-[60%] flex items-center justify-center '>
          <div className='h-[20px] z-20 bg-white/95 rounded-md px-3  text-blue-200 w-fit text-sm absolute top-0 left-0 flex items-center justify-start flex-row gap-1'>
            <Link title={`categoria: ${product.category}`}  className=' hover:underline'>{product.category}</Link>
            &gt;
            <Link title={`marca: ${product.brand}`} className=' hover:underline'>{product.brand}</Link>
          </div>
          <img src={directory.card4} alt={`ìmagen del producto ${product.name}`}  className=' sm:absolute backdrop-blur-md top-0 w-full h-full object-cover sm:object-contain sm:scale-125 md:scale-110 lg:scale-100  ' />
          <img src={directory.card4} alt={`ìmagen del producto ${product.name}`}  className=' hidden sm:block  w-full h-full object-cover' />
        </div>
        <div className='h-[30%] lg:h-[100%] lg:w-[40%] w-full gap-3 flex-wrap  flex items-center justify-center lg:flex-col '>
          <h3 className='  w-full text-3xl capitalize font-bold text-center line-clamp-4 md:line-clamp-5 lg:line-clamp-none'>{productName}  </h3>
          <div className='flex gap-2 text-sm'>
            <span>precio C/U:{product.price}</span>
            <span className={`text-sm ${getDivColor()} rounded`}>stock: {showStock >40?"+40":showStock}</span>
          </div>
          
          <Button
            className='scrollear abajo shadow-md border-[2px] bg-green-500 border-black flex items-center px-2 justify-center gap-2 text-white p-2 rounded-lg'
            onClick={handleScroll} 
          >
            Comprar
            <img
              src={directory.scrollToB}
              alt="imagen que indica que se haga scroll para abajo"
              className='h-7 animate-scrollDown'
            />
          </Button>
        </div>
      </div>
      <div className='w-full h-[calc(100vh-100px)] '>
        <div className='w-full h-full flex flex-col lg:flex-row justify-between lg:gap-5 items-center'>
          <div className='px-10 mt-3'>
            <div className='cantidadcoso min-w-[250px] lg:flex hidden gap-4 flex-wrap lg:flex-col items-center justify-center'>
              <h3 className=' text-2xl'>unidades</h3>
              <div className='cantidad flex flex-row items-center '>

              <Button className="p-5  hover:bg-white group  transition-all  rounded-lg" onClick={() => handleQuantityChange(-1)}>
                <div className='h-[3px] bg-white group-hover:bg-black w-5'></div>
                <div className='h-[3px] w-5 bg-transparent'></div>
              </Button>

              <span className="mx-4 text-3xl font-bold">{quantity}</span>

              <Button className="p-5 hover:bg-white group  transition-all rounded-lg" onClick={() => handleQuantityChange(1)}>
                <div className='h-[3px] bg-white w-5 group-hover:bg-black'></div>
                <div className='h-[3px] bg-white w-5 group-hover:bg-black rotate-90 -translate-y-[2px]'></div>
              </Button>
            </div>
            <div className='precio'>
              <span className="text-4xl font-bold">Total:${totalPrice}</span>
            </div>
          </div>
          </div>
          
          <div className='seleccionador flex flex-col sm:flex-row lg:flex-col lg:min-w-[300px] gap-3 sm:gap-10'>
      
      {/* Selector de color */}
      <div className='flex flex-col gap-3 border-t-[3px] rounded items-center justify-center'>
        <h2 className='font-bold text-2xl  capitalize'>Selecciona un color</h2>
        <ul className='flex items-center  justify-center flex-wrap gap-2 max-w-[300px]'>
          {colors.map((color, index) => (
            <li
              key={index}
              className={`rounded-full ${color.bgColor} ${color.hoverColor} border-[4px]  border-black w-10 h-10 hover:border-white transition-all`}
              aria-label={color.label}
              onClick={() => setSelectedColor(color.bgColor)} 
            />
          ))}
        </ul>
        <div
          className={`text-sm p-2 rounded-md ${
            selectedColor ? selectedColor : 'bg-transparent'
          } text-black`}
        >
          {selectedColor
            ? `Has seleccionado: ${colors.find((c) => c.bgColor === selectedColor)?.label}`
            : 'No has seleccionado ningún color'}
        </div>
      </div>

      {/* Selector de talle */}
      <div className='flex flex-col gap-2 border-t-[3px] rounded items-center justify-center'>
        <h2 className='font-bold text-2xl capitalize'>Selecciona un talle</h2>
        <ul className='flex items-center justify-center flex-wrap gap-2 max-w-[300px] text-3xl'>
          {sizes.map((size, index) => (
            <li
              key={index}
              className='bg-gray-500 hover:bg-white hover:border-black w-10 h-10 border-[2px] rounded-md flex items-center justify-center'
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </li>
          ))}
        </ul>
        <div className={`'text-sm' ${selectedSize?"text-lg font-bold":""}`}>
          {selectedSize ? `Has seleccionado: Talle ${selectedSize}` : 'No has seleccionado ningún talle'}
        </div>
      </div>
    </div>






          <div className='cantidadcoso  lg:hidden flex gap-4 flex-wrap items-center justify-center'>
              <h3 className=' text-2xl'>unidades</h3>
              <div className='cantidad flex flex-row items-center '>

              <Button className="p-5 hover:bg-white group  transition-all  rounded-lg" onClick={() => handleQuantityChange(-1)}>
                <div className='h-[3px] bg-white group-hover:bg-black w-5'></div>
                <div className='h-[3px] w-5 bg-transparent'></div>
              </Button>

              <span className="mx-4 text-3xl font-bold">{quantity}</span>

              <Button className="p-5 hover:bg-white group  transition-all rounded-lg" onClick={() => handleQuantityChange(1)}>
                <div className='h-[3px] bg-white w-5 group-hover:bg-black'></div>
                <div className='h-[3px] bg-white w-5 group-hover:bg-black rotate-90 -translate-y-[2px]'></div>
              </Button>
            </div>
            <div className='precio'>
              <span className="text-4xl font-bold">Total:${totalPrice}</span>
            </div>
          </div>
          

          <div className='botonera  flex flex-col gap-2 w-full items-center justify-center lg:max-w-[300px]'>
            <Button className="bg-green-500 border-[2px] border-black w-[70%] h-10 text-white relative overflow-hidden"
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
            <Button 
            className='bg-green-500 border-[2px] border-black w-[70%] h-10 text-white relative overflow-hidden flex items-center justify-center'
            disabled={!showCheckOut}>
              <Link to={"/checkout"} className='flex flex-row w-full h-full items-center justify-center gap-2'>
                Ir al carrito
                <img src={directory.cart} alt="carrito de compra" className="h-6 w-6" />
              </Link>
              
            </Button>
          </div>
          
        </div>
      </div>
    </div>

  );
};

export default PageCard;