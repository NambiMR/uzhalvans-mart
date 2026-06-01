import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthForm from './AuthForm';
import AuthToggle from './AuthToggle';
import { FiCheck, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const AuthLayout = ({ title, description, benefits, userType }) => {
    const [isLogin, setIsLogin] = useState(true);
    const isFarmer = userType === 'farmer';
    
    // Explicit color mapping to prevent Tailwind purging dynamic classes
    const theme = isFarmer ? {
        primary: 'bg-indigo-600',
        text: 'text-indigo-600',
        gradientFrom: 'from-indigo-900/95',
        gradientVia: 'via-indigo-800/40',
        accent: 'bg-indigo-500',
        bg: 'bg-indigo-950' // Fallback bg
    } : {
        primary: 'bg-green-600',
        text: 'text-green-600',
        gradientFrom: 'from-green-900/95',
        gradientVia: 'via-green-800/40',
        accent: 'bg-green-500',
        bg: 'bg-green-950' // Fallback bg
    };

    const bgImage = isFarmer 
        ? "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop" 
        : "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2000&auto=format&fit=crop";

    return (
        <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden">
            {/* ── 🌄 Visual Half ───────────────────── */}
            <div className={`relative w-full lg:w-[45%] h-[300px] lg:h-screen overflow-hidden group ${theme.bg}`}>
                <img 
                    src={bgImage} 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[3s] opacity-60 mix-blend-overlay" 
                />
                <div className={`absolute inset-0 bg-gradient-to-tr ${theme.gradientFrom} ${theme.gradientVia} to-transparent`}></div>
                
                <Link to="/auth" className="absolute top-8 left-8 flex items-center gap-2 text-white/90 hover:text-white transition-colors group/back font-bold text-sm bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 z-20">
                    <FiArrowLeft className="group-hover/back:-translate-x-1 transition-transform" /> Back to Choice
                </Link>

                <div className="absolute bottom-10 left-10 right-10 text-white z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={title}
                    >
                        <h1 className="text-4xl lg:text-5xl font-black mb-4 leading-tight tracking-tighter uppercase">
                            {title}
                        </h1>
                        <p className="text-lg lg:text-xl text-white/80 font-medium mb-8 max-w-sm">
                            {description}
                        </p>
                        
                        <div className="hidden lg:grid grid-cols-1 gap-3">
                            {benefits.map((benefit, index) => (
                                <motion.div 
                                    key={index} 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 hover:bg-white/20 transition-all font-bold text-sm"
                                >
                                    <div className={`w-6 h-6 rounded-lg ${theme.accent} flex items-center justify-center text-white shadow-lg`}>
                                        <FiCheck size={14} />
                                    </div>
                                    <span className="text-white drop-shadow-sm">{benefit}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── 📝 Form Half ────────────────────── */}
            <div className="flex-1 flex flex-col justify-center items-center px-6 lg:px-20 py-12 bg-slate-50 relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-slate-100 rounded-full blur-[100px] -mr-48 -mt-48 opacity-50"></div>
                
                <div className="w-full max-w-md relative z-10">
                    <div className="bg-white p-8 lg:p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200 border border-white/50">
                        <AuthToggle isLogin={isLogin} setIsLogin={setIsLogin} userType={userType} />
                        
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isLogin ? 'login' : 'register'}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.15 }}
                            >
                                <AuthForm isLogin={isLogin} userType={userType} />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    
                    <div className="mt-10 text-center">
                        <p className="text-slate-400 text-sm font-medium">
                            By continuing, you agree to Uzhavan Mart's <br />
                            <Link to="/terms" className={`${theme.text} underline font-bold`}>Terms of Service</Link> and <Link to="/privacy" className={`${theme.text} underline font-bold`}>Privacy Policy</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;