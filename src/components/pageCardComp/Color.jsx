import React, { useState } from 'react';

const ColorComp = () => {
    const [selectedColor, setSelectedColor] = useState(null);
    const colors = [
        { label: 'verde reciclaje', bgColor: 'bg-green-600', hoverColor: 'hover:bg-green-500' },
        { label: 'amarillo seguridad', bgColor: 'bg-yellow-600', hoverColor: 'hover:bg-yellow-500' },
        { label: 'azul industrial', bgColor: 'bg-blue-700', hoverColor: 'hover:bg-blue-600' },
        { label: 'naranja advertencia', bgColor: 'bg-orange-600', hoverColor: 'hover:bg-orange-500' },
        { label: 'gris neutro', bgColor: 'bg-gray-700', hoverColor: 'hover:bg-gray-600' },
    ];

    return (
        <div className='flex flex-col gap-3 rounded px-[10%] xl:flex-row xl:flex-wrap xl:items-center'>

            <h2 className=' text-2xl capitalize'>Selecciona un color</h2>
            <ul className='flex items-center justify-start flex-wrap gap-2 max-w-[300px]'>
                {colors.map((color, index) => (
                    <li
                        key={index}
                        className={`rounded-full ${color.bgColor} ${color.hoverColor} w-10 h-10 cursor-pointer transition-all`}
                        aria-label={color.label}
                        onClick={() => setSelectedColor(color.bgColor)}
                    />
                ))}
            </ul>
            <div className='text-sm p-2 h-12 rounded-md flex items-center gap-2'>
                {selectedColor ? (
                    <>
                        <span>
                            Color:
                        </span>
                        <span
                            className={`w-10 h-10 rounded-full ${selectedColor}`}
                            aria-label="Selected color"
                        />
                    </>
                ) : (
                    'No has seleccionado ningún color'
                )}
            </div>
        </div>
    );
};

export default ColorComp;
