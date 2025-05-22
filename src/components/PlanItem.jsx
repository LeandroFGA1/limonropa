import React, { useEffect, useRef, useState } from "react"
import directory from "../assets/imgs/directory"

const PlanItem = ({ title, text, image }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [animation, setAnimation] = useState("")
  const ref = useRef(null)

  const animationClasses = [
    "animate-fadeInUp",
    "animate-fadeInLeft",
    "animate-fadeInRight",
    "animate-zoomIn",
    "animate-fadeInScale",
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setAnimation(animationClasses[Math.floor(Math.random() * animationClasses.length)])
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsExpanded(false)
      }
    }

    window.addEventListener("click", handleClickOutside)
    window.addEventListener("scroll", handleClickOutside)
    return () => {
      window.removeEventListener("click", handleClickOutside)
      window.removeEventListener("scroll", handleClickOutside)
    }
  }, [])

  const isLongText = text && text.length > 100
  const displayText = isExpanded || !isLongText ? text : text.slice(0, 100) + "..."

  return (
    <div
      ref={ref}
      className={`relative bg-main2/80 rounded-xl shadow-md overflow-hidden group transition-all duration-500 ease-in-out ${
        isExpanded ? "min-h-[20rem]" : "h-64"
      } ${isVisible ? animation : "opacity-0"}`}
    >
      {image && (
        <img
          src={directory[image] || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      )}
      <div
        className={`absolute inset-0 transition duration-300 flex flex-col justify-center items-center text-center p-4 ${
          text ? "bg-main3/30 group-hover:bg-main3/50" : "bg-main3/0 group-hover:bg-main3/50"
        }`}
      >
        {!isExpanded && (
          <h3 className="text-xl font-semibold text-white mb-2 transition-all duration-300 drop-shadow-md">
            {title}
          </h3>
        )}
        {text && (
          <p
            className={`text-white transition-all duration-300 ease-in-out drop-shadow-md ${
              isExpanded ? "text-base sm:text-lg" : "text-sm"
            }`}
          >
            {displayText}
            {isLongText && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsExpanded(!isExpanded)
                }}
                className="ml-1 text-main2 hover:text-white underline focus:outline-none transition-colors"
              >
                {isExpanded ? " Leer menos" : " Leer más"}
              </button>
            )}
          </p>
        )}
      </div>
    </div>
  )
}

export default PlanItem
