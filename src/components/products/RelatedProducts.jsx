// src/components/products/RelatedProducts.jsx
import { products } from '../../data/products';
import ProductCard from '../ProductCard'; // Adjusted import path

const RelatedProducts = ({ currentProductId }) => {
  const currentProduct = products.find(p => p.id === currentProductId);
  const related = products
    .filter(p => 
      p.id !== currentProductId && 
      p.category === currentProduct.category
    )
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-16">
      <h3 className="text-xl font-bold mb-6">You may also like</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {related.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;