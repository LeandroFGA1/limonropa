import React, { useState } from 'react';
import { Carousel, Typography,Button } from "@material-tailwind/react";
import directory from '../assets/imgs/directory';
import { Link } from 'react-router-dom';
directory
const CarouselBanner = () => {
    const [isHover, setIsHover] = useState(true); 

    return (
        <Carousel
            autoplay={isHover} 
            autoplayDelay={5000} 
            loop
            className=" carrusel"
            navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-10 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                        <span
                            key={i}
                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                            }`}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
            )}
        >
            <div className='relative h-full w-full overflow-hidden'>
                <img
                    src={directory.banner1}
                    alt="imagen 1"
                    className="h-full w-full object-cover"
                    
                />
                <Link to={"/store"} className=' absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center transition-all duration-500 hover:bg-black/70 text-center'
                    onMouseEnter={() => setIsHover(false)} 
                    onMouseLeave={() => setIsHover(true)} 
                >
                    <h1 className=' text-6xl sm:text-8xl capitalize font-bold text-white text-center'  style={{ textShadow: '2px 2px 4px black' }}>Gran Apertura</h1>
                    <p className='text-3xl sm:text-4xl capitalize font-bold text-white' style={{ textShadow: '2px 2px 4px black' }}>Descuentos de hasta el <strong className='bg-black px-2 rounded-lg bg-gradient-to-tr from-main to-main2 relative'>50%</strong> </p>
                    
                </Link>
                
            </div>
            <div className='relative h-full w-full overflow-hidden'>
                <img
                    src={directory.banner2}
                    alt="imagen 2"
                    className="h-full w-full object-cover"
                    
                />
                <div  className=' group absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center transition-all duration-500 hover:bg-black/70 gap-2 group-hover:gap-6 text-center'
                    onMouseEnter={() => setIsHover(false)} 
                    onMouseLeave={() => setIsHover(true)} 
                >
                    <h2 className='text-4xl sm:text-7xl capitalize font-bold text-white text-center items-center justify-center flex flex-col gap-2 group-hover:gap-6 group-hover:mb-6 transition-all'  style={{ textShadow: '2px 2px 4px black' }}>Compromiso ambiental <strong className=' uppercase group-hover:text-main group-hover:bg-main3 transition-all w-fit p-1 sm:p-4 rounded-md'> total</strong></h2>
                    <p className='text-3xl sm:text-4xl capitalize font-bold text-white' style={{ textShadow: '2px 2px 4px black' }}>Descubre mas sobre nuestra empresa <Link to={"/aboutus"} className='bg-black group-hover:animate-pulse p-2 rounded-lg text-black group-hover:text-white transition-all blur group-hover:blur-0  relative '>AQUI</Link> </p>
                    
                </div>
                
            </div>
            <div className='relative h-full w-full overflow-hidden'>
                <img
                    src={directory.banner3}
                    alt="imagen 3"
                    className="h-full w-full object-cover"
                    
                />
                <div  className=' group absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center transition-all duration-500 hover:bg-black/70 gap-2 group-hover:gap-6 text-white text-center'
                    onMouseEnter={() => setIsHover(false)} 
                    onMouseLeave={() => setIsHover(true)} 
                >
                    <div className='flex flex-col items-center sm:flex-row text-7xl  uppercase font-bold text-white' style={{ textShadow: '2px 2px 4px black' }}>
                        <h2 className=' bg-white/30 backdrop-blur-lg py-4 w-fit transition-all'>¡bene</h2>
                        <img src={directory.logo} alt="logo" className='h-0 group-hover:h-28 delay-300 transition-all   hover:animate-hithere z-20' />
                        <g2 className='bg-white/30 backdrop-blur-lg py-4  w-fit  transition-all'>ficios!</g2>
                    </div>
                    <p className='text-3xl capitalize font-bold'style={{ textShadow: '2px 2px 4px black' }}>registrate y descubre beneficios unicos</p>
                </div>
                
            </div>
            <img
                src={directory.banner3}
                className="h-full w-full object-cover"
                alt=''
                onMouseEnter={() => setIsHover(false)}
                onMouseLeave={() => setIsHover(true)}
            />
            
            <div className="relative h-full w-full">
            <img
            src={directory.banner4}
            alt="image 1"
            className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/35">
            <div className="w-3/4 text-center md:w-2/4">
                <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                >
                Lorem ipsum dolor 
                </Typography>
                <Typography
                variant="lead"
                color="white"
                className="mb-12 opacity-80"
                >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam repellendus officiis veniam unde hic, nostrum, voluptatum quaerat tenetur nulla, quidem consectetur sapiente ullam cum. Pariatur provident facilis necessitatibus voluptate quae?
                </Typography>
                <div className="flex justify-center gap-2">
                <Button  color="white">
                    Lorem 
                </Button>
                <Button  color="white" variant="text">
                    ipsum 
                </Button>
                </div>
            </div>
            </div>
        </div>


        </Carousel>
    );
};

export default CarouselBanner;
