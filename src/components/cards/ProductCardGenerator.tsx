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
  categories: { id: number; categoryName: string; discontinued: boolean }[];
  brand: { id: number; brandName: string; discontinued: boolean };
  imageUrl: string;
}

const ProductCardGenerator: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
  });
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let allProducts: Product[] = [];
        let nextPageUrl = "http://127.0.0.1:8000/api/productos/";

        while (nextPageUrl) {
          const response = await axios.get(nextPageUrl);
          const fetchedProducts: Product[] = response.data.results.map((product: any, index: number) => ({
            productCode: product.codigo_producto,
            productName: product.nombre_producto,
            productDescription: product.descripcion_producto,
            productPrice: parseInt(product.precio_producto),
            productStock: parseInt(product.stock_producto),
            categories: product.categorias.map((cat: any) => ({
              id: cat.id,
              categoryName: cat.nombre_categoria.replace(/_/g, " "),
              discontinued: cat.descontinuado,
            })),
            brand: {
              id: product.marca.id,
              brandName: product.marca.nombre_marca.replace(/_/g, " "),
              discontinued: product.marca.descontinuado,
            },
            imageUrl: ExternalDirectory[imageKeys[index % imageKeys.length] as keyof typeof ExternalDirectory],
          }));

          allProducts = [...allProducts, ...fetchedProducts];
          nextPageUrl = response.data.next;
        }

        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(true);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchCategory = filters.category
      ? product.categories.some((cat) => cat.categoryName === filters.category)
      : true;
    const matchBrand = filters.brand
      ? product.brand.brandName === filters.brand
      : true;
    return matchCategory && matchBrand;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const categoryCounts = products.reduce((acc: { [key: string]: number }, product) => {
    product.categories.forEach((cat) => {
      acc[cat.categoryName] = (acc[cat.categoryName] || 0) + 1;
    });
    return acc;
  }, {});
  const topCategories = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name]) => name);

  const brandCounts = products.reduce((acc: { [key: string]: number }, product) => {
    acc[product.brand.brandName] = (acc[product.brand.brandName] || 0) + 1;
    return acc;
  }, {});
  const topBrands = Object.entries(brandCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name]) => name);

  const clearFilters = () => {
    setFilters({ category: "", brand: "" });
  };

  return (
    <div className="container mx-auto px-1 sm:px-4 py-8">
      <div className="flex flex-wrap gap-8">
        <div className="w-full lg:w-1/4 lg:ml-4 mb-8 lg:mb-0">
          <h3 className="text-xl font-bold mb-4">Filtros</h3>
          <div>
            <h4 className="font-semibold">Categoría</h4>
            <ul>
              {topCategories.map((category) => (
                <li key={category}>
                  <button
                    className="text-sm text-blue-500 hover:underline"
                    onClick={() => setFilters((prev) => ({ ...prev, category }))}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Marca</h4>
            <ul>
              {topBrands.map((brand) => (
                <li key={brand}>
                  <button
                    className="text-sm text-blue-500 hover:underline"
                    onClick={() => setFilters((prev) => ({ ...prev, brand }))}
                  >
                    {brand}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="mt-4 text-red-500 text-sm"
            onClick={clearFilters}
          >
            Limpiar filtros
          </button>
        </div>
        <div className="flex-1 w-full overflow-hidden">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className=" animate-pulse text-xl"> Cargando...</div>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-8 items-center justify-center">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.productCode}
                    name={product.productName}
                    price={product.productPrice}
                    originalPrice={undefined}
                    discount={undefined}
                    brand={product.brand.brandName}
                    category={product.categories[0]?.categoryName}
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
                  totalItems={filteredProducts.length}
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
