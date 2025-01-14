import React, { useState } from 'react';
import { Carousel, Typography,Button } from "@material-tailwind/react";
import directory from '../assets/imgs/directory';
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
            <img
                src={directory.banner1}
                alt="image 1"
                className="h-full w-full object-cover"
                onMouseEnter={() => setIsHover(false)} 
                onMouseLeave={() => setIsHover(true)} 
            />
            <img
                src={directory.banner2}
                alt="image 2"
                className="h-full w-full object-cover"
                onMouseEnter={() => setIsHover(false)}
                onMouseLeave={() => setIsHover(true)}
            />
            <img
                src={directory.banner3}
                className="h-full w-full object-cover"
                alt=''
                onMouseEnter={() => setIsHover(false)}
                onMouseLeave={() => setIsHover(true)}
            />
            <img
                src={directory.banner4}
                className=" h-full w-full object-cover"
                alt=''
                onMouseEnter={() => setIsHover(false)}
                onMouseLeave={() => setIsHover(true)}
            />
            
            <div className="relative h-full w-full">
            <img
            src={directory.banner3}
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
                <Button size="lg" color="white">
                    Lorem 
                </Button>
                <Button size="lg" color="white" variant="text">
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
