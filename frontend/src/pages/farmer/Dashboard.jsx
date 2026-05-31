// src/pages/farmer/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPackage, FiAlertTriangle, FiTrendingUp, FiPlus, FiArrowRight } from 'react-icons/fi';
import { FaLeaf, FaBoxOpen } from 'react-icons/fa';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

const StatCard = ({ icon: Icon, label, value, accent, subtext }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow`}
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${accent}`}>
      <Icon className="text-xl" />
    </div>
    <p className="text-3xl font-black text-gray-900">{value}</p>
    <p className="text-sm font-medium text-gray-500 mt-1">{label}</p>
    {subtext && <p className="text-xs text-gray-400 mt-2">{subtext}</p>}
  </motion.div>
);

const FarmerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [farmerName, setFarmerName] = useState('Farmer');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
          setFarmerName(userInfo.name || 'Farmer');
        }

        if (!userInfo?.token) return;

        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        };

        const { data } = await axios.get(`${API_URL}/my-products`, config);
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'active').length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 5).length;
  const outOfStock = products.filter(p => p.stock === 0 || p.status === 'out_of_stock').length;

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">

      {/* ── Welcome Header ──────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-gray-900">
            Welcome back, {farmerName}! 🌾
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Here's what's happening with your produce today.
          </p>
        </div>
        <Link
          to="/farmer/products"
          className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-green-200"
        >
          <FiPlus /> Add Product
        </Link>
      </div>

      {/* ── Stats Grid ──────────────────────────────────────── */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
              <div className="w-12 h-12 bg-gray-200 rounded-xl mb-4" />
              <div className="h-8 bg-gray-200 rounded w-16 mb-2" />
              <div className="h-4 bg-gray-100 rounded w-24" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard icon={FiPackage}        label="Total Products"   value={totalProducts}  accent="bg-green-100 text-green-700" />
          <StatCard icon={FaLeaf}           label="Active Listings"  value={activeProducts} accent="bg-emerald-100 text-emerald-700" />
          <StatCard icon={FiAlertTriangle}  label="Low Stock"        value={lowStock}       accent="bg-yellow-100 text-yellow-700" subtext="5 units or less" />
          <StatCard icon={FaBoxOpen}        label="Out of Stock"     value={outOfStock}     accent="bg-red-100 text-red-600" />
        </div>
      )}

      {/* ── Quick Actions ───────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-700 to-green-900 rounded-2xl p-8 text-white"
        >
          <h3 className="text-lg font-black mb-2">Add Your Harvest</h3>
          <p className="text-green-200 text-sm mb-6">
            List a new product with price, stock, and harvest date to reach thousands of buyers.
          </p>
          <Link
            to="/farmer/products"
            className="inline-flex items-center gap-2 bg-white text-green-800 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-green-50 transition-colors"
          >
            Go to Products <FiArrowRight />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm"
        >
          <h3 className="text-lg font-black text-gray-900 mb-2">Recent Products</h3>
          {products.length === 0 ? (
            <p className="text-gray-400 text-sm">No products yet. Add your first harvest!</p>
          ) : (
            <div className="space-y-3">
              {products.slice(0, 3).map(product => (
                <div key={product._id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-bold text-gray-800">{product.name}</p>
                    <p className="text-xs text-gray-400">₹{product.price}/{product.unit}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    product.status === 'active' ? 'bg-green-100 text-green-700' :
                    product.status === 'draft' ? 'bg-gray-100 text-gray-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {product.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* ── Tip Banner ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4"
      >
        <FiTrendingUp className="text-amber-600 text-2xl flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-amber-800 text-sm">Pro Tip</p>
          <p className="text-amber-700 text-sm mt-1">
            Products with harvest dates within the last 48 hours get 3x more views. 
            Keep your harvest dates updated for maximum visibility!
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default FarmerDashboard;