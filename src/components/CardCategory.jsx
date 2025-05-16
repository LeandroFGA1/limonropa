"use client"

import React from "react"
import directory from "../assets/imgs/directory"
import { Button } from "@material-tailwind/react"

const CardCategory = ({ title, image }) => {
  return (
    <div className="w-[40vw] min-w-[270px] h-[80vh] bg-main3/30 backdrop-blur-xl rounded-xl shadow-2xl relative group overflow-hidden animate-fadeInUp transition-all duration-500">
      <div className="w-full h-full">
        <img
          src={directory[image]}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="absolute z-20 top-0 w-full h-full flex items-center justify-center bg-gradient-to-b from-transparent to-black/60 group-hover:bg-black/70 transition-all duration-500">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white text-center bg-main3/50 group-hover:bg-main3 px-4 py-2 rounded-md relative transition-all duration-500">
          {title}
          <span className="absolute top-0 left-0 w-full h-full">
            <span className="absolute top-0 left-0 w-0 h-[3px] bg-white group-hover:animate-drawTop"></span>
            <span className="absolute top-0 left-0 w-[3px] h-0 bg-white group-hover:animate-drawSides"></span>
            <span className="absolute top-0 right-0 w-[3px] h-0 bg-white group-hover:animate-drawSides"></span>
            <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-white group-hover:animate-drawBottom"></span>
            <span className="absolute bottom-0 right-0 w-0 h-[3px] bg-white group-hover:animate-drawBottom"></span>
          </span>
        </h2>
      </div>

      <div className="absolute bottom-0 z-20 w-full h-full flex items-end justify-center pb-10">
        <Button
          role="button"
          aria-label="Ir a la categoría"
          color="white"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:duration-1000 text-main3 font-bold px-6 py-3 rounded-full hover:bg-main hover:text-white hover:scale-105 active:bg-main3 active:text-white shadow-md z-10"
        >
          Ir a categoría
        </Button>
      </div>
    </div>
  )
}

export default CardCategory
