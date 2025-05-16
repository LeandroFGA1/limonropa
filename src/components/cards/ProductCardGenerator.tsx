import React, { useState, useEffect } from "react"
import axios from "axios"
import ProductCard from "./ProductCard"
import { DefaultPagination } from "./DefaultPagination"
import ExternalDirectory from "../../assets/imgs/ExternalDirectory"
import directory from "../../assets/imgs/directory"
import { BASE_URL } from "../../App"
import textGeneral from "../../text/textGeneral"

const imageKeys = Object.keys(ExternalDirectory)
const imageProduct = Object.keys(directory)

interface Product {
  productCode: string
  productID: number
  productName: string
  productDescription: string
  productPrice: number
  productStock: number
  categories: (number | string)[]
  brand: number | string
  imageUrl: string
}

const ProductCardGenerator: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({ category: "", brand: "" })
  const [isLoading, setIsLoading] = useState(true)
  const itemsPerPage = 10
  const [categoryCounts, setCategoryCounts] = useState<Map<string, number>>(new Map())
  const [brandCounts, setBrandCounts] = useState<Map<string, number>>(new Map())

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      let allProducts: Product[] = []
      let nextPageUrl = `${BASE_URL}/api/productos/`

      while (nextPageUrl) {
        try {
          const response = await axios.get(nextPageUrl)
          const fetchedProducts: Product[] = response.data.results.map((product: any, index: number) => ({
            productCode: product.codigo_producto,
            productName: product.nombre_producto,
            productID: product.id,
            productDescription: product.descripcion_producto,
            productPrice: product.precio_producto,
            productStock: product.stock_producto,
            categories: product.categorias_nombres,
            brand: product.marca_nombre,
            imageUrl: directory[`${product.codigo_producto}` as keyof typeof directory],
          }))
          allProducts = allProducts.concat(fetchedProducts)
          allProducts = allProducts.slice(5, 130)
          if (allProducts.length >= 130) break
          nextPageUrl = response.data.next
        } catch (error) {
          console.error("Error fetching products:", error)
          nextPageUrl = ""
          setIsLoading(false)
        }
      }

      setProducts(allProducts)
      setIsLoading(false)
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const countCategories = new Map<string, number>()
    const countBrands = new Map<string, number>()

    products.forEach((product) => {
      product.categories.forEach((category) => {
        const cat = category.toString()
        countCategories.set(cat, (countCategories.get(cat) || 0) + 1)
      })

      const brand = product.brand.toString()
      countBrands.set(brand, (countBrands.get(brand) || 0) + 1)
    })

    setCategoryCounts(countCategories)
    setBrandCounts(countBrands)
  }, [products])

  const applyFilters = (products: Product[]) =>
    products.filter((product) => {
      const matchCategory = filters.category
        ? product.categories.some((cat) => cat.toString() === filters.category)
        : true
      const matchBrand = filters.brand ? product.brand.toString() === filters.brand : true
      return matchCategory && matchBrand
    })

  const filteredProducts = applyFilters(products)
  const totalItems = filteredProducts.length

  const paginate = (products: Product[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return products.slice(startIndex, startIndex + itemsPerPage)
  }

  const clearFilters = () => setFilters({ category: "", brand: "" })

  const topCategories = Array.from(categoryCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5)
  const topBrands = Array.from(brandCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5)

  return (
    <div className="container mx-auto px-2 sm:px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-[300px] p-6 bg-main2/60 backdrop-blur-md rounded-xl shadow-lg  h-fit animate-fadeInUp">
          <h3 className="text-2xl font-bold text-main3 mb-6">{textGeneral.market.filtersTitle}</h3>

          <div className="mb-6">
            <h4 className="font-semibold text-main3 mb-2">{textGeneral.market.categoryLabel}</h4>
            <div className="flex flex-wrap gap-3">
              {topCategories.map(([category, count]) => (
                <button
                  key={category}
                  onClick={() => setFilters((prev) => ({ ...prev, category }))}
                  className="px-3 py-1 bg-main/30 text-main3 border border-main3 rounded-full font-medium hover:bg-main3 hover:text-white transition-all"
                >
                  {category.replace(/_/g, " ")} ({count})
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-main3 mb-2">{textGeneral.market.brandLabel}</h4>
            <div className="flex flex-wrap gap-3">
              {topBrands.map(([brand, count]) => (
                <button
                  key={brand}
                  onClick={() => setFilters((prev) => ({ ...prev, brand }))}
                  className="px-3 py-1 bg-main3/20 text-main3 border border-main3 rounded-full font-medium hover:bg-main3 hover:text-white transition-all"
                >
                  {brand.replace(/_/g, " ")} ({count})
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="text-sm mt-4 underline text-red-500 hover:text-red-700 transition"
          >
            {textGeneral.market.clearFilters}
          </button>
        </aside>

        <main className="flex-1">
          {isLoading ? (
            <div className="text-center py-10 text-main3 text-xl font-semibold animate-pulse">
              {textGeneral.market.loadingMessage}
            </div>
          ) : (
            <>
              <div className="   flex flex-wrap items-center justify-center gap-4 animate-fadeInUp">
                {paginate(filteredProducts).map((product) => (
                  <ProductCard
                    key={product.productID}
                    id={product.productCode}
                    productID={product.productID}
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

              <div className="mt-12 flex justify-center animate-fadeInUp">
                <DefaultPagination
                  currentPage={currentPage}
                  onPageChange={(page: number) => setCurrentPage(page)}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default ProductCardGenerator
