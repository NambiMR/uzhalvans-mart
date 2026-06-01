import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiGrid, FiImage, FiAlignLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/categories';

const emptyForm = {
    name: '',
    description: '',
    image: '',
    isActive: true
};

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get(API_URL);
            setCategories(data);
        } catch (err) {
            toast.error('Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCategories(); }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        };

        try {
            if (editingId) {
                await axios.put(`${API_URL}/${editingId}`, form, config);
                toast.success('Category updated! 📦');
            } else {
                await axios.post(API_URL, form, config);
                toast.success('Category created! ✨');
            }
            setShowForm(false);
            setEditingId(null);
            setForm(emptyForm);
            fetchCategories();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this category?')) return;
        
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        };

        try {
            await axios.delete(`${API_URL}/${id}`, config);
            toast.success('Category deleted');
            fetchCategories();
        } catch (err) {
            toast.error('Failed to delete');
        }
    };

    const handleEdit = (category) => {
        setForm({
            name: category.name,
            description: category.description,
            image: category.image,
            isActive: category.isActive
        });
        setEditingId(category._id);
        setShowForm(true);
    };

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-800">Master Categories</h1>
                    <p className="text-slate-500 font-medium">{categories.length} total categories active</p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }}
                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-100"
                    >
                        <FiPlus /> New Category
                    </button>
                )}
            </div>

            {/* Form */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mb-10"
                    >
                        <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    {editingId ? <FiEdit2 /> : <FiPlus />}
                                    {editingId ? 'Edit Category' : 'Create New Category'}
                                </h2>
                                <button type="button" onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-50 rounded-full text-slate-400">
                                    <FiX size={24} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <FiGrid /> Category Name
                                        </label>
                                        <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g., Organic Grains"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <FiImage /> Image URL
                                        </label>
                                        <input name="image" value={form.image} onChange={handleChange} required placeholder="https://unsplash.com/..."
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <FiAlignLeft /> Description
                                    </label>
                                    <textarea name="description" value={form.description} onChange={handleChange} required rows="5" placeholder="What kind of products belong here?"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none" />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 mt-10 pt-8 border-t border-slate-50">
                                <button type="button" onClick={() => setShowForm(false)}
                                    className="px-8 py-4 rounded-2xl font-bold text-sm text-slate-500 hover:bg-slate-50 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" disabled={submitting}
                                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white px-10 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-100">
                                    {submitting ? 'Processing...' : editingId ? 'Update Category' : 'Save Category'}
                                    <FiCheck />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* List */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => <div key={i} className="h-64 bg-slate-100 rounded-[2rem] animate-pulse" />)}
                </div>
            ) : categories.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100">
                    <FiGrid className="text-6xl text-slate-200 mx-auto mb-6" />
                    <h3 className="text-xl font-bold text-slate-600">No categories found</h3>
                    <p className="text-slate-400 mt-2">Create your first category to start organizing products.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map(category => (
                        <motion.div
                            key={category._id}
                            layout
                            className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden group hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
                        >
                            <div className="h-40 bg-slate-200 relative overflow-hidden">
                                {category.image ? (
                                    <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400"><FiImage size={40} /></div>
                                )}
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button onClick={() => handleEdit(category)} className="p-2.5 bg-white/90 backdrop-blur rounded-xl text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                                        <FiEdit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(category._id)} className="p-2.5 bg-white/90 backdrop-blur rounded-xl text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                                        <FiTrash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-black text-slate-800">{category.name}</h3>
                                <p className="text-slate-500 text-sm mt-2 line-clamp-2 font-medium leading-relaxed">{category.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminCategories;
