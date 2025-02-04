import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { DefaultPagination } from "./DefaultPagination";
import ExternalDirectory from "../../assets/imgs/ExternalDirectory";
import { BASE_URL } from "../../App";
const imageKeys = Object.keys(ExternalDirectory);

interface Product {
  productCode: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productStock: number;
  categories: (number | string)[]; 
  brand: (number | string); 
  imageUrl: string;
}

const ProductCardGenerator: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;
  const [categoryCounts, setCategoryCounts] = useState<Map<string, number>>(new Map());
  const [brandCounts, setBrandCounts] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      let allProducts: Product[] = [];
      let nextPageUrl = `${BASE_URL}/api/productos/`;

      while (nextPageUrl) {
        try {
          const response = await axios.get(nextPageUrl);
          const fetchedProducts: Product[] = response.data.results.map((product: any, index: number) => ({
            productCode: product.codigo_producto,
            productName: product.nombre_producto,
            productDescription: product.descripcion_producto,
            productPrice: (product.precio_producto),
            productStock: (product.stock_producto),
            categories: product.categorias_nombres, 
            brand: product.marca_nombre,
            imageUrl: ExternalDirectory[imageKeys[index % imageKeys.length] as keyof typeof ExternalDirectory],
          }));
          allProducts = allProducts.concat(fetchedProducts);

          const maxItems = 30;
          allProducts = allProducts.slice(0, maxItems);

          if (allProducts.length >= maxItems) {
              break; 
          }


          nextPageUrl = response.data.next;
          console.log(allProducts)
        } catch (error) {
          console.error("Error fetching products:", error);
          nextPageUrl = ""; 
          setIsLoading(false);
        }
      }

      setProducts(allProducts);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    
    const countCategories = new Map<string, number>();
    const countBrands = new Map<string, number>();

    products.forEach((product) => {
      product.categories.forEach((category) => {
        const categoryStr = category.toString();
        countCategories.set(categoryStr, (countCategories.get(categoryStr) || 0) + 1);
      });

      const brandStr = product.brand.toString();
      countBrands.set(brandStr, (countBrands.get(brandStr) || 0) + 1);
    });

    setCategoryCounts(countCategories);
    setBrandCounts(countBrands);
  }, [products]);

  const applyFilters = (products: Product[]) =>
    products.filter((product) => {
      const matchCategory =
        filters.category ? product.categories.some((cat) => cat.toString() === filters.category) : true;
      const matchBrand = filters.brand ? product.brand.toString() === filters.brand : true;
      return matchCategory && matchBrand;
    });

  const filteredProducts = applyFilters(products);
  const totalItems = filteredProducts.length;

  const paginate = (products: Product[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return products.slice(startIndex, startIndex + itemsPerPage);
  };

  const clearFilters = () => {
    setFilters({ category: "", brand: "" });
  };

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const handleBrandChange = (brand: string) => {
    setFilters((prev) => ({ ...prev, brand }));
  };

  
  const topCategories = Array.from(categoryCounts.entries())
    .sort((a, b) => b[1] - a[1]) 
    .slice(0, 5);

  const topBrands = Array.from(brandCounts.entries())
    .sort((a, b) => b[1] - a[1]) 
    .slice(0, 5);

  return (
    <div className="container mx-auto px-1 sm:px-4 py-8">
      <div className="flex flex-wrap gap-8">
        <div className="w-full  mb-8 ">
          <h3 className="text-xl font-bold mb-4">Filtros</h3>
          
          
          <div className="mb-4">
            <h4 className="font-semibold">Categoría</h4>
            <div className="flex flex-wrap gap-2">
              {topCategories.map(([category, count]) => (
              <button
                key={category}
                className="text-blue-500 p-1 bg-main2/20 rounded"
                onClick={() => handleCategoryChange(category)}
              >
                {` ${category.replace(/_/g, ' ')} `}
              </button>
            ))}
            </div>
            
          </div>

          
          <div className="mb-4">
            <h4 className="font-semibold">Marca</h4>
            <div className="flex flex-wrap gap-2">
              {topBrands.map(([brand, count]) => (
              <button
                key={brand}
                className="text-blue-500 bg-main3/20 p-1 rounded"
                onClick={() => handleBrandChange(brand)}
              >
                {` ${brand.replace(/_/g, ' ')}`}
              </button>
            ))}
            </div>
            
          </div>

          
          <button className="mt-4 text-red-500 text-sm" onClick={clearFilters}>
            Limpiar filtros
          </button>
        </div>

        <div className="flex-1 w-full overflow-hidden">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="animate-pulse text-xl">Cargando...</div>
              {/* <ProductCard
                  key={1}
                  name="limon australiano"
                  price={40}
                  brand="marca generica"
                  category=" categoria extraña"
                  imageUrl=""
                  rating={4}
                  soldCount={14}
                  stock={300}
                /> */}
            </div>
          ) : (
            <>
              
              <div className="flex flex-wrap gap-8 items-center justify-center">
                {paginate(filteredProducts).map((product) => (
                  <ProductCard
                    key={product.productCode}
                    name={product.productName}
                    price={product.productPrice}
                    originalPrice={undefined}
                    discount={undefined}
                    brand={`${product.brand}`} 
                    category={`${product.categories.join(", ")}`} 
                    imageUrl={product.imageUrl}
                    rating={Math.ceil(Math.random() * 5) + 1}
                    soldCount={Math.floor(Math.random() * 5000)}
                    stock={product.productStock}
                    description={product.productDescription}
                  />
                ))}
                
              </div>
              
              <div className="mt-8 flex justify-center">
                <DefaultPagination
                  currentPage={currentPage}
                  onPageChange={(page: number) => setCurrentPage(page)}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCardGenerator;
