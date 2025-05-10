import React, { useEffect, useRef, useState } from 'react'

const AnimatedPercentage = ({ target }) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [startCool, setStartCool] = useState(false)
  const [isBold, setIsBold] = useState(true)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.6 }
    )

    if (elementRef.current) observer.observe(elementRef.current)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let start = 0
    const end = parseInt(target, 10)
    const duration = 3000 // 3s para contar
    const incrementTime = Math.floor(duration / end)

    const counter = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= end) {
        clearInterval(counter)
        // Inicia la animación de enfriado justo después del conteo
        setTimeout(() => {
          setStartCool(true)
          // Quitar bold al finalizar animación (después de 3s)
          setTimeout(() => {
            setIsBold(false)
          }, 3000)
        }, 100)
      }
    }, incrementTime)

    return () => clearInterval(counter)
  }, [isVisible, target])

  return (
    <span
      ref={elementRef}
      className={`transition-colors duration-[3000ms] 
        ${isBold ? 'font-bold' : 'font-normal'} 
        ${startCool ? 'text-black animate-heat' : 'text-crimson'}
      `}
    >
      {isVisible ? `${count}%` : '00%'}
    </span>
  )
}

export default AnimatedPercentage
