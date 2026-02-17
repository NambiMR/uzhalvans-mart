import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ isMobile = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const navigate = useNavigate();

  // Load search history from localStorage
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    const filteredHistory = history
      .map(item => typeof item === 'object' ? item.query : item)
      .filter(item => typeof item === 'string')
      .slice(0, 5);
    setSearchHistory(filteredHistory);
  }, []);

  const handleSearch = (e) => {
  e.preventDefault();
  const trimmedTerm = searchTerm.trim();
  
  if (trimmedTerm) {
    // Update search history
    const updatedHistory = [
      trimmedTerm, 
      ...searchHistory.filter(term => term.toLowerCase() !== trimmedTerm.toLowerCase())
    ].slice(0, 5);
    
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    setSearchHistory(updatedHistory);
    
    // Force navigation even if we're already on the search page
    navigate(`/search?q=${encodeURIComponent(trimmedTerm)}&category=${category}`);
    
    setShowSuggestions(false);
    
    if (isMobile) {
      setSearchTerm('');
    }
  }
};


  const clearSearch = () => {
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const selectSuggestion = (term) => {
    setSearchTerm(term);
    navigate(`/search?q=${encodeURIComponent(term)}&category=${category}`);
    setShowSuggestions(false);
  };

  // Popular search suggestions
  const popularSearches = ['Tomatoes', 'Apples', 'Organic Milk', 'Basmati Rice'];

  return (
    <form 
      onSubmit={handleSearch}
      className={`relative ${isMobile ? 'w-full' : 'flex-grow max-w-2xl'}`}
    >
      <div className="flex">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered rounded-r-none bg-gray-100 border-gray-300 focus:outline-none"
          aria-label="Select category"
        >
          <option value="all">All Categories</option>
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
          <option value="grains">Grains</option>
          <option value="dairy">Dairy</option>
          <option value="organic">Organic</option>
        </select>
        
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search products..."
            className="input input-bordered rounded-none border-x-0 w-full focus:outline-none"
            aria-label="Search products"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </div>
        
        <button
          type="submit"
          className="btn btn-square bg-green-600 text-white hover:bg-green-700 rounded-l-none"
          aria-label="Submit search"
        >
          <FaSearch />
        </button>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && searchTerm && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="py-2">
            {/* Current search */}
            <button
              type="button"
              onClick={() => selectSuggestion(searchTerm)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 font-medium"
            >
              Search for "{searchTerm}"
            </button>

            {/* Search history */}
            {searchHistory.length > 0 && (
              <>
                <div className="px-4 py-1 text-xs text-gray-500 border-t border-gray-100">Recent searches</div>
                {searchHistory.map((term, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => selectSuggestion(term)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                  >
                    <FaSearch className="mr-2 text-gray-400" />
                    {term}
                  </button>
                ))}
              </>
            )}

            {/* Popular searches */}
            <div className="px-4 py-1 text-xs text-gray-500 border-t border-gray-100">Popular searches</div>
            {popularSearches.map((term, index) => (
              <button
                key={`popular-${index}`}
                type="button"
                onClick={() => selectSuggestion(term)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </form>
  );
};

export default SearchBar;