import React from 'react'
import { useState } from 'react';
const Size = () => {
    const sizes = ['1', '2', '3', '4', '5'];
    const [selectedSize, setSelectedSize] = useState(null);
    return (
        <div className=' flex flex-col gap-2 justify-center  w-full px-[10%] xl:flex-row xl:flex-wrap xl:items-center '>
                <h2 className='font-normal text-xl capitalize '>Selecciona un talle</h2>
                <ul className='flex items-center justify-start flex-wrap gap-2 max-w-[300px] text-2xl '>
                {sizes.map((size, index) => (
                    <li
                    key={index}
                    className='bg-gray-500 hover:bg-white hover:border-black w-8 h-8 border-[2px] rounded-md flex items-center justify-center'
                    onClick={() => setSelectedSize(size)}
                    >
                    {size}
                    </li>
                ))}
                </ul>
                <div className={`'text-sm w-full xl:w-fit min-h-8    ' ${selectedSize?"text-lg font-bold":""}`}>
                {selectedSize ? `Has seleccionado: Talle ${selectedSize}` : 'No has seleccionado ningún talle'}
                </div>
            </div>
    )
}

export default Size