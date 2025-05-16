"use client"

import React from "react"
import { Card, CardBody, Typography, Button } from "@material-tailwind/react"
import textGeneral from "../text/textGeneral"

const VideoPrueba = () => {
  return (
    <div className="flex items-center justify-center px-4 py-12 w-full animate-fadeInUp">
      <Card className="w-full max-w-7xl flex flex-col lg:flex-row rounded-xl overflow-hidden shadow-2xl bg-main/30 backdrop-blur-lg">
        
        {/* Video - optimizado para formato vertical */}
        <div className="w-full lg:w-[40%] min-w-[280px] flex items-center justify-center bg-black/80">
          <div className="w-[100%] max-w-[360px] aspect-[9/16] relative">
            <iframe
              src="https://www.youtube-nocookie.com/embed/6mlrOKeahFk"
              title="Video de prueba"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
            ></iframe>
          </div>
        </div>

        {/* Texto */}
        <CardBody className="w-full lg:w-[60%] p-8 text-center lg:text-left flex flex-col items-center justify-center gap-4">
          <Typography variant="h6" className="uppercase text-main3 text-xl font-semibold">
            {textGeneral.videoPrueba.category}
          </Typography>
          <Typography variant="h4" className="text-3xl sm:text-4xl text-main3 font-bold">
            {textGeneral.videoPrueba.title}
          </Typography>
          <Typography className="text-main3 text-lg sm:text-xl font-medium">
            {textGeneral.videoPrueba.description}
          </Typography>
          <a href="#" className="inline-block mt-4">
            <Button
              variant="outlined"
              color="green"
              className="text-main3 flex items-center justify-center flex-col border-main3 hover:bg-main3 hover:text-white transition-all duration-300"
            >
              {textGeneral.videoPrueba.button}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-5 w-5 ml-2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Button>
          </a>
        </CardBody>
      </Card>
    </div>
  )
}

export default VideoPrueba
