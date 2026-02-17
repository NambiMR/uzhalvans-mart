
// import { Link } from 'react-router-dom';

// const ProductCard = ({ product }) => {
//   return (
//     <Link to={`/products/${product.id}`} className="block">
//       <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
//         <img 
//           src={product.images?.[0] || product.image} 
//           alt={product.name}
//           className="w-full h-48 object-cover"
//         />
//         <div className="p-4">
//           <h3 className="font-semibold text-lg text-orange-600">{product.name}</h3>
//           <p className="text-green-600 font-bold">₹{product.price}</p>
//           {product.oldPrice && (
//             <p className="text-gray-400 line-through text-sm">₹{product.oldPrice}</p>
//           )}
//           <div className="flex items-center mt-2">
//             <span className="text-yellow-400">★★★★☆</span>
//             <span className="text-gray-500 text-sm ml-1">({product.reviewCount})</span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;

import { Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ product, highlightText = '' }) => {
  // Highlight matching text in name and description
  const highlightMatch = (text) => {
    if (!highlightText) return text;
    
    const regex = new RegExp(`(${highlightText})`, 'gi');
    return text.split(regex).map((part, i) => 
      part.toLowerCase() === highlightText.toLowerCase() 
        ? <span key={i} className="bg-yellow-100">{part}</span> 
        : part
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative pb-[75%] overflow-hidden">
          <img 
            src={product.images?.[0] || product.image} 
            alt={product.name} 
            className="absolute h-full w-full object-cover hover:scale-105 transition-transform"
          />
          {product.isSeasonal && (
            <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
              Seasonal
            </span>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1">
            {highlightMatch(product.name)}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {highlightMatch(product.description)}
        </p>
        
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            i < Math.floor(product.rating) ? 
              <FaStar key={i} className="text-yellow-400" /> : 
              <FaRegStar key={i} className="text-yellow-400" />
          ))}
          <span className="text-gray-500 text-sm ml-1">({product.reviewCount})</span>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-green-700">${product.price.toFixed(2)}</span>
          <button className="btn btn-sm btn-primary">
            <FaShoppingCart className="mr-1" /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;