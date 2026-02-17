// src/components/ProductGrid.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import { useFilteredSortedProducts } from '../hooks/useFilteredSortedProducts';

const ProductGrid = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryFilter, setCategory] = useState('');
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  // Simulate initial loading
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filteredSortedProducts = useFilteredSortedProducts(products, categoryFilter, sortOption);
  
  // Get different product categories for sections
  const seasonalProducts = products.filter(p => p.isSeasonal);
  const bestSellers = [...products].sort((a, b) => b.sales - a.sales).slice(0, 8);
  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
  const displayedProducts = filteredSortedProducts.slice(0, 8);

  const navigateToCategory = (type) => {
    navigate('/all-products', { state: { filterType: type } });
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Seasonal Products Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-green-800">
              Seasonal{' '}
              <span className="block sm:inline">Specials</span> 
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-green-600 hover:text-green-800 font-medium"
              onClick={() => navigateToCategory('seasonal')}
            >
              View All Seasonal →
            </motion.button>
          </div>
          <p className="text-gray-600 mb-6">Fresh picks for this season</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              : seasonalProducts.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} showBadges={true} />
                ))}
          </div>
        </div>

        {/* Best Sellers Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-green-800">
              Customer Favorites
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-green-600 hover:text-green-800 font-medium"
              onClick={() => navigateToCategory('bestsellers')}
            >
              View All Bestsellers →
            </motion.button>
          </div>
          <p className="text-gray-600 mb-6">Our most popular products</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              : bestSellers.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} showBadges={true} />
                ))}
          </div>
        </div>

        {/* Top Rated Section */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-green-800">
              Top Rated Products
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-green-600 hover:text-green-800 font-medium"
              onClick={() => navigateToCategory('toprated')}
            >
              View All Top Rated →
            </motion.button>
          </div>
          <p className="text-gray-600 mb-6">Loved by our customers</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              : topRated.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} showBadges={true} />
                ))}
          </div>
        </div>

        {/* Main Product Grid */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-4 mt-16 text-green-800">
            Fresh From the Farm
          </h2>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              : displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} showBadges={true} />
                ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
            onClick={() => navigate('/all-products')}
          >
            View All Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGrid;

// // src/components/ProductGrid.js
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { products } from '../data/products';
// import ProductCard from './ProductCard';
// import ProductCardSkeleton from './ProductCardSkeleton';
// import { useFilteredSortedProducts } from '../hooks/useFilteredSortedProducts';

// const ProductGrid = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [categoryFilter, setCategory] = useState('');
//   const [sortOption, setSortOption] = useState('');
//   const navigate = useNavigate();

//   // Simulate initial loading
//   useEffect(() => {
//     const t = setTimeout(() => setIsLoading(false), 800);
//     return () => clearTimeout(t);
//   }, []);

//   const filteredSortedProducts = useFilteredSortedProducts(products, categoryFilter, sortOption);
//   const displayedProducts = filteredSortedProducts.slice(0, 8);

//   return (
//     <section className="py-12 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-4 text-green-800">
//           Fresh From the Farm
//         </h2>

//         {/* Filter & Sort UI */}
//         <div className="flex flex-wrap gap-4 justify-center text-black mb-6">
//           <select
//             value={categoryFilter}
//             onChange={(e) => setCategory(e.target.value)}
//             className="px-3 py-2 border rounded"
//           >
//             <option value="">All Categories</option>
//             <option value="vegetables">Vegetables</option>
//             <option value="fruits">Fruits</option>
//             <option value="grains">Grains</option>
//             <option value="dairy">Dairy</option>
//             <option value="organic">Organic</option>
//             <option value="spices">Spices</option>
//             <option value="herbs">Herbs</option>
//             <option value="pulses">Pulses</option>
//             <option value="flowers">Flowers</option>
//             <option value="seeds">Seeds</option>
//           </select>

//           {/* Sort Controls — Responsive */}
//           {/* Mobile: dropdown */}
//           <div className="block md:hidden">
//             <select
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//               className="px-3 py-2 border rounded w-full"
//             >
//               <option value="">Sort By</option>
//               <option value="priceLowHigh">Price: Low → High</option>
//               <option value="priceHighLow">Price: High → Low</option>
//               <option value="nameAZ">Name: A → Z</option>
//               <option value="nameZA">Name: Z → A</option>
//               <option value="ratingHighLow">Rating: ★ High → Low</option>
//             </select>
//           </div>

//           {/* Desktop: buttons */}
//           <div className="hidden md:flex flex-wrap gap-2">
//             {[
//               { label: 'Price ↑', value: 'priceLowHigh' },
//               { label: 'Price ↓', value: 'priceHighLow' },
//               { label: 'Name A-Z', value: 'nameAZ' },
//               { label: 'Name Z-A', value: 'nameZA' },
//               { label: 'Rating ★', value: 'ratingHighLow' },
//             ].map(({ label, value }) => (
//               <button
//                 key={value}
//                 onClick={() => setSortOption(value)}
//                 className={`px-4 py-2 rounded border ${
//                   sortOption === value
//                     ? 'bg-green-600 text-white'
//                     : 'bg-white text-gray-700 hover:bg-gray-100'
//                 }`}
//               >
//                 {label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {isLoading
//             ? Array.from({ length: 8 }).map((_, index) => (
//                 <ProductCardSkeleton key={index} />
//               ))
//             : displayedProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} showBadges={true} />
//               ))}
//         </div>

//         {/* View All Button */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//           className="text-center mt-8"
//         >
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
//             onClick={() => navigate('/all-products')}
//           >
//             View All Products
//           </motion.button>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default ProductGrid;




// import { useState, useEffect, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { products } from '../data/products';
// import ProductCard from './ProductCard';
// import ProductCardSkeleton from './ProductCardSkeleton';
// import { useFilteredSortedProducts } from '../hooks/useFilteredSortedProducts';

// const ProductGrid = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [categoryFilter, setCategory] = useState('');
//   const [sortOption, setSortOption] = useState('');
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const t = setTimeout(() => {
//       try {
//         // Simulate potential error (remove in production)
//         if (Math.random() < 0.1) throw new Error('Failed to load products');
//         setIsLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setIsLoading(false);
//       }
//     }, 800);
//     return () => clearTimeout(t);
//   }, []);

//   const filteredSortedProducts = useFilteredSortedProducts(products, categoryFilter, sortOption);
  
//   const displayedProducts = useMemo(() => 
//     filteredSortedProducts.slice(0, 8), 
//     [filteredSortedProducts]
//   );

//   const resetFilters = () => {
//     setCategory('');
//     setSortOption('');
//   };

//   const hasFilters = categoryFilter || sortOption;

//   return (
//     <section className="py-12 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-4 text-green-800">
//           Fresh From the Farm
//         </h2>

//         {/* Filter & Sort UI */}
//         <div className="flex flex-wrap gap-4 justify-center mb-6">
//           <div className="relative">
//             <select
//               value={categoryFilter}
//               onChange={(e) => setCategory(e.target.value)}
//               className="px-3 py-2 border rounded pr-8 appearance-none bg-white"
//               aria-label="Filter by category"
//             >
//               <option value="">All Categories</option>
//               <option value="vegetables">Vegetables</option>
//               <option value="fruits">Fruits</option>
//               <option value="grains">Grains</option>
//               {/* other options... */}
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </div>
//           </div>

//           {/* Mobile sort */}
//           <div className="block md:hidden relative">
//             <select
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//               className="px-3 py-2 border rounded pr-8 appearance-none bg-white w-full"
//               aria-label="Sort options"
//             >
//               <option value="">Sort By</option>
//               <option value="priceLowHigh">Price: Low → High</option>
//               {/* other options... */}
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </div>
//           </div>

//           {/* Desktop sort */}
//           <div className="hidden md:flex flex-wrap gap-2">
//             {[
//               { label: 'Price ↑', value: 'priceLowHigh' },
//               { label: 'Price ↓', value: 'priceHighLow' },
//               // other options...
//             ].map(({ label, value }) => (
//               <button
//                 key={value}
//                 onClick={() => setSortOption(sortOption === value ? '' : value)}
//                 className={`px-4 py-2 rounded border transition-colors ${
//                   sortOption === value
//                     ? 'bg-green-600 text-white border-green-600'
//                     : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
//                 }`}
//                 aria-label={`Sort by ${label}`}
//               >
//                 {label}
//               </button>
//             ))}
//           </div>

//           {hasFilters && (
//             <button
//               onClick={resetFilters}
//               className="px-3 py-2 text-sm text-green-600 hover:text-green-800 flex items-center"
//             >
//               Clear all
//               <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           )}
//         </div>

//         {/* Error state */}
//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-red-700">{error}. Please try again later.</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Product Grid */}
//         {!error && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {isLoading
//               ? Array.from({ length: 8 }).map((_, index) => (
//                   <ProductCardSkeleton key={index} />
//                 ))
//               : displayedProducts.map((product) => (
//                   <ProductCard 
//                     key={product.id} 
//                     product={product} 
//                     showBadges={true}
//                     showFarmer={true}
//                   />
//                 ))}
//           </div>
//         )}

//         {/* View All Button */}
//         {!error && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className="text-center mt-8"
//           >
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-colors"
//               onClick={() => navigate('/all-products')}
//             >
//               View All Products
//             </motion.button>
//           </motion.div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ProductGrid;