// src/components/ProductCard.jsx
import { Link } from 'react-router-dom';

const ProductCard = ({ product, isSeasonal: forcedSeasonal }) => {
  const productId = product._id || product.id;
  const imageSrc = (product.images && product.images.length > 0) ? product.images[0] : product.image;
  const isSeasonal = forcedSeasonal || product.isSeasonal || product.category === 'seasonal';

  return (
    <Link to={`/products/${productId}`} className="block group">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <img 
            src={imageSrc} 
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
          />
          {isSeasonal && (
            <div className="absolute top-3 left-3 z-10 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase tracking-wider flex items-center gap-1">
              <span className="text-xs">🌿</span> In Season
            </div>
          )}
          {product.isOrganic && (
            <div className="absolute bottom-3 left-3 z-10 bg-white/90 backdrop-blur-sm text-emerald-700 text-[10px] font-black px-2 py-1 rounded shadow-sm border border-emerald-100 uppercase flex items-center gap-1">
              <span className="text-xs text-emerald-500">✔</span> Organic
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-green-700 transition-colors line-clamp-1">{product.name}</h3>
          <p className="text-xs text-gray-500 mb-3 capitalize">{product.category}</p>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-green-700 font-extrabold text-xl">₹{product.price}</span>
            <span className="text-gray-400 text-xs font-medium">/ {product.unit || 'kg'}</span>
            {product.oldPrice && (
              <span className="text-gray-400 line-through text-sm">₹{product.oldPrice}</span>
            )}
          </div>
          <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-auto">
            <div className="flex items-center">
              <span className="text-yellow-400 text-sm">★</span>
              <span className="text-gray-500 text-xs ml-1 font-medium">{product.rating || "4.5"}</span>
              <span className="text-gray-400 text-[10px] ml-1">({product.reviewCount || "12"})</span>
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