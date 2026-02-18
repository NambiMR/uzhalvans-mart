
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
import { FaStar, FaRegStar, FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product, highlightText = '' }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart! 🛒`);
    // Optional: Auto-open cart briefly or just show toast
    // setIsCartOpen(true);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    if (isInWishlist(product.id)) {
      toast(`${product.name} removed from wishlist`, { icon: '💔' });
    } else {
      toast.success(`${product.name} saved to wishlist! ❤️`);
    }
  };
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
        <div className="relative pb-[75%] overflow-hidden group">
          <img
            src={product.images?.[0] || product.image}
            alt={product.name}
            className="absolute h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {product.isSeasonal && (
            <span className="absolute top-2 left-2 bg-green-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-sm shadow-sm z-10">
              Seasonal
            </span>
          )}
          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors z-10"
          >
            {isInWishlist(product.id) ?
              <FaHeart className="text-red-500 text-lg animate-pulse-once" /> :
              <FaRegHeart className="text-gray-600 text-lg hover:text-red-500" />
            }
          </button>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-800 text-lg mb-1 hover:text-green-700 transition-colors truncate">
            {highlightMatch(product.name)}
          </h3>
        </Link>

        <p className="text-gray-500 text-xs mb-3 line-clamp-1">
          {highlightMatch(product.description)}
        </p>

        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400 text-xs">
            {[...Array(5)].map((_, i) => (
              i < Math.floor(product.rating) ?
                <FaStar key={i} /> :
                <FaRegStar key={i} />
            ))}
          </div>
          <span className="text-gray-400 text-[10px] ml-1">({product.reviewCount})</span>
        </div>

        <div className="flex justify-between items-center gap-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 line-through">₹{(product.price * 1.2).toFixed(0)}</span>
            <span className="font-bold text-green-700 text-xl">₹{product.price}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
          >
            <FaShoppingCart size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;