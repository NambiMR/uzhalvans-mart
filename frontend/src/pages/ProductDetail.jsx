import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiHeart, FiShare2, FiShield, FiClock, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp, FaShoppingCart } from 'react-icons/fa';
import ProductGallery from '../components/products/ProductGallery';
import QuantitySelector from '../components/products/QuantitySelector';
import ProductTabs from '../components/products/ProductTabs';
import RelatedProducts from '../components/products/RelatedProducts';
import { toast } from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api/products';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}/${id}`);
        setProduct(data);
      } catch (err) {
        toast.error('Product not found or farm connection lost');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    toast.success(`${product.name} added to cart!`, {
      style: {
        borderRadius: '15px',
        background: '#15803d',
        color: '#fff',
      },
    });
  };

  const shareProduct = () => {
    if (!product) return;
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on Uzhavan Mart!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Farm Product Not Found</h2>
        <button onClick={() => navigate('/all-products')} className="bg-green-600 text-white px-8 py-3 rounded-2xl font-bold">
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-50 min-h-screen pb-20 lg:pb-12"
    >
      {/* 🧭 Navigation Header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100 hidden lg:block">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-green-600 transition-colors font-medium"
          >
            <FiArrowLeft className="mr-2" />
            Back to Catalog
          </button>
          <div className="flex gap-4">
            <button onClick={shareProduct} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"><FiShare2 size={20} /></button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 hover:bg-red-50 rounded-full transition-colors ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
            >
              <FiHeart size={20} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>

      {/* 📱 Mobile Nav Floating Buttons */}
      <div className="lg:hidden fixed top-6 left-6 z-40">
        <button onClick={() => navigate(-1)} className="bg-white/90 backdrop-blur shadow-lg p-3 rounded-2xl text-gray-800"><FiArrowLeft size={24} /></button>
      </div>

      {/* 📦 Main Stage */}
      <div className="container mx-auto px-4 lg:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* 🖼️ Visuals Column */}
          <div className="lg:w-3/5">
            <div className="bg-white rounded-[2.5rem] p-4 lg:p-8 shadow-sm">
              <ProductGallery images={product.images || [product.image]} />
            </div>

            {/* Trust Badges - Desktop */}
            <div className="hidden lg:grid grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center p-6 bg-white rounded-3xl border border-gray-100 text-center">
                <FiShield className="text-green-600 mb-3" size={24} />
                <p className="font-bold text-gray-800 text-sm">Farmer Verified</p>
                <p className="text-xs text-gray-500">Certified Organic</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white rounded-3xl border border-gray-100 text-center">
                <FiClock className="text-blue-600 mb-3" size={24} />
                <p className="font-bold text-gray-800 text-sm">Picked Today</p>
                <p className="text-xs text-gray-500">Morning Harvest</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white rounded-3xl border border-gray-100 text-center">
                <FiMapPin className="text-orange-600 mb-3" size={24} />
                <p className="font-bold text-gray-800 text-sm">Low Food Miles</p>
                <p className="text-xs text-gray-500">From Local Farmer</p>
              </div>
            </div>
          </div>

          {/* 🏷️ Info Column */}
          <div className="lg:w-2/5">
            <div className="sticky top-24">
              {/* Product Title & Badge */}
              <div className="mb-6">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                  {product.category || 'Fresh Harvest'}
                </span>
                <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400"><span className="text-lg">★★★★★</span></div>
                  <span className="text-gray-400 text-sm font-medium">({product.reviewCount || 12} Authentic Farmer Reviews)</span>
                </div>
              </div>

              {/* Price & Weight info */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8">
                <div className="flex items-end gap-3 mb-6">
                  <span className="text-5xl font-black text-green-600">₹{product.price}</span>
                  {product.oldPrice && (
                    <span className="text-2xl text-gray-300 line-through mb-1">₹{product.oldPrice}</span>
                  )}
                  <span className="mb-2 text-gray-500 font-medium">/ 1Kg</span>
                </div>

                {/* Farmer Micro-profile */}
                <div className="flex items-center gap-4 py-4 border-y border-gray-50 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-green-50 overflow-hidden">
                    <img src={product.farmerAvatar || founder1} alt={product.farmer} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Harvested By</p>
                    <p className="font-bold text-gray-800">{product.farmer || 'Farmer Rajesh'}</p>
                    <p className="text-xs text-green-600 font-semibold italic">Verified Organic Farmer</p>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-sm font-bold text-gray-700 mb-3">Today's Order Quantity:</p>
                  <QuantitySelector
                    quantity={quantity}
                    onIncrease={() => setQuantity(q => q + 1)}
                    onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
                  />
                </div>

                {/* Main Actions */}
                <div className="flex flex-col gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="w-full h-16 bg-green-600 hover:bg-green-700 text-white rounded-2xl flex items-center justify-center gap-3 font-extrabold text-lg shadow-xl shadow-green-100 transition-all"
                  >
                    <FaShoppingCart /> Add to Basket — ₹{product.price * quantity}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-16 border-2 border-green-600 text-green-600 rounded-2xl flex items-center justify-center gap-3 font-extrabold text-lg hover:bg-green-50 transition-all"
                    onClick={() => window.open(`https://wa.me/+919876543210?text=I'm interested in ${product.name}`, '_blank')}
                  >
                    <FaWhatsapp size={22} /> Order via WhatsApp
                  </motion.button>
                </div>
              </div>

              {/* Collapsible Tabs (Description, Nutrition, Farmer Story) */}
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                <ProductTabs product={product} />
              </div>
            </div>
          </div>
        </div>

        {/* 🔄 Related Products Section */}
        <div className="mt-24">
          <RelatedProducts currentProductId={product._id} />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;