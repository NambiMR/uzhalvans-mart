import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiPhone, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';

const API_URL = 'http://localhost:5000/api/auth';

const AuthForm = ({ isLogin, userType }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const isFarmer = userType === 'farmer';
    const accentColor = isFarmer ? 'indigo' : 'green';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const endpoint = isLogin ? '/login' : '/register';
            const payload = isLogin 
                ? { email: formData.email, password: formData.password }
                : { ...formData, role: userType };

            const { data } = await axios.post(`${API_URL}${endpoint}`, payload);
            localStorage.setItem('userInfo', JSON.stringify(data));
            
            toast.success(isLogin ? 'Welcome back! 🌿' : 'Account created successfully! 🌱');
            
            const redirectPath = data.role === 'admin' ? '/admin' : data.role === 'farmer' ? '/farmer' : '/';
            navigate(redirectPath);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = `w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-${accentColor}-500 focus:bg-white transition-all font-medium text-slate-700`;

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="mb-8">
                <h2 className="text-3xl font-black text-slate-800 mb-2">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-slate-500 font-medium text-sm">
                    {isLogin 
                        ? `Please enter your details to sign in to your ${userType} account.` 
                        : `Join our community of ${userType}s and start your journey today.`}
                </p>
            </div>

            {!isLogin && (
                <div className="relative group">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClasses}
                        required
                    />
                </div>
            )}

            <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                />
            </div>

            {!isLogin && (
                <div className="relative group">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClasses}
                        required
                    />
                </div>
            )}

            <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={inputClasses}
                    required
                    minLength="6"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
            </div>

            {isLogin && (
                <div className="flex justify-end">
                    <button type="button" className={`text-sm font-bold text-${accentColor}-600 hover:opacity-80 transition-opacity`}>
                        Forgot Password?
                    </button>
                </div>
            )}

            <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={`w-full bg-${accentColor}-600 hover:bg-${accentColor}-700 disabled:bg-slate-300 text-white py-4 px-6 rounded-2xl font-black text-lg shadow-xl shadow-${accentColor}-500/20 transition-all flex items-center justify-center gap-3 mt-4`}
            >
                {loading ? 'Processing...' : (
                    <>
                        {isLogin ? 'Sign In' : 'Create Account'}
                        <FiArrowRight />
                    </>
                )}
            </motion.button>
        </form>
    );
};

export default AuthForm;