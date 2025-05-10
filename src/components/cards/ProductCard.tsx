import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import directory from "../../assets/imgs/directory";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  brand: string;
  category: string;
  imageUrl: string;
  rating: number;
  soldCount: number;
  stock: number;
  description: string;
  productID: number;
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
  const formattedCategory = useMemo(() => category.replace(/_/g, " "), [category]);
  const formattedName = useMemo(() => name.replace(/_/g, " "), [name]);
  const formattedBrand = useMemo(() => brand.replace(/_/g, " "), [brand]);
  const sanitizedName = useMemo(() => name.replace(/\//g, " "), [name]);

  const calculatedDiscount = useMemo(() => {
    if (inputDiscount) return inputDiscount;
    if (originalPrice && price && originalPrice > price) {
      return Math.round(((originalPrice - price) / originalPrice) * 100);
    }
    return null;
  }, [originalPrice, price, inputDiscount]);

  const renderStars = (count: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-yellow-400 ${i < count ? "" : "text-opacity-30"}`}>
        ★
      </span>
    ));

  return (
    <article className="bg-main2/20 rounded-lg shadow-md overflow-hidden min-w-[280px] max-w-sm mx-auto hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={imageUrl}
          alt={formattedName}
          className="w-full h-48 object-cover"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = directory.noload;
          }}
        />

        {calculatedDiscount && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            {calculatedDiscount}% OFF
          </span>
        )}
      </div>

      <div className="p-4">
        <h4 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2">
          {formattedCategory}
        </h4>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {formattedName}
        </h3>

        <div className="flex items-baseline mb-2">
          <span className="text-2xl font-bold text-gray-900">
            ${Number(price).toLocaleString("de-DE")}
          </span>
          {originalPrice && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              ${originalPrice}
            </span>
          )}
        </div>

        <p className="text-blue-600 text-sm font-semibold mb-2">
          Marca: {formattedBrand}
        </p>

        <div className="flex items-center text-sm text-gray-600 mb-2 gap-2">
          {renderStars(Math.min(rating, 5))}
          <span className="ml-1">({soldCount} vendidos)</span>
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
          className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
          aria-label={`Ver detalles de ${formattedName}`}
        >
          Ver en tienda
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;
