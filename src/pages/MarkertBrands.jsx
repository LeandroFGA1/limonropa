import React, { useState, useEffect,useMemo } from 'react';
import { BASE_URL } from '../App';
import axios from 'axios';
import ProductCard from '../components/cards/ProductCard';
import directory from '../assets/imgs/directory';

import { Button } from '@material-tailwind/react';

const MarketBrands = () => {
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [productsFiltered, setProductsFiltered] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            setIsLoading(true);
            let allProducts = [];
            let nextPageUrl = `${BASE_URL}/api/productos/`;

            while (nextPageUrl) {
                try {
                    const response = await axios.get(nextPageUrl);
                    allProducts = [...allProducts, ...response.data.results];

                    const maxItems = 30;
                    allProducts = allProducts.slice(0, maxItems);
                    allProducts = allProducts.map(product => ({
                    ...product,
                    imageUrl: directory[String(product.codigo_producto)]
                    }));

                    if (allProducts.length >= maxItems) {
                        break;
                    }

                    nextPageUrl = response.data.next;
                } catch (error) {
                    console.error('Error fetching products:', error);
                    nextPageUrl = null;
                }
            }
            allProducts = allProducts.map(product => ({
                ...product,
                imageUrl: directory[String(product.codigo_producto)]
              }));
              
            const brandCount = {};
            allProducts.forEach(product => {
            const brandName = product.marca_nombre;
            if (brandName.toLowerCase().includes("test")) return;
            brandCount[brandName] = (brandCount[brandName] || 0) + 1;
            });


            const formattedBrands = Object.entries(brandCount)
                .map(([name, count]) => ({
                    name,
                    count,
                }))
                .sort((a, b) => b.count - a.count);

            console.log('Productos cargados:', allProducts); 
            setBrands(formattedBrands);
            setProducts(allProducts);  
            setIsLoading(false);
        };

        fetchBrands();
    }, []);

    const handleBrandClick = (brandName) => {
        console.log(`Marca seleccionada: ${brandName}`);
        
        const filteredProducts = products.filter(product =>
            product.marca_nombre === brandName 
        );
        
        console.log(filteredProducts);
        setProductsFiltered(filteredProducts);
    };

    return (
        <div>
            <div className='min-h-[calc(40vh-100px)] h-fit w-full flex items-center justify-center flex-wrap'>
                {isLoading ? (
                    <p>Loading brands...</p>
                ) : (
                    <div className='w-full h-fit flex items-center justify-center flex-col'>
                        <h2 className='font-bold text-2xl text-center capitalize w-[90%]'>Selecciona la marca deseada</h2>
                        <ul className='flex items-center flex-wrap justify-center gap-4 w-[90%] min-h-[100px] h-fit bg-main p-6 rounded-lg'>
                            {brands.map((brand, index) => (
                                <li key={index} className='bg-gray-700 border-[2px] border-black/40 rounded-lg'>
                                    <Button 
                                        className='w-[150px] h-[50px] bg-gray-4 flex items-center justify-center px-2 capitalize'
                                        onClick={() => handleBrandClick(brand.name)}
                                        title={`${brand.name} con ${brand.count} productos`}
                                    >
                                        {brand.name.replace(/_/g, ' ')}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className='w-full h-fit flex flex-wrap gap-6 pt-6'>
                {productsFiltered.length > 0 ? (
                    productsFiltered.map((product, index) => (
                        <ProductCard
                            key={index}
                            name={product.nombre_producto}
                            price={product.precio_producto}
                            brand={product.marca_nombre}
                            category={product.categorias_nombres[0] || "Sin Categoría"}
                            imageUrl={product.imageUrl || ""}
                            stock={product.stock_producto}
                            rating={0}
                            soldCount={0}
                        />
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default MarketBrands;
