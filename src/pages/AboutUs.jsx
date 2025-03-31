import React, { useEffect, useRef, useState } from 'react';
import directory from '../assets/imgs/directory';
import { Card, CardBody, Button } from "@material-tailwind/react";
import { useLocation } from 'react-router-dom';
const AboutUs = () => {
  const liRefs = useRef([]); // Referencias de los <li>
  const [visibleItems, setVisibleItems] = useState({});
  const sectionsRef = useRef([]); // Referencias de las secciones
  const [visibleSections, setVisibleSections] = useState({}); // Estado para manejar la visibilidad
  

// Dentro del componente AboutUs
const location = useLocation();
useEffect(() => {
  if(location.hash === "#nuestro-plan"){
    const element = document.getElementById("nuestro-plan");
    if(element) element.scrollIntoView({ behavior: "smooth" });
  }
}, [location]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const updatedVisibility = {};
        entries.forEach((entry) => {
          updatedVisibility[entry.target.id] = entry.isIntersecting;
        });
        setVisibleSections((prev) => ({ ...prev, ...updatedVisibility }));
      },
      { threshold: 0.6 } // Detectar cuando el 30% del padre sea visible
    );

    // Agregar cada sección al observer
    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    // Limpieza
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const updatedVisibility = {};
        entries.forEach((entry) => {
          updatedVisibility[entry.target.id] = entry.isIntersecting;
        });
        setVisibleItems((prev) => ({ ...prev, ...updatedVisibility }));
      },
      { threshold: 1 } // Detectar cuando el 30% del elemento es visible
    );

    // Observar cada <li>
    liRefs.current.forEach((li) => {
      if (li) observer.observe(li);
    });

    // Limpieza
    return () => observer.disconnect();
  }, []);

  return (
    <div className='bg-main2/30'>
      <h1 className="text-center capitalize text-4xl font-bold pt-10">Misión y visión</h1>
      <section
        id="mision"
        ref={(el) => (sectionsRef.current[0] = el)}
        className={`h-screen overflow-hidden`}
      >
        <div
          className={`w-full h-full relative  transition-all `}
        >
          <div className={`absolute left-[5%] w-[90%] h-[60%] z-10 top-[20%] sm:top-[25%] sm:left-[1%] rounded-lg sm:w-[50%] md:w-[40%] sm:h-[65%] md:h-[60%] transition-all sm:gap-10 duration-500 bg-white/90 sm:bg-white/30 flex flex-col items-center justify-between sm:justify-center
            ${visibleSections["mision"]?" opacity-100":" opacity-0 -translate-x-10 "}
            `}>
              <h2 className="vision-title text-3xl lg:text-5xl font-bold capitalize">misión</h2>
              <p className="vision-text w-[96%] text-center text-lg lg:text-xl xl:text-2xl">
              Nuestra misión se centra en construir valor circular y sustentable junto a nuestros clientes con el fin alargar la vida útil de los desechos textiles, recuperar o reciclar mediante procesos que preservan el medioambiente mediante la mitigación de los efectos adversos de los desechos textiles.
            </p>
          </div>
          <div className={`absolute  w-[100%] h-[40%] left-[0%] sm:left-[49%] top-[0%] sm:top-[20%]  rounded-lg sm:w-[50%] sm:h-[70%] transition-all duration-500 
            ${visibleSections["mision"]?" opacity-100 sm:delay-300  ":" delay-0 opacity-0 translate-x-10"}
            `}>
              <img src={directory.icon1} alt="imagen del reciclaje circular" className=' hidden sm:block h-full hover:scale-105 hover:animate-hithere transition-all w-full object-contain' />
              <img src={directory.card2} alt="pruebaCAMBIAR" className='sm:hidden' />
          </div>
        </div>
      </section>

      <section
        id="vision"
        ref={(el) => (sectionsRef.current[1] = el)}
        className={`h-screen w-full  overflow-hidden`}
      >
        
        <div
          className={`w-full h-full relative  transition-all `}
        >
          <div className={`absolute left-[10%] w-[80%] h-[40%] z-0 sm:z-10 top-[60%] sm:top-[25%] sm:left-[1%] rounded-lg sm:w-[40%] sm:h-[60%] transition-all duration-500 bg-green-900/0
            ${visibleSections["vision"]?" opacity-100 sm:delay-300  ":" delay-0 opacity-0 -translate-x-10"}
            `}>
              <img src={directory.About1} alt="imagen del reciclaje circular" className='h-full hover:scale-105 transition-all hover:animate-hithere w-full object-contain' />
          </div>
          <div className={`absolute flex flex-col items-center gap-10 justify-center w-[90%] h-[70%] left-[5%] sm:left-[49%] top-[5%] sm:top-[20%]  rounded-lg sm:w-[50%] sm:h-[70%] transition-all duration-500 bg-white/90 sm:bg-white/30
            ${visibleSections["vision"]?" opacity-100":" opacity-0 translate-x-10 "}
            `}>
              <h2 className="vision-title text-3xl lg:text-5xl font-bold">Visión</h2>
              <p className="vision-text w-[96%] text-center text-lg sm:text-xl lg:text-2xl tracking-wider">
                Nuestra visión es ser reconocidos como la empresa líder en reciclaje textil a nivel industrial, generando relaciones de confianza a largo plazo con nuestros clientes a través de un desarrollo económico sostenible.
            </p>
          </div>
          
          
        </div>
      </section>
      <section
        id="porque-reciclar"
        ref={(el) => (sectionsRef.current[2] = el)}
        className={`min-h-screen h-fit w-full  overflow-hidden pb-10`}
      >
        <div
          className={`h-fit w-full  flex items-center justify-center flex-col transition-all ${
            visibleSections['porque-reciclar'] ? '': ''
          }`}
        >
          <h3 className="porque-title text-center capitalize text-4xl font-bold mb-10">¿Por qué reciclar ropa?</h3>
          <ul className='w-[90%]  flex items-center flex-col justify-between gap-10 text-base sm:text-lg lg:text-xl xl:text-2xl '>
            <li id={`porque-text-1`}
              ref={(el) => (liRefs.current[1] = el)}
              className={`porque-text-1 bg-white/30 w-full text-center h-[150px] flex items-center justify-center flex-wrap  duration-500 transition-all `}>
                <p className={` transition-all duration-500 ${
                visibleItems[`porque-text-1`] ? "opacity-100" : "translate-x-5 -translate-y-5 opacity-0"
              }`}>
                  La industria textil es responsable <strong>del 10%</strong> de las emisiones de carbono a nivel global y produce alrededor del <strong> 20%</strong> de las aguas residuales mundiales.
                </p>
              
            </li>
            <li id={`porque-text-2`}
              ref={(el) => (liRefs.current[2] = el)}
              className={`porque-text-2 bg-white/30 overflow-hidden w-full text-center h-[150px] flex items-center justify-center flex-wrap  duration-500 transition-all `}>
                <p className={` transition-all duration-500 ${
                visibleItems[`porque-text-2`] ? "opacity-100" : "-translate-x-5 -translate-y-5 opacity-0"
              }`}>
                  La producción mundial de ropa y calzado produce el <strong>8%</strong> de los gases de efecto invernadero y cada segundo se entierra o quema la fibra textil equivalente a un camión de basura.
                </p>
              
            </li>
            <li id={`porque-text-3`}
              ref={(el) => (liRefs.current[3] = el)}
              className={`porque-text-3 bg-white/30 overflow-hidden w-full text-center h-[250px] sm:h-[200px] md:h-[150px] flex items-center justify-center flex-wrap   transition-all `}>
                <p className={` transition-all duration-500 ${
                visibleItems[`porque-text-3`] ? " opacity-100" : " -translate-x-5 translate-y-5 opacity-0"
              }`}>
                  Estudios indican que en Chile entre <strong>36 a 39 mil toneladas</strong> de ropa son desechadas en el desierto a lo largo de un año. Alto Hospicio, Iquique y el desierto de Atacama en Chile se han convertido en un gigantesco basurero de ropa, donde toneladas de productos textiles son desechados en el desierto.
                </p>
              
            </li>
            <li
              id={`porque-text-4`}
              ref={(el) => (liRefs.current[4] = el)}
              className={`porque-text-4 bg-white/30 overflow-hidden w-full text-center h-[150px] flex items-center justify-center flex-wrap   transition-all `}>
                <p className={` transition-all duration-500${visibleItems[`porque-text-4`] ? " opacity-100" : " translate-y-5 translate-x-5 opacity-0"
              }`}>
                  Según estadísticas el <strong>73%</strong> de la ropa termina en vertederos o rellenos sanitarios y a la actualidad solo un 1% se recicla.
                </p>
              
            </li>
          </ul>
        </div>
      </section>
      <section 
        id='nuestro-plan'
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <Card className=" shadow-lg p-6 text-center w-[90%] mx-auto bg-main2/30 ">
          <CardBody>
            <ul className='text-base sm:text-lg lg:text-xl xl:text-2xl flex items-center flex-col justify-between gap-10'>
              <li className='flex flex-col items-center justify-center gap-5'>
                <h2 id='nuestro-plan-1' ref={(el) => (liRefs.current[4] = el)} className={`nuestro-plan-1 w-[90%] font-semibold text-3xl transition-all duration-500${visibleItems[`nuestro-plan-1`] ? " opacity-100" : " translate-y-5 translate-x-5 opacity-0"
              }`}>Queremos que el planeta tenga futuro</h2>
                <p id='nuestro-plan-2' ref={(el) => (liRefs.current[5] = el)} className={`nuestro-plan-2 transition-all duration-500 ${
                visibleItems[`nuestro-plan-2`] ? " opacity-100" : " -translate-x-5 translate-y-5 opacity-0"
              }`}>Para reutilizar al máximo los recursos residuales</p>
                <p id='nuestro-plan-3' ref={(el) => (liRefs.current[6] = el)} className={`nuestro-plan-1 transition-all duration-500${visibleItems[`nuestro-plan-3`] ? " opacity-100" : " translate-y-5 translate-x-5 opacity-0"
              }`}>Hacemos realidad la Economía Circular</p>
                <p id='nuestro-plan-4' ref={(el) => (liRefs.current[7] = el)} className={`nuestro-plan-2 transition-all duration-500 ${
                visibleItems[`nuestro-plan-4`] ? " opacity-100" : " -translate-x-5 translate-y-5 opacity-0"
              }`}>
                  La principal tarea de la Economía Circular es producir a partir de residuos nuevas materias primas que vuelvan al círculo de la productividad. En Resiter cada año convertimos y transformamos más de 800 mil toneladas de residuos sólidos, permitiendo a las empresas contribuir a un planeta más sustentable y optimizar su modelo productivo. Hoy los residuos ya no son un problema, ahora son activos capaces de generar ganancias.
                </p>
              </li>
              <li className='flex flex-col items-center justify-center gap-5'>
                <h3 id='nuestro-plan-5' ref={(el) => (liRefs.current[8] = el)} className={`nuestro-plan-1 w-[90%] font-semibold text-3xl transition-all duration-500${visibleItems[`nuestro-plan-5`] ? " opacity-100" : " translate-y-5 translate-x-5 opacity-0"
              }`}>¿En qué consiste la Gestión Integral de Residuos?</h3>
                <p id='nuestro-plan-6' ref={(el) => (liRefs.current[9] = el)} className={`nuestro-plan-2 transition-all duration-500 ${
                visibleItems[`nuestro-plan-6`] ? " opacity-100" : " -translate-x-5 translate-y-5 opacity-0"
              }`}>
                  Los residuos, tanto sólidos como líquidos, son una preocupación para las empresas comprometidas con el medio ambiente. Resiter diseña planes de manejo adaptados a cada industria, combinando experiencia profesional y tecnología avanzada para lograr una óptima segregación en origen, recolección, acondicionamiento y traslado de residuos para su reutilización y revalorización.
                </p>
                <h3 id='nuestro-plan-7' ref={(el) => (liRefs.current[10] = el)} className={`nuestro-plan-1 font-semibold text-3xl transition-all duration-500${visibleItems[`nuestro-plan-7`] ? " opacity-100" : " translate-y-5 translate-x-5 opacity-0"
              }`}>Servicio de transporte de residuos</h3>
                <p id='nuestro-plan-8' ref={(el) => (liRefs.current[11] = el)} className={`nuestro-plan-2 transition-all duration-500 ${
                visibleItems[`nuestro-plan-8`] ? " opacity-100" : " -translate-x-5 translate-y-5 opacity-0"
              }`}>
                  Resiter transporta residuos asimilables a domésticos y orgánicos generados por sus clientes industriales y comerciales. Contamos con una amplia variedad de tecnologías y equipos para implementar soluciones eficientes y seguras, adaptadas a cada tipo de residuo y su logística. Todos nuestros camiones cuentan con Resolución Sanitaria y tecnología de monitoreo digital (GPS) para un control total del servicio.
                </p>
              </li>
            </ul>
        </CardBody>
      </Card>
      </section>
    </div>
  );
};

export default AboutUs;
