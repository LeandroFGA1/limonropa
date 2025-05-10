import React, { useState } from 'react';
import { Carousel, Card, CardBody } from "@material-tailwind/react";
import directory from '../assets/imgs/directory';
import textGeneral from '../text/textGeneral';

const AboutUs = () => {
  const [isHover, setIsHover] = useState(true);

  return (
    <div className="bg-gray-200">
      <h1 className="text-center capitalize text-4xl font-bold pt-10 mb-10  ">
        {textGeneral.aboutUs.title}
      </h1>

      {/* Carrusel: Misión y Visión */}
      <div className='h-4 w-full bg-gradient-to-t from-black via-black to-transparent'></div>
      <Carousel
        autoplay={isHover}
        autoplayDelay={8000}
        loop
        className=" h-[calc(100vh-100px)]"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-10 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                  activeIndex === i ? "w-8 bg-main" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {/* Misión */}
        <div className="relative w-full h-[calc(100vh-100px)] overflow-hidden">
          <img
            src={directory[textGeneral.aboutUs.mision.imageDesktop]}
            alt="mision"
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-black/40 text-white flex flex-col justify-center items-center px-6 gap-4 text-center"
            onMouseEnter={() => setIsHover(false)}
            onMouseLeave={() => setIsHover(true)}
          >
            <h2 className=' text-6xl sm:text-8xl capitalize font-bold text-white text-center' style={{ textShadow: '2px 2px 4px black' }}>
              {textGeneral.aboutUs.mision.title}
            </h2>
            <p className=' w-[90%] text-base  sm:text-xl lg:text-2xl xl:text-3xl  font-bold text-white/90' style={{ textShadow: '2px 2px 4px black' }}>
              {textGeneral.aboutUs.mision.text}
            </p>
          </div>
        </div>

        {/* Visión */}
        <div className="relative w-full h-[calc(100vh-100px)] overflow-hidden">
          <img
            src={directory[textGeneral.aboutUs.vision.image]}
            alt="vision"
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-black/40 text-white flex flex-col justify-center items-center px-6 gap-4 text-center"
            onMouseEnter={() => setIsHover(false)}
            onMouseLeave={() => setIsHover(true)}
          >
            <h2 className=' text-6xl sm:text-8xl capitalize font-bold text-white text-center' style={{ textShadow: '2px 2px 4px black' }}>
              {textGeneral.aboutUs.vision.title}
            </h2>
            <p className=' w-[90%] text-base  sm:text-xl lg:text-2xl xl:text-3xl  font-bold text-white/90' style={{ textShadow: '2px 2px 4px black' }}>
              {textGeneral.aboutUs.vision.text}
            </p>
          </div>
        </div>
      </Carousel>
      <div className='h-4 w-full bg-gradient-to-b from-black via-black to-transparent'></div>

      {/* Carrusel: ¿Por qué reciclar? */}
      <h2 className="text-center capitalize text-3xl sm:text-4xl font-bold pt-12 mb-12">
        {textGeneral.aboutUs.porque.title}
      </h2>
      <div className='h-4 w-full bg-gradient-to-t from-black via-black to-transparent'></div>
      <Carousel
        autoplay={isHover}
        autoplayDelay={10000}
        loop
        className=" h-[calc(100vh-100px)]"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-10 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                  activeIndex === i ? "w-8 bg-main" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {textGeneral.aboutUs.porque.items.map((item, idx) => (
          <div key={idx} className="relative w-full h-[calc(100vh-100px)] overflow-hidden">
            <img
              src={directory[item.image]}
              alt={`porque-${idx + 1}`}
              className="h-full w-full object-cover"
            />
            <div
              className="absolute inset-0 bg-black/50 text-white flex flex-col justify-center items-center px-6 gap-4 text-center"
              onMouseEnter={() => setIsHover(false)}
              onMouseLeave={() => setIsHover(true)}
            >
              <p className=' w-[90%] text-base  sm:text-xl lg:text-2xl xl:text-3xl  font-bold text-white/90' style={{ textShadow: '2px 2px 4px black' }}>
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
      <div className='h-4 w-full bg-gradient-to-b from-black via-black to-transparent'></div>

      {/* Sección: Nuestro Plan */}
      <section id="nuestro-plan" className="pb-16 ">
        <Card className="shadow-lg p-6 text-center w-[90%] mx-auto bg-main2/30">
          <CardBody>
            <ul className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl flex items-center flex-col justify-between gap-10">
              {textGeneral.aboutUs.nuestroPlan.items.map((item, idx) => (
                <li key={idx} className="flex flex-col items-center justify-center gap-5 ">
                  <h2 className="font-semibold text-2xl sm:text-3xl w-[90%]">{item.title}</h2>
                  {item.text && (
                    <p className="text-lg">{item.text}</p>
                  )}
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </section>

    </div>
  );
};

export default AboutUs;
