import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { FaSearch, FaTimes, FaSpinner } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';
import { useSearchParams } from 'react-router-dom'; // Add this import

const SearchResults = () => {
  const [searchParams] = useSearchParams(); // ✅ Proper reactive URL params
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState('relevant');

  // Get search parameters from URL
  const searchTerm = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';

  useEffect(() => {
  console.log('Search params changed', searchParams.toString());
  setIsLoading(true);
  
  const timer = setTimeout(() => {
    const results = filterProducts();
    sortProducts(results, sortOption);
    setIsLoading(false);
  }, 300);

  return () => clearTimeout(timer);
}, [searchTerm, category, sortOption, searchParams]); // Add searchParams to dependencies


  const filterProducts = useCallback(() => {
  let results = [...products];

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    results = results.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.tags?.some(tag => tag.toLowerCase().includes(term))
    );
  }

  if (category !== 'all') {
    results = results.filter(product => product.category === category);
  }

  return results;
}, [searchTerm, category]); // Make it memoized
  

const sortProducts = useCallback((productsToSort, option) => {
  const sorted = [...productsToSort];
  
  switch(option) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    default:
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        sorted.sort((a, b) => {
          const aNameMatch = a.name.toLowerCase().includes(term);
          const bNameMatch = b.name.toLowerCase().includes(term);
          if (aNameMatch && !bNameMatch) return -1;
          if (!aNameMatch && bNameMatch) return 1;
          return b.rating - a.rating;
        });
      }
  }
  
  setFilteredProducts(sorted);
}, [searchTerm]);

  const clearFilters = () => {
    navigate('/search');
  };

  const getCategoryName = (cat) => {
    const names = {
      vegetables: 'Vegetables',
      fruits: 'Fruits',
      grains: 'Grains',
      dairy: 'Dairy',
      organic: 'Organic'
    };
    return names[cat] || cat;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Search Header */}
        <div className="mb-8">
          <div className="mb-4">
            <SearchBar />
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {searchTerm 
                ? `Search Results for "${searchTerm}"`
                : 'Browse All Products'}
              {filteredProducts.length > 0 && !isLoading && (
                <span className="text-lg font-normal text-gray-500 ml-2">
                  ({filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'})
                </span>
              )}
            </h1>
            
            {(searchTerm || category !== 'all') && (
              <div className="flex items-center">
                {category !== 'all' && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2">
                    {getCategoryName(category)}
                    <button 
                      onClick={() => navigate(`/search?q=${searchTerm}`)}
                      className="ml-1 text-green-600 hover:text-green-800"
                    >
                      <FaTimes className="inline" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Area */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-4 rounded-lg shadow-sm sticky top-4">
              <h3 className="font-medium text-lg mb-4">Sort By</h3>
              <div className="space-y-2">
                {[
                  { value: 'relevant', label: 'Most Relevant' },
                  { value: 'price-asc', label: 'Price: Low to High' },
                  { value: 'price-desc', label: 'Price: High to Low' },
                  { value: 'rating', label: 'Highest Rated' },
                  { value: 'newest', label: 'Newest Arrivals' },
                ].map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      id={`sort-${option.value}`}
                      type="radio"
                      name="sort"
                      checked={sortOption === option.value}
                      onChange={() => setSortOption(option.value)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500"
                    />
                    <label htmlFor={`sort-${option.value}`} className="ml-2 text-gray-700">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              
              <h3 className="font-medium text-lg mt-6 mb-4">Categories</h3>
              <div className="space-y-2">
                {['all', 'vegetables', 'fruits', 'grains', 'dairy', 'organic'].map((cat) => (
                  <div key={cat} className="flex items-center">
                    <input
                      id={`cat-${cat}`}
                      type="radio"
                      name="category"
                      checked={category === cat}
                      onChange={() => navigate(`/search?q=${encodeURIComponent(searchTerm)}&category=${cat}`)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500"
                    />
                    <label htmlFor={`cat-${cat}`} className="ml-2 text-gray-700">
                      {getCategoryName(cat)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Loading State */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <FaSpinner className="animate-spin text-4xl text-green-600" />
              </div>
            ) : (
              <>
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        highlightText={searchTerm}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <div className="text-gray-400 mb-4">
                      <FaSearch className="inline-block text-5xl" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      {searchTerm 
                        ? `No products found for "${searchTerm}"`
                        : 'No products match your filters'}
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Try adjusting your search or filters
                    </p>
                    <button
                      onClick={clearFilters}
                      className="btn btn-outline btn-primary"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;