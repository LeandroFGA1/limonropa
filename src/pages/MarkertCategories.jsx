import React, { useState, useEffect,useMemo } from 'react';
import { BASE_URL } from '../App';
import axios from 'axios';
import ProductCard from '../components/cards/ProductCard';
import { Button } from '@material-tailwind/react';
import directory from '../assets/imgs/directory';

const MarkertCategories = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);  // Estado para los productos
    const [isLoading, setIsLoading] = useState(false);
    const [productsFiltered, setProductsFiltered] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
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
            
              

            const categoryCount = {};
            allProducts.forEach(product => {
                product.categorias_nombres.forEach(categoryName => {
                    if (categoryName.toLowerCase().includes("test")) return;
                    categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1;
                });
            });
            
            

            const formattedCategories = Object.entries(categoryCount)
                .map(([name, count]) => ({
                    name: name.replaceAll('_', ' '), 
                    count,
                }))
                .sort((a, b) => b.count - a.count); 

            console.log('Productos cargados:', allProducts); // Verificación
            setCategories(formattedCategories);
            setProducts(allProducts);  // Guardamos los productos en el estado
            setIsLoading(false);
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (categoryName) => {
        console.log(`Categoría seleccionada: ${categoryName.replace(/ /g, '_')}`);
        
        const filteredProducts = products.filter(product =>
            product.categorias_nombres.includes(categoryName.replace(/ /g, '_'))  // Verificamos si la categoría está en el array
        );
        
        console.log(filteredProducts);
        setProductsFiltered(filteredProducts);
    };
    
    

    return (
        <div>
            <div className='min-h-[calc(40vh-100px)] h-fit w-full  flex items-center justify-center flex-wrap'>
                {isLoading ? (
                    <p>Loading categories...</p>
                ) : (
                    <div className='w-full h-fit flex items-center justify-center flex-col'>
                        <h2 className=' font-bold text-2xl text-center capitalize w-[90%]'>selecciona la categoria deseada</h2>
                        <ul className='flex items-center flex-wrap justify-center gap-4 w-[90%] min-h-[100px] h-fit bg-main p-6 rounded-lg '>
                        
                        {categories.map((category, index) => (
                            <li className='bg-gray-700 border-[2px] border-black/40 rounded-lg'>
                                <Button key={index} 
                                    className='w-[150px] h-[50px] bg-gray-4  flex items-center justify-center px-2 capitalize'
                                    onClick={() => handleCategoryClick(category.name)}
                                    title={`${category.name} con ${category.count} productos`}
                                >
                                    {category.name}
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

export default MarkertCategories;
