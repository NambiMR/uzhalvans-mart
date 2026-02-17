// src/pages/ProductDetail.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiHeart, FiShare2 } from 'react-icons/fi';
import ProductGallery from '../components/products/ProductGallery';
import QuantitySelector from '../components/products/QuantitySelector';
import ProductTabs from '../components/products/ProductTabs';
import RelatedProducts from '../components/products/RelatedProducts';
import { products } from '../data/products';


const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = products.find(p => p.id === parseInt(id));
  if (!product) {
    navigate('/404');
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white"
    >
      {/* Header with back button */}
      <div className="container mx-auto px-4 py-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-green-600 hover:text-green-800"
        >
          <FiArrowLeft className="mr-2" />
          Back to Shop
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <ProductGallery images={product.images || [product.image]} />
          </div>

          {/* Product Info */}
          <div className="sticky top-4">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
              >
                <FiHeart className="text-2xl" />
              </button>
            </div>

            {/* Farmer Info */}
            <div className="flex items-center my-4">
              <img 
                src={product.farmerAvatar} 
                alt={product.farmer}
                className="w-10 h-10 rounded-full mr-3 text-amber-800"
              />
              <div>
                <p className="text-sm text-gray-600">Sold by</p>
                <p className=" text-green-600 font-medium">{product.farmer}</p>
              </div>
            </div>

            {/* Price */}
            <div className="my-6">
              <span className="text-3xl font-bold text-green-600">
                ₹{product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="ml-2 text-lg text-gray-400 line-through">
                  ₹{product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <QuantitySelector 
              quantity={quantity}
              onIncrease={() => setQuantity(q => q + 1)}
              onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
              className="my-8"
            />

            {/* Add to Cart */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium"
            >
              Add to Cart - ₹{(product.price * quantity).toFixed(2)}
            </motion.button>

            {/* Product Tabs */}
            <ProductTabs product={product} />
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts currentProductId={product.id} />
      </div>
    </motion.div>
  );
};

export default ProductDetail;