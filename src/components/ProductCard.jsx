// import { motion, AnimatePresence } from "framer-motion";
// import { Tilt } from "react-tilt";
// import { FaStar, FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
// import { useState } from "react";

// // Animation variants
// const cardVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { 
//     opacity: 1, 
//     y: 0,
//     transition: { duration: 0.5 }
//   }
// };

// const ProductCard = ({ product }) => {
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [isAnimating, setIsAnimating] = useState(false);

//   const handleAddToCart = () => {
//     setIsAnimating(true);
//     setTimeout(() => setIsAnimating(false), 1000);
//   };

//   return (
//     <Tilt options={{ max: 15, scale: 1.05, glare: true, "max-glare": 0.2 }}>
//       <motion.div
//         variants={cardVariants}
//         initial="hidden"
//         animate="visible"
//         whileHover={{ y: -5 }}
//         className="bg-white rounded-lg shadow-md overflow-hidden relative"
//       >
//         {/* Favorite Button - Fixed Hover Issue */}
//         <button 
//           onClick={() => setIsFavorite(!isFavorite)}
//           className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-colors ${
//             isFavorite ? "text-red-500" : "text-gray-300 hover:text-red-400"
//           }`}
//         >
//           {isFavorite ? <FaHeart /> : <FaRegHeart />}
//         </button>

//         {/* Image with Zoom + Tilt */}
//         <motion.div 
//           className="h-48 bg-gray-100 overflow-hidden"
//           whileHover={{ scale: 1.05 }}
//         >
//           <img 
//             src={product.image} 
//             alt={product.name}
//             className="w-full h-full object-cover"
//             loading="lazy"
//           />
//         </motion.div>

//         {/* Product Info */}
//         <div className="p-4">
//           <h3 className="font-bold text-green-600 text-lg mb-1">{product.name}</h3>
//           <p className="text-gray-600 text-sm mb-2">By {product.farmer}</p>
          
//           {/* Rating with Star Pulse */}
//           <motion.div 
//             className="flex items-center mb-3"
//             whileHover={{ scale: 1.05 }}
//           >
//             <motion.span
//               animate={{ scale: [1, 1.1, 1] }}
//               transition={{ repeat: Infinity, duration: 2 }}
//             >
//               <FaStar className="text-yellow-400 mr-1" />
//             </motion.span>
//             <span className="text-black">{product.rating}</span>
//           </motion.div>

//           {/* Price + Add to Cart with Fly Animation */}
//           <div className="flex justify-between items-center relative">
//             <span className="font-bold text-green-600">
//               ${product.price}/{product.unit}
//             </span>
            
//             <motion.button 
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleAddToCart}
//               className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full relative z-0"
//             >
//               <FaShoppingCart />
              
//               {/* Flying Item Clone (Only visible during animation) */}
//               <AnimatePresence>
//                 {isAnimating && (
//                   <motion.div
//                     initial={{ scale: 1, opacity: 1 }}
//                     animate={{
//                       scale: 0.5,
//                       opacity: 0,
//                       x: 100,
//                       y: -100,
//                     }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.8 }}
//                     className="absolute top-0 left-0 bg-green-600 text-white p-2 rounded-full"
//                   >
//                     <FaShoppingCart />
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.button>
//           </div>
//         </div>
//       </motion.div>
//     </Tilt>
//   );
// };
// export default ProductCard


// src/components/products/ProductCard.jsx
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
        <img 
          src={product.images?.[0] || product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg text-orange-600">{product.name}</h3>
          <p className="text-green-600 font-bold">₹{product.price}</p>
          {product.oldPrice && (
            <p className="text-gray-400 line-through text-sm">₹{product.oldPrice}</p>
          )}
          <div className="flex items-center mt-2">
            <span className="text-yellow-400">★★★★☆</span>
            <span className="text-gray-500 text-sm ml-1">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;