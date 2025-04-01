import React, { useState } from 'react';

const Size = () => {
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];
    const [selectedSize, setSelectedSize] = useState(null);

    return (
        <div className="flex-estohayqueactivarlo flex-col gap-4 w-full px-[10%] xl:px-20 xl:flex-row xl:flex-wrap xl:items-center hidden">
            {/* Encabezado de Tallas y Guía de tallas */}
            <div className="flex justify-between items-center w-full">
                <p className="text-base font-medium">Tallas</p>
                <div className="cursor-pointer">
                    <button className="text-sm underline hover:text-gray-600 focus:outline-none">
                        Guía de tallas
                    </button>
                </div>
            </div>

            {/* Opciones de tallas */}
            <div className="flex flex-wrap items-center gap-4 mt-2">
                {sizes.map((size, index) => (
                    <div
                        key={index}
                        role="button"
                        tabIndex="0"
                        className={`relative flex items-center justify-center cursor-pointer
                            w-12 h-12 border-[1.5px] rounded-md transition-all 
                            ${
                            selectedSize === size
                                ? 'border-black bg-black text-white'
                                : 'border-gray-400 bg-white text-black hover:border-gray-800'
                        }`}
                        onClick={() => setSelectedSize(size)}
                    >
                        <span className="text-base">{size}</span>
                    </div>
                ))}
            </div>

            {/* Texto de talla seleccionada */}
            <div className="mt-4 text-sm xl:text-base w-full">
                {selectedSize ? (
                    <p className="font-medium">
                        Talla: <span className="font-bold">{selectedSize}</span>
                    </p>
                ) : (
                    <p className="text-gray-500">No has seleccionado ninguna talla</p>
                )}
            </div>
        </div>
    );
};

export default Size;
