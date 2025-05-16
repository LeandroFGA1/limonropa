import React, { useMemo } from "react"
import { Link } from "react-router-dom"
import directory from "../../assets/imgs/directory"

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  discount?: number
  brand: string
  category: string
  imageUrl: string
  rating: number
  soldCount: number
  stock: number
  description: string
  productID: number
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  discount: inputDiscount,
  brand,
  category,
  imageUrl,
  rating,
  soldCount,
  stock,
  description,
  productID,
}) => {
  const formattedCategory = useMemo(() => category.replace(/_/g, " "), [category])
  const formattedName = useMemo(() => name.replace(/_/g, " "), [name])
  const formattedBrand = useMemo(() => brand.replace(/_/g, " "), [brand])
  const sanitizedName = useMemo(() => name.replace(/\//g, " "), [name])

  const calculatedDiscount = useMemo(() => {
    if (inputDiscount) return inputDiscount
    if (originalPrice && price && originalPrice > price) {
      return Math.round(((originalPrice - price) / originalPrice) * 100)
    }
    return null
  }, [originalPrice, price, inputDiscount])

  const renderStars = (count: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-yellow-400 ${i < count ? "" : "text-opacity-30"}`}>
        ★
      </span>
    ))

  return (
    <article className="w-full sm:w-[45%] md:w-[30%] lg:w-[30%] xl:w-[25%] min-w-[260px] bg-main2/20 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-fadeInUp">
      <div className="relative w-full h-[200px] sm:h-[250px]">
        <img
          src={imageUrl}
          alt={formattedName}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = directory.noload
          }}
        />
        {calculatedDiscount && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
            {calculatedDiscount}% OFF
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2 text-main3">
        <h4 className="text-sm font-bold opacity-80">{formattedCategory}</h4>
        <h3 className="text-lg font-extrabold line-clamp-2">{formattedName}</h3>

        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-main3">${price.toLocaleString("de-DE")}</span>
          {originalPrice && (
            <span className="text-sm line-through text-gray-500">${originalPrice}</span>
          )}
        </div>

        <p className="text-sm font-semibold">Marca: {formattedBrand}</p>

        <div className="flex items-center gap-2 text-sm hidden">
          {renderStars(Math.min(rating, 5))}
          <span className="text-gray-600 text-xs">({soldCount} vendidos)</span>
        </div>

        <Link
          to={`/product/${sanitizedName}`}
          state={{
            product: {
              name,
              price,
              originalPrice,
              discount: calculatedDiscount,
              brand,
              category,
              image1: imageUrl,
              stock,
              description,
              id,
              productID,
            },
          }}
          className="
            mt-4 px-6 py-2 
            bg-main2 text-main3 font-medium 
            rounded-full border-2 border-main 
            hover:bg-main hover:text-white hover:border-main3 
            active:bg-white active:text-main3 active:scale-95 
            transition-all duration-300 
            text-center inline-block
          "
          aria-label={`Ver detalles de ${formattedName}`}
        >
          Ver en tienda
        </Link>
      </div>
    </article>
  )
}

export default ProductCard
