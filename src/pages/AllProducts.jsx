// src/pages/AllProducts.js
import { useState } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useFilteredSortedProducts } from '../hooks/useFilteredSortedProducts';

const AllProducts = () => {
  const [categoryFilter, setCategory] = useState('');
  const [sortOption, setSortOption]   = useState('');

  // get the filtered & sorted array
  const filteredSortedProducts = useFilteredSortedProducts(
    products,
    categoryFilter,
    sortOption
  );

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-green-800">
          All Products
        </h2>

        {/* ——— FILTER & SORT UI ——— */}
        <div className="flex flex-wrap gap-4 justify-center text-black mb-6">
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
              <option value="nameAZ">Name: A → Z</option>
              <option value="nameZA">Name: Z → A</option>
              <option value="ratingHighLow">Rating: ★ High → Low</option>
            </select>
          </div>

          {/* Desktop: sort buttons */}
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

        {/* ——— PRODUCT GRID ——— */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
