import React from 'react'
import { useState } from 'react';
const ColorComp = () => {
    const [selectedColor, setSelectedColor] = useState(null);
    const colors = [
        { label: 'morado', bgColor: 'bg-purple-500', hoverColor: 'hover:bg-purple-400' },
        { label: 'amarillo', bgColor: 'bg-yellow-500', hoverColor: 'hover:bg-yellow-400' },
        { label: 'azul', bgColor: 'bg-blue-500', hoverColor: 'hover:bg-blue-400' },
        { label: 'naranja', bgColor: 'bg-orange-500', hoverColor: 'hover:bg-orange-400' },
        { label: 'gris', bgColor: 'bg-gray-500', hoverColor: 'hover:bg-gray-400' },
        ];
    return (
    <div className=' flex flex-col gap-3  rounded px-[10%] xl:flex-row xl:flex-wrap xl:items-center '>
        <h2 className='font-bold text-2xl  capitalize'>Selecciona un color</h2>
        <ul className='flex items-center  justify-start flex-wrap gap-2 max-w-[300px] '>
            {colors.map((color, index) => (
            <li
                key={index}
                className={`rounded-full ${color.bgColor} ${color.hoverColor} border-[4px]  border-black w-10 h-10 hover:border-white transition-all`}
                aria-label={color.label}
                onClick={() => setSelectedColor(color.bgColor)} 
            />
            ))}
        </ul>
        <div
            className={`text-sm p-2  rounded-md ${
            selectedColor ? selectedColor : 'bg-transparent'
            } text-black`}
        >
            {selectedColor
                ? `Has seleccionado: ${colors.find((c) => c.bgColor === selectedColor)?.label}`
                : 'No has seleccionado ningún color'}
        </div>
    </div>
)
}

export default ColorComp