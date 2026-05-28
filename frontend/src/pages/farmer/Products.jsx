// src/pages/farmer/Products.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiPackage } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

const CATEGORIES = [
  'vegetables', 'fruits', 'dairy', 'grains', 'spices', 'herbs', 'pulses', 'flowers', 'seeds', 'organic'
];
const UNITS = ['kg', 'bunch', 'litre', 'piece', 'box', 'gram', 'packet'];

const emptyForm = {
  name: '', description: '', category: 'vegetables', price: '', oldPrice: '',
  unit: 'kg', stock: '', images: '', harvestDate: '', isOrganic: false, status: 'active'
};

const FarmerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  // ── Fetch Products ──────────────────────────────────────
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/my-products`);
      setProducts(data);
    } catch (err) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // ── Handle Input Change ─────────────────────────────────
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // ── Submit (Create or Update) ───────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...form,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      stock: Number(form.stock),
      images: form.images ? form.images.split(',').map(s => s.trim()).filter(Boolean) : [],
    };

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, payload);
        toast.success('Product updated! 🎉');
      } else {
        await axios.post(API_URL, payload);
        toast.success('Product created! 🌱');
      }
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Delete ──────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success('Product deleted');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  // ── Edit ────────────────────────────────────────────────
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      oldPrice: product.oldPrice || '',
      unit: product.unit,
      stock: product.stock,
      images: (product.images || []).join(', '),
      harvestDate: product.harvestDate ? product.harvestDate.split('T')[0] : '',
      isOrganic: product.isOrganic,
      status: product.status,
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  // ── Cancel ──────────────────────────────────────────────
  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">

      {/* ── Page Header ────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-gray-900">My Products</h1>
          <p className="text-gray-400 text-sm mt-1">{products.length} total products in your catalog</p>
        </div>
        {!showForm && (
          <button
            onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }}
            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-green-200"
          >
            <FiPlus /> Add New Product
          </button>
        )}
      </div>

      {/* ── Product Form (Slide Down) ──────────────────────── */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-8"
          >
            <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-6 lg:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-gray-900">
                  {editingId ? '✏️ Edit Product' : '🌱 New Product'}
                </h2>
                <button type="button" onClick={handleCancel} className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors">
                  <FiX size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Product Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g., Fresh Tomatoes"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Category *</label>
                  <select name="category" value={form.category} onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 capitalize">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Price (₹) *</label>
                  <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required placeholder="0.00"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>

                {/* Old Price */}
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Old Price (₹) <span className="text-gray-300">optional</span></label>
                  <input name="oldPrice" type="number" step="0.01" value={form.oldPrice} onChange={handleChange} placeholder="For 'On Sale' badge"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>

                {/* Unit */}
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Unit *</label>
                  <select name="unit" value={form.unit} onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500">
                    {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Stock Quantity *</label>
                  <input name="stock" type="number" value={form.stock} onChange={handleChange} required placeholder="Available units"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>

                {/* Harvest Date */}
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Harvest Date *</label>
                  <input name="harvestDate" type="date" value={form.harvestDate} onChange={handleChange} required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Status</label>
                  <select name="status" value={form.status} onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>

                {/* Images */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Image URLs <span className="text-gray-300">comma separated</span></label>
                  <input name="images" value={form.images} onChange={handleChange} placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Description *</label>
                  <textarea name="description" value={form.description} onChange={handleChange} required rows="3" placeholder="Describe your produce, farming practices, and quality..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" />
                </div>

                {/* Organic Toggle */}
                <div className="flex items-center gap-3 md:col-span-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      onClick={() => setForm(prev => ({ ...prev, isOrganic: !prev.isOrganic }))}
                      className={`w-12 h-6 rounded-full transition-all relative cursor-pointer ${form.isOrganic ? 'bg-green-600' : 'bg-gray-200'}`}
                    >
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${form.isOrganic ? 'left-6' : 'left-0.5'}`} />
                    </div>
                    <div className="flex items-center gap-2">
                      <FaLeaf className={form.isOrganic ? 'text-green-600' : 'text-gray-400'} />
                      <span className="text-sm font-bold text-gray-700">Organic Certified</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                <button type="button" onClick={handleCancel}
                  className="px-6 py-3 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-100 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={submitting}
                  className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-green-200">
                  <FiCheck />
                  {submitting ? 'Saving...' : editingId ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Products List ──────────────────────────────────── */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-xl" />
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-40 mb-2" />
                  <div className="h-4 bg-gray-100 rounded w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <FiPackage className="text-6xl text-gray-300 mb-6" />
          <h3 className="text-xl font-black text-gray-600 mb-2">No Products Yet</h3>
          <p className="text-gray-400 text-sm mb-8 max-w-md">
            Start by adding your first product. Share what you've harvested and connect with buyers across Tamil Nadu!
          </p>
          <button
            onClick={() => { setForm(emptyForm); setShowForm(true); }}
            className="inline-flex items-center gap-2 bg-green-700 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-green-200"
          >
            <FiPlus /> Add Your First Product
          </button>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                {product.images?.[0] ? (
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <FiPackage size={24} />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-gray-900">{product.name}</h3>
                  {product.isOrganic && (
                    <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                      <FaLeaf className="text-[8px]" /> Organic
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-0.5">
                  ₹{product.price}/{product.unit} · Stock: {product.stock} · {product.category}
                </p>
                {product.harvestDate && (
                  <p className="text-xs text-gray-400 mt-1">
                    Harvested: {new Date(product.harvestDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                )}
              </div>

              {/* Status Badge */}
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap ${
                product.status === 'active' ? 'bg-green-100 text-green-700' :
                product.status === 'draft' ? 'bg-gray-100 text-gray-600' :
                'bg-red-100 text-red-600'
              }`}>
                {product.status === 'out_of_stock' ? 'Out of Stock' : product.status}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                  title="Edit"
                >
                  <FiEdit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                  title="Delete"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmerProducts;