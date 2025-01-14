import React from 'react'
import directory from '../assets/imgs/directory'
const Info = () => {
    return (
        <div className=' w-[90%] min-h-[200px] bg-main3/10 rounded-xl flex items-center justify-center'>
            <ul className='flex  flex-wrap items-center justify-center h-full text-sm gap '>
                <li className='flex flex-row w-[240px] gap-5 px-2 group'>
                    <img src={directory['card-bank']} alt="tarjeta de credito" 
                    className=' w-[90%] min-w-[40px] max-w-[60px] group-hover:animate-hithere'/>
                    <div>
                        <h3> <strong>Hasta 4 Cuotas sin interes</strong></h3>
                        <span>Compra en cuotas sin interes.</span>
                    </div>
                    
                </li>
                <li className='flex flex-row w-[240px] gap-5 px-2 group'>
                    <img src={directory.delivery} alt="camion de reparto" className=' w-[90%] min-w-[40px] max-w-[60px]  group-hover:animate-hithere' />
                    <div>
                        <h3> <strong>Envios</strong></h3>
                        <span>Envío rápido y seguro, directo a tu hogar.</span>
                    </div>
                    
                </li>
                <li className='flex flex-row w-[240px] gap-5 px-2 group'>
                    <img src={directory.discoun} alt="descuento"  className=' w-[90%] min-w-[40px] max-w-[60px] group-hover:animate-hithere'/>
                    <div>
                        <h3> <strong>Descuento En Transferencias</strong> </h3>
                        <span>Ahorra más al pagar con transferencia bancaria..</span>
                    </div>
                    
                </li>
                <li className='flex flex-row w-[240px] gap-5 px-2 group'>
                    <img src={directory.star} alt="una estrella de buena calificacion"  className=' w-[90%] min-w-[40px] max-w-[60px] group-hover:animate-hithere'/>
                    <div>
                        <h3> <strong>Confianza</strong></h3>
                        <span>Con excelentes reseñas, garantizamos calidad y satisfacción en cada compra.</span>
                    </div>
                    
                </li>
            </ul>
        </div>
    )
}

export default Info