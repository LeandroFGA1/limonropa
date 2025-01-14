import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import directory from "../assets/imgs/directory";
gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const componentRef = useRef(null);
  const sliderRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".contenido");

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sliderRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + sliderRef.current.offsetWidth * 3,
        },
      });
      

    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
<div ref={componentRef} className="h-fit w-full text-2xl">
  <div className="firstContainer flex flex-col justify-center items-center h-[100vh] bg-main2" 
  role="region" 
  aria-labelledby="mision-vision-title">
    <h1 className="text-3xl" 
      id="mision-vision-title" 
      title="Misión y visión">Misión y visión
    </h1>
  </div>
  <div ref={sliderRef}  
    className="horizontal-prueba w-full flex overflow-x-hidden" 
    aria-label="Slider de Misión y Visión"
    id="horizontal">

    <div  className="contenido w-full h-[100vh] bg-main3 shrink-0 flex flex-col gap-10 items-center justify-center" 
      aria-labelledby="mision-titulo" 
      aria-describedby="mision-descripcion"
      role="banner">
      <h2 id="mision-titulo" title="Misíon" className="text-3xl font-bold">Misión</h2>
      <p id="mision-descripcion" className=" w-[90%] text-center">Nuestra misión se centra en construir valor circular y sustentable junto a nuestros clientes con el fin alargar la vida útil de los desechos textiles.</p>
    </div>

    <div className="contenido w-full h-[100vh]  bg-main shrink-0 flex flex-col gap-10 items-center justify-center" 
      aria-labelledby="vision-titulo" 
      aria-describedby="vision-descripcion">
      <h2 id="vision-titulo" className="text-3xl font-bold">Visión</h2>
      <p id="vision-descripcion" className=" w-[90%] text-center">Nuestra visión es generar relaciones de confianza a largo plazo con nuestros clientes a través de un desarrollo económico sostenible.</p>
    </div>

    <div className="contenido w-full h-[100vh] bg-main2 shrink-0 flex flex-col gap-10 items-center justify-center"           
      aria-labelledby="ceo-titulo" 
      aria-describedby="ceo-descripcion">
      <img src={directory.tulioCEO} alt="imagen del ceo" className=" h-40 rounded-md" />
      <h3 id="ceo-titulo " className="text-3xl font-bold text-center">CEO: Pepito Pereira</h3>
      <p id="ceo-descripcion" className=" w-[90%] text-center">“Queremos ser un aporte concreto a la disminución de las toneladas de ropa desechadas en vertederos”.</p>
    </div>

    <div className="contenido w-full h-[100vh] bg-main3 shrink-0 flex flex-col gap-10 items-center justify-center"   
      aria-labelledby="por-que-reciclar-titulo" 
      aria-describedby="por-que-reciclar-descripcion">
      <h3 id="por-que-reciclar-titulo" className="text-3xl font-bold text-center">¿Por qué reciclar ropa?</h3>
      <p id="por-que-reciclar-descripcion" className=" w-[90%] text-center">Según estadísticas el 73% de la ropa termina en vertederos o rellenos sanitarios y a la actualidad solo un 1% se recicla.</p>
    </div>

  </div>
  <div className="lastContainer flex flex-col gap-10 items-center justify-center h-[100vh] bg-main2" 
      role="region" 
      aria-labelledby="por-que-reciclar-titulo-2" 
      aria-describedby="por-que-reciclar-descripcion-2">
    <h3 id="por-que-reciclar-titulo-2" className="text-3xl font-bold text-center">¿Por qué reciclar ropa?</h3>
    <p id="por-que-reciclar-descripcion-2" className=" w-[90%] text-center">La producción mundial de ropa y calzado produce el 8% de los gases de efecto invernadero y cada segundo se entierra o quema la fibra textil equivalente a un camión de basura.</p>
  </div>
</div>
  );
};

export default AboutUs;
