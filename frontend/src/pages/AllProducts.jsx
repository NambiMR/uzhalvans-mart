// src/pages/AllProducts.jsx
import { useState, useMemo } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';
import { FaLeaf, FaFire, FaStar } from 'react-icons/fa';

// ─── Static Data ─────────────────────────────────────────────────────────────
const CATEGORIES = [
  { value: '', label: 'All', emoji: '🌾' },
  { value: 'vegetables', label: 'Vegetables', emoji: '🥦' },
  { value: 'fruits', label: 'Fruits', emoji: '🍎' },
  { value: 'grains', label: 'Grains', emoji: '🌾' },
  { value: 'dairy', label: 'Dairy', emoji: '🥛' },
  { value: 'spices', label: 'Spices', emoji: '🌶️' },
  { value: 'herbs', label: 'Herbs', emoji: '🌿' },
  { value: 'pulses', label: 'Pulses', emoji: '🫘' },
  { value: 'flowers', label: 'Flowers', emoji: '🌸' },
  { value: 'seeds', label: 'Seeds', emoji: '🌱' },
  { value: 'organic', label: 'Organic', emoji: '✅' },
];

const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'priceLowHigh', label: 'Price: Low → High' },
  { value: 'priceHighLow', label: 'Price: High → Low' },
  { value: 'ratingHighLow', label: 'Best Rated First' },
  { value: 'freshness', label: 'Freshness (Newest)' },
  { value: 'nameAZ', label: 'Name: A → Z' },
];

const PRICE_RANGES = [
  { value: '', label: 'Any Price' },
  { value: '0-1', label: 'Under ₹1' },
  { value: '1-3', label: '₹1 – ₹3' },
  { value: '3-6', label: '₹3 – ₹6' },
  { value: '6-99', label: 'Above ₹6' },
];

const AllProducts = () => {
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [onlyFresh, setOnlyFresh] = useState(false);
  const [onlyOffers, setOnlyOffers] = useState(false);

  const activeFilterCount = [category, priceRange, onlyFresh, onlyOffers].filter(Boolean).length;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (category) result = result.filter(p => p.category === category);

    // Price range filter
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      result = result.filter(p => p.price >= min && p.price <= max);
    }

    // Fresh filter — simulating "harvested today" with high-rated products
    if (onlyFresh) result = result.filter(p => p.rating >= 4.5);

    // Offers filter — only products with an old price
    if (onlyOffers) result = result.filter(p => p.oldPrice);

    // Sort
    switch (sortBy) {
      case 'priceLowHigh': result.sort((a, b) => a.price - b.price); break;
      case 'priceHighLow': result.sort((a, b) => b.price - a.price); break;
      case 'ratingHighLow': result.sort((a, b) => b.rating - a.rating); break;
      case 'freshness': result.sort((a, b) => b.id - a.id); break; // Newest = highest ID
      case 'nameAZ': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }

    return result;
  }, [category, sortBy, priceRange, onlyFresh, onlyOffers]);

  const clearAllFilters = () => {
    setCategory('');
    setSortBy('');
    setPriceRange('');
    setOnlyFresh(false);
    setOnlyOffers(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24 lg:pb-10">

      {/* ── Page Header ─────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-black text-gray-900">Farm Fresh Shop</h1>
            <p className="text-xs text-gray-400">{filteredProducts.length} products available</p>
          </div>

          {/* Sort + Filter Row */}
          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="relative hidden sm:block">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="appearance-none bg-gray-100 text-gray-700 font-semibold text-sm pl-4 pr-10 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${showFilters || activeFilterCount > 0
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              <FiFilter />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-white text-green-700 w-5 h-5 rounded-full text-xs font-black flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ── Expandable Filter Panel ─────────────────────── */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-gray-100"
            >
              <div className="container mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Price Range */}
                <div>
                  <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Price Range</p>
                  <div className="flex flex-wrap gap-2">
                    {PRICE_RANGES.map(r => (
                      <button
                        key={r.value}
                        onClick={() => setPriceRange(r.value)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${priceRange === r.value
                            ? 'bg-green-600 text-white border-green-600'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-green-400'
                          }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort (Mobile) */}
                <div className="sm:hidden">
                  <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Sort By</p>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="w-full bg-gray-100 text-gray-700 font-semibold text-sm px-4 py-2.5 rounded-xl focus:outline-none"
                  >
                    {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>

                {/* Quick Toggles */}
                <div>
                  <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Quick Filters</p>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div
                        onClick={() => setOnlyFresh(!onlyFresh)}
                        className={`w-12 h-6 rounded-full transition-all relative ${onlyFresh ? 'bg-green-600' : 'bg-gray-200'}`}
                      >
                        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${onlyFresh ? 'left-6' : 'left-0.5'}`} />
                      </div>
                      <div className="flex items-center gap-2">
                        <FaLeaf className={onlyFresh ? 'text-green-600' : 'text-gray-400'} />
                        <span className="text-sm font-bold text-gray-700">Fresh Harvest Only</span>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div
                        onClick={() => setOnlyOffers(!onlyOffers)}
                        className={`w-12 h-6 rounded-full transition-all relative ${onlyOffers ? 'bg-orange-500' : 'bg-gray-200'}`}
                      >
                        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${onlyOffers ? 'left-6' : 'left-0.5'}`} />
                      </div>
                      <div className="flex items-center gap-2">
                        <FaFire className={onlyOffers ? 'text-orange-500' : 'text-gray-400'} />
                        <span className="text-sm font-bold text-gray-700">On Sale / Offers</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Clear Filters */}
                {activeFilterCount > 0 && (
                  <div className="flex items-end">
                    <button
                      onClick={clearAllFilters}
                      className="flex items-center gap-2 text-red-500 font-bold text-sm hover:text-red-700 transition-colors"
                    >
                      <FiX /> Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="container mx-auto px-4 pt-8">
        {/* ── Category Pill Tabs ───────────────────────────── */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all border ${category === cat.value
                  ? 'bg-green-600 text-white border-green-600 shadow-lg shadow-green-100'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-600'
                }`}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Active Filters Summary ───────────────────────── */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {category && <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">{CATEGORIES.find(c => c.value === category)?.emoji} {CATEGORIES.find(c => c.value === category)?.label} <FiX className="cursor-pointer" onClick={() => setCategory('')} /></span>}
            {priceRange && <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">💰 {PRICE_RANGES.find(r => r.value === priceRange)?.label} <FiX className="cursor-pointer" onClick={() => setPriceRange('')} /></span>}
            {onlyFresh && <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"><FaLeaf /> Fresh Only <FiX className="cursor-pointer" onClick={() => setOnlyFresh(false)} /></span>}
            {onlyOffers && <span className="bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"><FaFire /> On Sale <FiX className="cursor-pointer" onClick={() => setOnlyOffers(false)} /></span>}
          </div>
        )}

        {/* ── Product Grid ─────────────────────────────────── */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-7xl mb-6">🌾</span>
            <h3 className="text-2xl font-black text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-400 mb-8">Try adjusting your filters to find what you need.</p>
            <button onClick={clearAllFilters} className="bg-green-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-green-700 transition-colors">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
