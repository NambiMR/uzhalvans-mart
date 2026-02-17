// src/pages/AllProducts.js
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const AllProducts = () => {
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [categoryFilter, setCategory] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    // Get filter type from navigation state
    const filterType = location.state?.filterType || 'all';
    setActiveFilter(filterType);
  }, [location.state]);

  // Apply both the special filters (seasonal/bestsellers/toprated) and category/sort filters
  const getFilteredProducts = () => {
    let filtered = [...products];
    
    // Apply special filter first
    switch(activeFilter) {
      case 'seasonal':
        filtered = products.filter(p => p.isSeasonal);
        break;
      case 'bestsellers':
        filtered = [...products].sort((a, b) => b.sales - a.sales);
        break;
      case 'toprated':
        filtered = [...products].sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'all' products - no additional filtering
        break;
    }
    
    // Then apply category filter if specified
    if (categoryFilter) {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }
    
    return filtered;
  };

  // Apply sorting to the filtered products
  const getSortedProducts = (productsToSort) => {
    const sorted = [...productsToSort];
    
    switch(sortOption) {
      case 'priceLowHigh':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighLow':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'ratingHighLow':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sorting (keep the original order)
        break;
    }
    
    return sorted;
  };

  const filteredProducts = getFilteredProducts();
  const filteredSortedProducts = getSortedProducts(filteredProducts);

  const getFilterTitle = () => {
    switch(activeFilter) {
      case 'seasonal': return 'Seasonal Specials';
      case 'bestsellers': return 'Customer Favorites';
      case 'toprated': return 'Top Rated Products';
      default: return 'All Products';
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-800">
            {getFilterTitle()}
          </h1>
        </div>

        {/* ——— FILTER & SORT UI ——— */}
        <div className="flex flex-wrap gap-4 justify-between items-center mb-6 text-black">
          {/* Category filter dropdown */}
          <select
            value={categoryFilter}
            onChange={e => setCategory(e.target.value)}
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

          {/* Mobile: sort dropdown */}
          <div className="block md:hidden">
            <select
              value={sortOption}
              onChange={e => setSortOption(e.target.value)}
              className="px-3 py-2 border rounded w-full"
            >
              <option value="">Sort By</option>
              <option value="priceLowHigh">Price: Low → High</option>
              <option value="priceHighLow">Price: High → Low</option>
              <option value="ratingHighLow">Rating: ★ High → Low</option>
            </select>
          </div>

          {/* Desktop: sort buttons */}
          <div className="hidden md:flex flex-wrap gap-2">
            {[
              { label: 'Price ↑', value: 'priceLowHigh' },
              { label: 'Price ↓', value: 'priceHighLow' },
              { label: 'Rating ★', value: 'ratingHighLow' },
            ].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setSortOption(sortOption === value ? '' : value)}
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

        {/* ——— PRODUCT GRID ——— */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSortedProducts.map(product => (
            <ProductCard key={product.id} product={product} showBadges={true} />
          ))}
        </div>

        {filteredSortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProducts;