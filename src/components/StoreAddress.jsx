"use client"

import React from "react"
import { Card, CardBody, Typography, Button } from "@material-tailwind/react"

const StoreAddress = () => {
  return (
    <Card className="w-[95%] sm:w-[80%] mx-auto mt-12 bg-main/30 backdrop-blur-lg shadow-2xl rounded-xl animate-fadeInUp">
      <CardBody className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Mapa */}
        <div className="w-full md:w-1/2">
          <div className="w-full h-[300px] rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3327.148651504635!2d-70.63851989999999!3d-33.4975094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662dab0a69e6a87%3A0x7be938080ebbb239!2sNuremberg%20482%2C%208960131%20Santiago%2C%20San%20Joaqu%C3%ADn%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1ses!2sar!4v1744049437453!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Datos */}
        <div className="w-full md:w-1/2 text-center md:text-left flex flex-col gap-4">
          <Typography variant="h4" className="font-extrabold text-main3">
            Dirección
          </Typography>

          <Typography variant="paragraph" className="text-main3 text-lg">
            Nuremberg 482, 8960131 Santiago, San Joaquín, Región Metropolitana
          </Typography>

          <Typography variant="paragraph" className="text-main3 text-lg">
            <span className="font-semibold">Horario:</span> Lunes a Viernes de 9:30 a 17:30
          </Typography>

          <Typography variant="paragraph" className="text-main3 text-lg">
            <span className="font-semibold">Teléfono:</span> +56 9 8457 7726
          </Typography>

          <a
            href="https://maps.app.goo.gl/BVCSqZCuFzny2CnK7"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block"
          >
            <Button
              color="green"
              className="px-6 py-2 text-lg font-medium text-white rounded-full hover:bg-green-700 transition-all duration-300"
            >
              Ver en Google Maps
            </Button>
          </a>
        </div>
      </CardBody>
    </Card>
  )
}

export default StoreAddress
