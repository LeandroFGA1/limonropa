import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import DATOS_SERVICES from "../assets/data/data.json";

const Services = () => {
    const [services] = useState(DATOS_SERVICES);

    return (
        <div className="min-h-[calc(100vh-100px)] w-full h-fit bg-main2">
        <h1 className="">Servicios</h1>
        <ul className="w-full h-fit flex flex-col items-center justify-center gap-3">
            {services.map((service) => (
            <li key={service.codigo_producto} className="bg-main2 shadow-lg border-[1px] border-black/70 rounded-lg w-[90%] h-fit p-2 flex flex-col lg:flex-row items-center justify-around flex-wrap gap-4">
                <span className='capitalize'>{service.nombre_producto.replace(/_/g, ' ')}</span>
                <span className='first-letter:uppercase'>{service.descripcion_producto}</span>
                <span className='capitalize'>{service.categorias_nombres.join(', ').replace(/_/g, ' ')}</span>
                <Link
                to="/contact"
                state={{
                    motivo: "servicio",
                    mensaje: `Hola, quería consultar sobre el servicio ${service.nombre_producto.replace(/_/g, ' ')} de la categoría ${service.categorias_nombres.join(', ').replace(/_/g, ' ')}`
                }}
                >
                <Button className="capitalize bg-main border-[1px] border-black text-black">
                    Adquirir servicio
                </Button>
                </Link>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default Services;
