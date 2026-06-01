import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ className = "" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <form onSubmit={handleSearch} className={`flex w-full group ${className}`}>
      <select 
        className="select select-sm lg:select-md rounded-l-lg bg-gray-100 text-black text-sm border-r-0 focus:outline-none hidden sm:block"
        name="category"
      >
        <option value="all">All</option>
        <option value="vegetables">Vegetables</option>
        <option value="fruits">Fruits</option>
        <option value="grains">Grains</option>
        <option value="dairy">Dairy</option>
        <option value="spices">Spices</option>
      </select>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search fresh products..."
        className="input input-sm lg:input-md w-full sm:rounded-none rounded-l-lg border-x-0 bg-white text-black focus:outline-none text-sm placeholder:text-gray-500"
      />
      <button 
        type="submit"
        className="btn btn-sm lg:btn-md btn-square bg-green-500 hover:bg-green-600 text-white rounded-r-lg border-0"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;
