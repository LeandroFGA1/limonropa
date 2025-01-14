import React from 'react';
import directory from '../assets/imgs/directory';
import { Button } from "@material-tailwind/react";

const CardCategory = () => {
    return (
        <div className='w-[40vw] h-[80vh] min-w-[270px] bg-cyan-500 rounded-lg shadow-xl relative group overflow-hidden '>
            <div className='w-full h-full'>
                <img src={directory.card3} alt="producto imagen" className='w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ' />
            </div>
            <div className='absolute z-20  bg-gradient-to-b from-transparent   to-black/70 group-hover:bg-black/60 transition-all duration-500 top-0 w-full h-full flex items-center justify-center'>
                <h2 className='capitalize text-3xl  p-4 text-pretty font-semibold relative text-white/80 group-hover:text-white bg-main3/50 group-hover:bg-main3 transition-all duration-500 rounded-md'>
                    Lorem Lorem
                    <span className='absolute top-0 left-0 w-full h-full '>
                        
                        <span className='absolute top-0 left-0 w-0 h-[3px] bg-white group-hover:animate-drawTop '></span>
                        <span className='absolute top-0 left-0 w-[3px] h-0 bg-white group-hover:animate-drawSides'></span>
                        <span className='absolute top-0 right-0 w-[3px] h-0 bg-white group-hover:animate-drawSides'></span>
                        <span className='absolute bottom-0 left-0 w-0 h-[3px] bg-white group-hover:animate-drawBottom'></span>
                    
                        <span className='absolute bottom-0 right-0 w-0 h-[3px] bg-white group-hover:animate-drawBottom'></span>
                    </span>
                </h2>
            </div>
            <div className='absolute z-20 top-0 w-full h-full flex items-end justify-center pb-10'>
                <Button size='large' color='white' className='transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:duration-1000'>
                    Ir a categoria
                </Button>
            </div>
        </div>
    );
}

export default CardCategory;
