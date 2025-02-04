import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Tooltip } from '@material-tailwind/react';
import DATOS_SERVICES from "../assets/data/data.json"

const SERVICE_URL = "https://ecosustentable.azurewebsites.net/api/servicios/";

const Services = () => {

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await axios.get(SERVICE_URL);
//         console.log("Datos recibidos:", response.data.results);
//         setServices(response.data.results);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       }
//     };

//     fetchServices();
//   }, []);

const [services, setServices] = useState(DATOS_SERVICES); // Asigna directamente el array al estado
const coste = 9000;
const [openTooltip, setOpenTooltip] = useState(null);

    const handleButtonClick = (codigoProducto) => {
        setOpenTooltip(codigoProducto);
        setTimeout(() => setOpenTooltip(null), 2000); // Ocultar tooltip después de 2 segundos
    };

return (
    <div className="min-h-[calc(100vh-100px)] w-full h-fit bg-main2">
        <h1 className="">Servicios</h1>
        <ul className=" w-full h-fit flex flex-col items-center justify-center gap-3 ">
        {services.map((service) => (
            <li key={service.codigo_producto} className="bg-main2 shadow-lg border-[1px] border-black/70 rounded-lg w-[90%] h-fit p-2 flex flex-col lg:flex-row items-center justify-around flex-wrap gap-4">
                <span className=' capitalize'>{service.nombre_producto.replace(/_/g, ' ')} </span>
                <span className=' first-letter:uppercase'>{service.descripcion_producto}</span>
                <span className=' capitalize'>{service.categorias_nombres.join(', ').replace(/_/g, ' ')}</span>
                <span>coste: {coste}</span>
                <Tooltip
                    content="Proximamente disponible"
                    open={openTooltip === service.codigo_producto}
                    placement="top"
                >
                    <Button
                    className="capitalize bg-main border-[1px] border-black text-black"
                    onClick={() => handleButtonClick(service.codigo_producto)}
                    >
                    adquirir servicio
                    </Button>
                </Tooltip>
            </li>
        ))}
        </ul>
    </div>
    );
};

export default Services;
