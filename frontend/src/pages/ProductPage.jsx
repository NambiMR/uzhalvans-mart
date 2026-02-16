import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryParam = searchParams.get('category');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (categoryParam) {
      const filtered = products.filter(
        (p) => p.category.toLowerCase() === categoryParam.toLowerCase()
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [categoryParam]);

  return (
    <div className='bg-white border-t border-green-300 pt-6  text-sm"'>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold text-center mb-8 text-green-800">
        {categoryParam
          ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} Products`
          : 'All Products'}
      </h1>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-600">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => navigate(`/products/${product.id}`)}
            />
          ))}
        </div>
      )}
    </motion.div>
    </div>
  );
};

export default ProductsPage;
