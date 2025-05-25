// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // for navigation
// import { motion } from 'framer-motion';
// import { products } from '../data/products';
// import ProductCard from './ProductCard';
// import ProductCardSkeleton from './ProductCardSkeleton';

// const ProductGrid = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate(); // navigation hook

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 800);
//     return () => clearTimeout(timer);
//   }, []);

//   // Only show first 8 products
//   const limitedProducts = products.slice(0, 8);

//   return (
//     <section className="py-12 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-8 text-green-800">
//           Fresh From the Farm
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {isLoading ? (
//             Array(8).fill().map((_, i) => <ProductCardSkeleton key={i} />)
//           ) : (
//             limitedProducts.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))
//           )}
//         </div>

//         {/* View More Button */}
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
// src/components/ProductGrid.js
// src/components/ProductGrid.js
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
  const displayedProducts = filteredSortedProducts.slice(0, 8);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-green-800">
          Fresh From the Farm
        </h2>

        {/* Filter & Sort UI */}
        <div className="flex flex-wrap gap-4 justify-center text-black mb-6">
          <select
            value={categoryFilter}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border rounded"
          >
            <option value="">All Categories</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="grains">Grains</option>
            <option value="dairy">Dairy</option>
            <option value="organic">Organic</option>
            <option value="spices">Spices</option>
            <option value="herbs">Herbs</option>
            <option value="pulses">Pulses</option>
            <option value="flowers">Flowers</option>
            <option value="seeds">Seeds</option>
          </select>

          {/* Sort Controls — Responsive */}
          {/* Mobile: dropdown */}
          <div className="block md:hidden">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-3 py-2 border rounded w-full"
            >
              <option value="">Sort By</option>
              <option value="priceLowHigh">Price: Low → High</option>
              <option value="priceHighLow">Price: High → Low</option>
              <option value="nameAZ">Name: A → Z</option>
              <option value="nameZA">Name: Z → A</option>
              <option value="ratingHighLow">Rating: ★ High → Low</option>
            </select>
          </div>

          {/* Desktop: buttons */}
          <div className="hidden md:flex flex-wrap gap-2">
            {[
              { label: 'Price ↑', value: 'priceLowHigh' },
              { label: 'Price ↓', value: 'priceHighLow' },
              { label: 'Name A-Z', value: 'nameAZ' },
              { label: 'Name Z-A', value: 'nameZA' },
              { label: 'Rating ★', value: 'ratingHighLow' },
            ].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setSortOption(value)}
                className={`px-4 py-2 rounded border ${
                  sortOption === value
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} showBadges={true} />
              ))}
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


// import { useState, useEffect } from 'react';
// import ProductCard from './ProductCard';
// import ProductCardSkeleton from './ProductCardSkeleton';

// const ProductGrid = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [products, setProducts] = useState([]); // Initialize as empty array

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         // Simulate API call (replace with real fetch later)
//         await new Promise(resolve => setTimeout(resolve, 1500));
        
//         // Mock data - replace with your actual data source
//         const mockProducts = [
//           {
//             id: 1,
//             name: "Organic Tomatoes",
//             price: 2.99,
//             unit: "kg",
//             farmer: "Raju Farms",
//             image: "/images/tomatoes.webp",
//             rating: 4.5,
//           },
//           // Add more mock products here...
//         ];
        
//         setProducts(mockProducts);
//       } catch (error) {
//         console.error("Failed to load products:", error);
//         setProducts([]); // Ensure it's always an array
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//       {isLoading ? (
//         Array(8).fill().map((_, i) => <ProductCardSkeleton key={i} />)
//       ) : (
//         products?.length > 0 ? (
//           products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))
//         ) : (
//           <div className="col-span-full text-center py-12">
//             <p className="text-gray-500">No products available</p>
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default ProductGrid;