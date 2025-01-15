import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { DefaultPagination } from "./DefaultPagination";
import ExternalDirectory from "../../assets/imgs/ExternalDirectory";
const imageKeys = Object.keys(ExternalDirectory);

interface Product {
  productCode: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productStock: number;
  categories: number[]; // Cambiado para manejar solo IDs
  brand: number; // Cambiado para manejar solo IDs
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
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      let allProducts: Product[] = [];
      let nextPageUrl = "https://ecosustentable.azurewebsites.net/api/productos/";

      while (nextPageUrl) {
        try {
          const response = await axios.get(nextPageUrl);
          const fetchedProducts: Product[] = response.data.results.map((product: any, index: number) => ({
            productCode: product.codigo_producto,
            productName: product.nombre_producto,
            productDescription: product.descripcion_producto,
            productPrice: parseInt(product.precio_producto, 10),
            productStock: parseInt(product.stock_producto, 10),
            categories: product.categorias, // Asumiendo que son IDs numéricos
            brand: product.marca, // Asumiendo que es un ID numérico
            imageUrl: ExternalDirectory[imageKeys[index % imageKeys.length] as keyof typeof ExternalDirectory],
          }));
          allProducts = allProducts.concat(fetchedProducts);
          nextPageUrl = response.data.next;
        } catch (error) {
          console.error("Error fetching products:", error);
          nextPageUrl = ""; // Stop further requests on error
          setIsLoading(false);
        }
      }

      setProducts(allProducts);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  const applyFilters = (products: Product[]) =>
    products.filter((product) => {
      const matchCategory = filters.category ? product.categories.includes(parseInt(filters.category)) : true;
      const matchBrand = filters.brand ? product.brand === parseInt(filters.brand) : true;
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

  return (
    <div className="container mx-auto px-1 sm:px-4 py-8">
      <div className="flex flex-wrap gap-8">
        <div className="w-full lg:w-1/4 lg:ml-4 mb-8 lg:mb-0">
          <h3 className="text-xl font-bold mb-4">Filtros</h3>
          <button className="mt-4 text-red-500 text-sm" onClick={clearFilters}>
            Limpiar filtros
          </button>
        </div>
        <div className="flex-1 w-full overflow-hidden">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="animate-pulse text-xl">Cargando...</div>
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
                    brand={`${product.brand}`} // Mostrando ID de la marca
                    category={`${product.categories.join(", ")}`} // Mostrando IDs de las categorías
                    imageUrl={product.imageUrl}
                    rating={Math.ceil(Math.random() * 5) + 1}
                    soldCount={Math.floor(Math.random() * 5000)}
                    stock={product.productStock}
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