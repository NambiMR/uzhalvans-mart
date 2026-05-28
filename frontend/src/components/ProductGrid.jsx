// src/components/ProductGrid.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import { useFilteredSortedProducts } from '../hooks/useFilteredSortedProducts';

const ProductGrid = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryFilter, setCategory] = useState('');
  const [sortOption, setSortOption] = useState('ratingHighLow');
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filteredSortedProducts = useFilteredSortedProducts(products, categoryFilter, sortOption);
  const displayedProducts = filteredSortedProducts.slice(0, 8);

  const CATEGORIES = [
    { value: '', label: 'All' },
    { value: 'vegetables', label: '🥦 Veg' },
    { value: 'fruits', label: '🍎 Fruits' },
    { value: 'grains', label: '🌾 Grains' },
    { value: 'dairy', label: '🥛 Dairy' },
    { value: 'spices', label: '🌶️ Spices' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h4 className="text-green-600 font-bold uppercase tracking-widest text-xs mb-2">
              Today's Harvest
            </h4>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
              Fresh From the Farm
            </h2>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${
                  categoryFilter === cat.value
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : displayedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
          }
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-green-700 hover:bg-green-800 text-white px-10 py-4 rounded-2xl font-bold text-base shadow-xl shadow-green-100 transition-all"
            onClick={() => navigate('/all-products')}
          >
            Explore All Products
            <FaArrowRight className="text-sm" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGrid;