import React from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
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
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  originalPrice,
  discount,
  brand,
  category,
  imageUrl,
  stock,
  description,
  rating,
  soldCount,
}) => {

  const formatText = (text: string) => {
    
    return text.replace(/_/g, " ");
  };
  
  return (
    <div className=" bg-main2/20 rounded-lg shadow-md overflow-hidden min-w-[280px] max-w-sm mx-auto hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
        {discount && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </span>
        )}
      </div>
      <div className="p-4">
        <h4 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2">{formatText(category)}</h4>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{formatText(name)}</h3>
        
        <div className="flex items-baseline mb-2">
          <span className="text-2xl font-bold text-gray-900">${price}</span>
          {originalPrice && (
            <span className="ml-2 text-sm text-gray-500 line-through">${originalPrice}</span>
          )}
        </div>
        <p className="text-blue-600 text-sm font-semibold mb-2">Marca: {formatText(brand)}</p>
      
        <Link
          to={`/product/${name}`}
          state={{ product: { name, price, originalPrice, discount, brand, category,image1: imageUrl,stock,description  } }}
          className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
        >
          Ver en tienda
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
