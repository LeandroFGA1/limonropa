"use client"

import { Button } from "@material-tailwind/react"
import React from "react"
import textGeneral from "../text/textGeneral"

const OtherBanner = () => {
  return (
    <div className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-r from-main via-main to-main3 relative overflow-hidden animate-fadeInUp rounded-xl shadow-2xl backdrop-blur-md">
      {/* Título principal */}
      <h1 className="mx-auto max-w-5xl text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-white animate-fadeInUp">
        {textGeneral.otherBanner.titlePart1}{" "}
        <span className="relative text-main2">
          {textGeneral.otherBanner.titlePart2}
        </span>{" "}
        <span className="relative inline-block text-orange-400">
          <svg
            viewBox="0 0 418 42"
            className="absolute top-2/3 left-0 h-[0.58em] w-full fill-orange-500/70"
            preserveAspectRatio="none"
          >
            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.810 23.239-7.825 27.934-10.149 28.304-14.005 .417-4.348-3.529-6-16.878-7.066Z"></path>
          </svg>
          <span className="relative z-10">{textGeneral.otherBanner.titlePart3}</span>
        </span>
      </h1>

      {/* Subtítulo */}
      <h2 className="mx-auto mt-10 max-w-2xl text-lg sm:text-xl text-white/90 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
        {textGeneral.otherBanner.subtitle}
      </h2>

      {/* Botón */}
      <Button
        color="white"
        className="
          mt-10 text-main3 font-bold text-lg px-8 py-3 rounded-full border-2 border-white
          hover:bg-main hover:text-white hover:border-main3
          active:bg-main3 active:text-white
          transition-all duration-300 shadow-md animate-fadeInUp
        "
        style={{ animationDelay: "0.4s" }}
      >
        {textGeneral.otherBanner.button}
      </Button>
    </div>
  )
}

export default OtherBanner
