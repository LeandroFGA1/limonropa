"use client"

import { useState, useEffect } from "react"
import { Carousel } from "@material-tailwind/react"
import directory from "../assets/imgs/directory"
import { Link } from "react-router-dom"
import textGeneral from "../text/textGeneral"

// Componente para los slides del carrusel con un patrón consistente
const CarouselSlide = ({
  image,
  children,
  onMouseEnter,
  onMouseLeave,
  overlayClassName = "hover:bg-black/70",
  initialAnimation = "animate-fadeInScale",
}) => (
  <div className="relative h-full w-full overflow-hidden">
    <img
      src={image || "/placeholder.svg"}
      alt="Banner image"
      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
    />
    <div
      className={`absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center transition-all duration-500 ${overlayClassName} ${initialAnimation}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  </div>
)

// Componente para títulos principales con estilo consistente
const SlideTitle = ({ children, className = "", animation = "" }) => (
  <h2
    className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl capitalize font-bold text-white text-center transition-all duration-500 ${className} ${animation}`}
    style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
  >
    {children}
  </h2>
)

// Componente para subtítulos con estilo consistente
const SlideSubtitle = ({ children, className = "", animation = "" }) => (
  <p
    className={`text-xl sm:text-2xl md:text-3xl capitalize font-medium text-white mt-4 transition-all duration-500 ${className} ${animation}`}
    style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
  >
    {children}
  </p>
)

// Modificar el componente Highlight para mantener la visibilidad en hover
const Highlight = ({ children, className = "", animation = "" }) => (
  <strong
    className={`
      bg-main3 text-main2 font-extrabold
      px-3 py-1 rounded-lg inline-block 
      transition-all duration-300 hover:scale-110
      border-2 border-main2
      shadow-md
      relative z-20
      ${className} ${animation}
    `}
  >
    {children}
  </strong>
)

// Componente para botones con estilo consistente y efecto de pestañeo al hacer clic
const SlideButton = ({ children, to, className = "", animation = "" }) => (
  <Link
    to={to}
    className={`
      px-6 py-3 
      bg-main2 text-main3 font-medium 
      rounded-full border-2 border-main 
      hover:bg-main hover:text-white hover:border-main3
      active:bg-white active:text-main3 active:scale-95 active:border-main3
      transition-all duration-300 
      inline-block relative
      ${className} ${animation}
    `}
    style={{
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }}
  >
    <span className="relative z-10">{children}</span>
    <span className="absolute inset-0 bg-white opacity-0 rounded-full active:opacity-70 active:animate-pulse transition-opacity duration-75"></span>
  </Link>
)

const CarouselBanner = () => {
  const [isAutoplay, setIsAutoplay] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [animationClass, setAnimationClass] = useState("animate-fadeInScale")

  // Efecto para animaciones basadas en el slide activo
  useEffect(() => {
    // Cambiar la animación según el slide activo
    const animations = ["animate-fadeInScale", "animate-fadeInUp", "animate-zoomIn"]
    setAnimationClass(animations[activeIndex] || animations[0])
  }, [activeIndex])

  const handleSlideChange = (index) => {
    setActiveIndex(index)
  }

  return (
    <Carousel
      autoplay={isAutoplay}
      autoplayDelay={6000}
      loop
      className="carrusel rounded-lg shadow-xl overflow-hidden"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-6 left-2/4 z-10 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1.5 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-10 bg-main2" : "w-5 bg-main2/50"
              }`}
              onClick={() => {
                setActiveIndex(i)
                handleSlideChange(i)
              }}
            />
          ))}
        </div>
      )}
      onChange={handleSlideChange}
    >
      {/* Slide 1 - Descuento */}
      <CarouselSlide
        image={directory.banner1}
        onMouseEnter={() => setIsAutoplay(false)}
        onMouseLeave={() => setIsAutoplay(true)}
        initialAnimation={animationClass}
        overlayClassName="hover:bg-main3/60 group"
      >
        <Link to="/store" className="w-full h-full flex flex-col justify-center items-center">
          <div className="transform transition-all duration-700 group-hover:scale-105 relative z-10 flex flex-col items-center justify-center">
            <SlideTitle className="group-hover:mb-6 animate-fadeInUp text-center w-full">
              {textGeneral.carousel.banner1.title}
            </SlideTitle>
            <SlideSubtitle className="group-hover:mt-8 animate-fadeInUp relative" style={{ animationDelay: "0.2s" }}>
              {textGeneral.carousel.banner1.discount.split("50%")[0]}
              <Highlight className="ml-2 group-hover:opacity-100">50%</Highlight>
            </SlideSubtitle>
            <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <SlideButton to="/store" className="animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
                Ver tienda
              </SlideButton>
            </div>
          </div>
        </Link>
      </CarouselSlide>

      {/* Slide 2 - Total */}
      <CarouselSlide
        image={directory.banner2}
        onMouseEnter={() => setIsAutoplay(false)}
        onMouseLeave={() => setIsAutoplay(true)}
        initialAnimation={animationClass}
        overlayClassName="hover:bg-main3/50"
      >
        <div className="group w-full h-full flex flex-col justify-center items-center">
          <div className="transform transition-all duration-700 group-hover:translate-y-[-10px] flex flex-col items-center justify-center">
            <SlideTitle animation="animate-fadeInLeft">
              {textGeneral.carousel.banner2.title.split("total")[0]}
              <strong
                className="uppercase group-hover:text-main2 group-hover:bg-main3 transition-all w-fit p-1 sm:p-4 rounded-md block mx-auto mt-4 animate-fadeInRight"
                style={{ animationDelay: "0.3s" }}
              >
                total
              </strong>
            </SlideTitle>
            <SlideSubtitle className="mt-8 max-w-2xl text-center animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
              {textGeneral.carousel.banner2.description}
              <Link
                to="/aboutus"
                className="bg-main3/70 group-hover:bg-main/80 p-2 rounded-lg text-main2 transition-all blur-[1px] group-hover:blur-0 inline-block ml-2 hover:scale-105"
              >
                {textGeneral.carousel.banner2.linkText}
              </Link>
            </SlideSubtitle>
          </div>
        </div>
      </CarouselSlide>

      {/* Slide 3 - Logo */}
      <CarouselSlide
        image={directory.banner3}
        onMouseEnter={() => setIsAutoplay(false)}
        onMouseLeave={() => setIsAutoplay(true)}
        initialAnimation={animationClass}
        overlayClassName="hover:bg-main3/40"
      >
        <div className="group w-full h-full flex flex-col justify-center items-center">
          <div className="flex flex-col items-center sm:flex-row text-5xl sm:text-6xl md:text-7xl uppercase font-bold text-white">
            <h2 className="bg-white/30 backdrop-blur-lg py-4 px-6 rounded-lg transition-all">
              {textGeneral.carousel.banner3.titlePart1}
            </h2>
            <img
              src={directory.logo || "/placeholder.svg"}
              alt="logo"
              className="h-0 group-hover:h-28 delay-300 transition-all hover:animate-hithere z-20"
            />
            <h2 className="bg-white/30 backdrop-blur-lg py-4 px-6 rounded-lg transition-all">
              {textGeneral.carousel.banner3.titlePart2}
            </h2>
          </div>
          <SlideSubtitle
            className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300 max-w-2xl text-center animate-fadeInUp"
            style={{ animationDelay: "0.6s" }}
          >
            {textGeneral.carousel.banner3.description}
          </SlideSubtitle>
          <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-500">
            <SlideButton to="/aboutus" className="animate-zoomIn" style={{ animationDelay: "0.8s" }}>
              Conoce más
            </SlideButton>
          </div>
        </div>
      </CarouselSlide>
    </Carousel>
  )
}

export default CarouselBanner
