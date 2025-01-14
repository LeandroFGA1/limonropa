import React, { useEffect, useRef } from "react";

const BannerInfinite = () => {
    const promoRef = useRef(null);

    const promociones = [
        "Oferta del 20% en camisetas",
        "Descuento del 15% en jeans",
        "30% de descuento en abrigos",
        "10% en toda la colección de verano",
        "25% en chaquetas de cuero",
        "40% en accesorios",
        "50% en zapatillas deportivas",
        "35% en ropa de oficina"
    ];

    useEffect(() => {
        const ul = promoRef.current;
        if (ul) {
            const clone = ul.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            ul.parentNode.appendChild(clone);
            Array.from(clone.children).forEach((li) => {
                li.classList.add("text-gray-300/80", "font-semibold", "w-[300px]");
            });
        }
    }, []);

    return (
        <div className="relative h-[30px] flex flex-col justify-center overflow-hidden">
            <div className="w-full max-w-[90%] mx-auto px-4 md:px-6 py-24">
                <div className="text-center">
                    <div className="w-full inline-flex flex-nowrap overflow-hidden mask-[linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                        <ul
                            ref={promoRef}
                            className="flex items-center justify-center md:justify-start space-x-8 animate-infinite-scroll"
                        >
                            {promociones.map((promo, index) => (
                                <li key={index} className="text-gray-300/80 font-semibold w-[300px]">
                                    {promo}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerInfinite;
