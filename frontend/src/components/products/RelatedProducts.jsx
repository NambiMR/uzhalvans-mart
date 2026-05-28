// src/components/products/RelatedProducts.jsx
import { products } from '../../data/products';
import ProductCard from '../ProductCard'; 
import { motion } from 'framer-motion';

const RelatedProducts = ({ currentProductId }) => {
  const currentProduct = products.find(p => p.id === currentProductId);
  
  const related = products
    .filter(p => 
      p.id !== currentProductId && 
      (p.category === currentProduct?.category || p.category === 'Vegetables')
    )
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-20 border-t border-gray-100 pt-16">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4 text-left">
        <div>
          <h4 className="text-green-600 font-bold uppercase tracking-widest text-xs mb-2">Picked for you</h4>
          <h3 className="text-3xl font-extrabold text-gray-900 leading-tight">Freshly Harvested <br className="hidden md:block"/> Recommendations</h3>
        </div>
        <button className="text-green-600 font-bold text-sm hover:underline decoration-2 underline-offset-4 transition-all">
          Explore All Products →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {related.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;