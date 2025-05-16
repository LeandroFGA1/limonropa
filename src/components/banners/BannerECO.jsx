"use client"

import React from "react"
import { Button, Card, CardBody } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import textGeneral from "../../text/textGeneral"

const BannerECO = () => {
  return (
    <Card className="bg-main3/40 backdrop-blur-lg shadow-2xl p-8 w-full mx-auto rounded-xl overflow-hidden group animate-fadeInUp">
      <CardBody className="flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white animate-fadeInUp">
          {textGeneral.bannerECO.title}
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-white/90 max-w-3xl animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
          {textGeneral.bannerECO.description}
        </p>
        <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
          <Link to="/aboutus#nuestro-plan">
            <Button
              className="
                bg-main2 text-main3 font-bold px-8 py-3 text-lg sm:text-xl rounded-full
                border-2 border-white hover:bg-white hover:text-main3 hover:scale-105
                transition-all duration-300 active:bg-main3 active:text-white
                shadow-md relative z-10
              "
            >
              {textGeneral.bannerECO.button}
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  )
}

export default BannerECO
