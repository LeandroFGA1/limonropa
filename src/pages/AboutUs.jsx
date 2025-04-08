import React, { useEffect, useRef, useState } from 'react';
import directory from '../assets/imgs/directory';
import { Card, CardBody } from "@material-tailwind/react";
import { useLocation } from 'react-router-dom';
import textGeneral from '../text/textGeneral';

const AboutUs = () => {
  const liRefs = useRef([]);
  const sectionsRef = useRef([]);
  const [visibleItems, setVisibleItems] = useState({});
  const [visibleSections, setVisibleSections] = useState({});
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#nuestro-plan") {
      const element = document.getElementById("nuestro-plan");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const updated = {};
      entries.forEach((entry) => {
        updated[entry.target.id] = entry.isIntersecting;
      });
      setVisibleSections((prev) => ({ ...prev, ...updated }));
    }, { threshold: 0.6 });

    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const updated = {};
      entries.forEach((entry) => {
        updated[entry.target.id] = entry.isIntersecting;
      });
      setVisibleItems((prev) => ({ ...prev, ...updated }));
    }, { threshold: 1 });

    liRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className='bg-main2/30'>
      {/* Título principal */}
      <h1 className="text-center capitalize text-4xl font-bold pt-10">
        {textGeneral.aboutUs.title}
      </h1>

      {/* Misión */}
      <section
        id="mision"
        ref={(el) => (sectionsRef.current[0] = el)}
        className={`h-screen overflow-hidden`}
      >
        <div className="w-full h-full relative transition-all">
          <div className={`absolute left-[5%] w-[90%] h-[60%] z-10 top-[20%] sm:top-[25%] sm:left-[1%] rounded-lg sm:w-[50%] md:w-[40%] sm:h-[65%] md:h-[60%] transition-all sm:gap-10 duration-500 bg-white/90 sm:bg-white/30 flex flex-col items-center justify-between sm:justify-center ${visibleSections["mision"] ? "opacity-100" : "opacity-0 -translate-x-10"}`}>
            <h2 className="vision-title text-3xl lg:text-5xl font-bold capitalize">{textGeneral.aboutUs.mision.title}</h2>
            <p className="vision-text w-[96%] text-center text-lg lg:text-xl xl:text-2xl">
              {textGeneral.aboutUs.mision.text}
            </p>
          </div>
          <div className={`absolute w-[100%] h-[40%] left-[0%] sm:left-[49%] top-[0%] sm:top-[20%] rounded-lg sm:w-[50%] sm:h-[70%] transition-all duration-500 ${visibleSections["mision"] ? "opacity-100 sm:delay-300" : "delay-0 opacity-0 translate-x-10"}`}>
            <img src={directory[textGeneral.aboutUs.mision.imageDesktop]} alt="imagen del reciclaje circular" className='hidden sm:block h-full hover:scale-105 hover:animate-hithere transition-all w-full object-contain' />
            <img src={directory[textGeneral.aboutUs.mision.imageMobile]} alt="imagen mobile" className='sm:hidden' />
          </div>
        </div>
      </section>

      {/* Visión */}
      <section
        id="vision"
        ref={(el) => (sectionsRef.current[1] = el)}
        className="h-screen w-full overflow-hidden"
      >
        <div className="w-full h-full relative transition-all">
          <div className={`absolute left-[10%] w-[80%] h-[40%] z-0 sm:z-10 top-[60%] sm:top-[25%] sm:left-[1%] rounded-lg sm:w-[40%] sm:h-[60%] transition-all duration-500 bg-green-900/0 ${visibleSections["vision"] ? "opacity-100 sm:delay-300" : "delay-0 opacity-0 -translate-x-10"}`}>
            <img src={directory[textGeneral.aboutUs.vision.image]} alt="imagen del reciclaje circular" className='h-full hover:scale-105 transition-all hover:animate-hithere w-full object-contain' />
          </div>
          <div className={`absolute flex flex-col items-center gap-10 justify-center w-[90%] h-[70%] left-[5%] sm:left-[49%] top-[5%] sm:top-[20%] rounded-lg sm:w-[50%] sm:h-[70%] transition-all duration-500 bg-white/90 sm:bg-white/30 ${visibleSections["vision"] ? "opacity-100" : "opacity-0 translate-x-10"}`}>
            <h2 className="vision-title text-3xl lg:text-5xl font-bold">{textGeneral.aboutUs.vision.title}</h2>
            <p className="vision-text w-[96%] text-center text-lg sm:text-xl lg:text-2xl tracking-wider">
              {textGeneral.aboutUs.vision.text}
            </p>
          </div>
        </div>
      </section>

      {/* ¿Por qué reciclar? */}
      <section
        id="porque-reciclar"
        ref={(el) => (sectionsRef.current[2] = el)}
        className="min-h-screen h-fit w-full overflow-hidden pb-10"
      >
        <div className="h-fit w-full flex items-center justify-center flex-col transition-all">
          <h3 className="porque-title text-center capitalize text-4xl font-bold mb-10">
            {textGeneral.aboutUs.porque.title}
          </h3>
          <ul className="w-[90%] flex items-center flex-col justify-between gap-10 text-base sm:text-lg lg:text-xl xl:text-2xl">
            {textGeneral.aboutUs.porque.items.map((item, idx) => (
              <li
                key={idx}
                id={`porque-text-${idx + 1}`}
                ref={(el) => (liRefs.current[idx + 1] = el)}
                className="bg-white/30 w-full text-center h-[150px] flex items-center justify-center flex-wrap transition-all duration-500"
              >
                <div className={`transition-all duration-500 flex flex-col sm:flex-row items-center justify-center gap-4 ${
                  visibleItems[`porque-text-${idx + 1}`]
                    ? "opacity-100"
                    : "translate-x-5 -translate-y-5 opacity-0"
                }`}>
                  
                  <p className="text-center px-2">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Nuestro plan */}
      <section
        id="nuestro-plan"
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <Card className="shadow-lg p-6 text-center w-[90%] mx-auto bg-main2/30">
          <CardBody>
            <ul className="text-base sm:text-lg lg:text-xl xl:text-2xl flex items-center flex-col justify-between gap-10">
              {textGeneral.aboutUs.nuestroPlan.items.map((text, idx) => {
                const Tag = text.length < 100 ? "h2" : "p";
                const classes = text.length < 100 ? "font-semibold text-3xl w-[90%]" : "";
                return (
                  <li key={idx} className="flex flex-col items-center justify-center gap-5">
                    <Tag
                      id={`nuestro-plan-${idx + 1}`}
                      ref={(el) => (liRefs.current[idx + 4] = el)}
                      className={`transition-all duration-500 ${classes} ${
                        visibleItems[`nuestro-plan-${idx + 1}`]
                          ? "opacity-100"
                          : "translate-y-5 translate-x-5 opacity-0"
                      }`}
                    >
                      {text}
                    </Tag>
                  </li>
                );
              })}
            </ul>
          </CardBody>
        </Card>
      </section>
    </div>
  );
};

export default AboutUs;
