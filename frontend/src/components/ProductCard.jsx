// src/components/ProductCard.jsx
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className="block group">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={product.images?.[0] || product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {product.isSeasonal && (
            <div className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
              Seasonal
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-green-700 transition-colors">{product.name}</h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-green-700 font-extrabold text-xl">₹{product.price}</span>
            {product.oldPrice && (
              <span className="text-gray-400 line-through text-sm">₹{product.oldPrice}</span>
            )}
          </div>
          <div className="flex items-center justify-between border-t pt-3 mt-auto">
            <div className="flex items-center">
              <span className="text-yellow-400 text-sm">★</span>
              <span className="text-gray-500 text-xs ml-1 font-medium">{product.rating || "4.5"}</span>
              <span className="text-gray-400 text-[10px] ml-1">({product.reviewCount || "20"})</span>
            </div>
            <button className="text-green-600 font-bold text-xs hover:underline uppercase tracking-tighter">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;