import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../App'
import axios from 'axios'
import ProductCard from '../components/cards/ProductCard'
import directory from '../assets/imgs/directory'
import { Button } from '@material-tailwind/react'

const MarkertCategories = () => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [productsFiltered, setProductsFiltered] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true)
      let allProducts = []
      let nextPageUrl = `${BASE_URL}/api/productos/`

      while (nextPageUrl) {
        try {
          const response = await axios.get(nextPageUrl)
          allProducts = [...allProducts, ...response.data.results]

          const maxItems = 100
          allProducts = allProducts.slice(0, maxItems)

          nextPageUrl = response.data.next
        } catch (error) {
          console.error('Error fetching products:', error)
          nextPageUrl = null
        }
      }

      // Asignar imágenes
      allProducts = allProducts.map((product) => ({
        ...product,
        imageUrl: directory[String(product.codigo_producto)],
      }))

      // Contar categorías
      const categoryCount = {}
      allProducts.forEach((product) => {
        product.categorias_nombres.forEach((cat) => {
          if (!cat || cat.toLowerCase().includes('test')) return
          categoryCount[cat] = (categoryCount[cat] || 0) + 1
        })
      })

      const formatted = Object.entries(categoryCount)
        .map(([name, count]) => ({
          name: name.replace(/_/g, ' '),
          raw: name,
          count,
        }))
        .sort((a, b) => b.count - a.count)

      setCategories(formatted)
      setProducts(allProducts)
      setIsLoading(false)
    }

    fetchCategories()
  }, [])

  const handleCategoryClick = (categoryNameRaw) => {
    const filtered = products.filter((product) =>
      product.categorias_nombres.includes(categoryNameRaw)
    )
    setProductsFiltered(filtered)
  }

  return (
    <section className="min-h-screen px-4 sm:px-8 py-12 bg-main2 animate-fadeInUp">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="bg-main p-6 rounded-xl shadow-md mb-10">
          <h2 className="text-center font-extrabold text-2xl text-main3 mb-6">
            Selecciona la categoría deseada
          </h2>

          {isLoading ? (
            <p className="text-center text-gray-700">Cargando categorías...</p>
          ) : (
            <ul className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <li key={index}>
                  <Button
                    onClick={() => handleCategoryClick(category.raw)}
                    title={`${category.name} (${category.count} productos)`}
                    className="capitalize bg-main3 text-main2 hover:bg-main shadow-md rounded-md transition-all duration-300"
                  >
                    {category.name}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Productos */}
        <div className="flex items-center justify-center flex-wrap gap-8">
          {productsFiltered.length > 0 ? (
            productsFiltered.map((product, index) => (
              <ProductCard
                key={index}
                name={product.nombre_producto}
                price={product.precio_producto}
                brand={product.marca_nombre}
                category={product.categorias_nombres?.[0] || 'Sin Categoría'}
                imageUrl={product.imageUrl || ''}
                stock={product.stock_producto}
                rating={Math.floor(Math.random() * 5) + 1}
                soldCount={Math.floor(Math.random() * 1000)}
                id={product.codigo_producto}
                productID={product.id}
                description={product.descripcion_producto}
              />
            ))
          ) : (
            <p className="text-center text-main3 font-medium col-span-full">
              No hay productos para esta categoría.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default MarkertCategories
