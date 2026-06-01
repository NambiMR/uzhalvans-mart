import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiFileText, FiShield, FiClock, FiCheckCircle } from 'react-icons/fi';

const TermsAndServices = () => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTerms = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/settings');
                setContent(data.termsContent || '');
            } catch (err) {
                toast.error('Failed to load terms');
            } finally {
                setLoading(false);
            }
        };
        fetchTerms();
    }, []);

    // Split content into paragraphs for better styling
    const paragraphs = content.split('\n\n').filter(p => p.trim() !== '');

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* ── 🌄 Hero Section ─────────────────────────────────── */}
            <div className="relative h-[40dvh] overflow-hidden flex items-center justify-center">
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0 scale-105"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80)' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 via-green-800/60 to-slate-50"></div>
                </div>
                
                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/30"
                    >
                        <FiShield className="text-white text-4xl" />
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight"
                    >
                        Terms of Service
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-green-100 font-medium max-w-xl mx-auto"
                    >
                        Building a transparent and trustworthy ecosystem for our farmers and consumers.
                    </motion.p>
                </div>
            </div>

            {/* ── 📜 Content Container ────────────────────────────── */}
            <div className="container mx-auto px-4 -mt-20 pb-24 relative z-20">
                <div className="max-w-4xl mx-auto">
                    
                    {/* Meta Info Bar */}
                    <div className="bg-white/80 backdrop-blur-xl border border-white p-4 rounded-3xl shadow-xl shadow-green-900/5 mb-8 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3 px-4">
                             <FiClock className="text-green-600" />
                             <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                Valid as of {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                             </span>
                        </div>
                        <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                             <FiCheckCircle className="text-green-600" />
                             <span className="text-xs font-black text-green-700 uppercase tracking-widest">Platform Certified</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-2xl shadow-green-900/10 border border-white relative overflow-hidden">
                        {/* Abstract Background Element */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 pointer-events-none"></div>
                        
                        {loading ? (
                            <div className="space-y-6">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="h-4 bg-slate-100 rounded-full animate-pulse" style={{ width: `${100 - (i * 10)}%` }}></div>
                                ))}
                            </div>
                        ) : (
                            <div className="relative space-y-12">
                                {paragraphs.map((paragraph, idx) => {
                                    // Check if paragraph starts with a number (like "1. Acceptance")
                                    const isHeader = /^\d+\./.test(paragraph);
                                    
                                    if (isHeader) {
                                        const lines = paragraph.split('\n');
                                        return (
                                            <motion.div 
                                                key={idx}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                className="group"
                                            >
                                                <h2 className="text-2xl font-black text-slate-800 mb-4 flex items-center gap-4 group-hover:text-green-700 transition-colors">
                                                    <span className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center text-sm">
                                                        {idx + 1}
                                                    </span>
                                                    {lines[0]}
                                                </h2>
                                                {lines.slice(1).map((line, lIdx) => (
                                                    <p key={lIdx} className="text-slate-600 leading-relaxed font-medium text-lg ml-14">
                                                        {line}
                                                    </p>
                                                ))}
                                            </motion.div>
                                        );
                                    }

                                    return (
                                        <motion.p 
                                            key={idx} 
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            className="text-slate-600 leading-relaxed font-medium text-lg"
                                        >
                                            {paragraph}
                                        </motion.p>
                                    );
                                })}
                            </div>
                        )}
                        
                        {/* Footer in the card */}
                        <div className="mt-20 pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center">
                                     <FiFileText className="text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">Community Policy</p>
                                    <p className="text-xs text-slate-400">Uzhavan Mart Legal Team</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => window.print()}
                                className="text-sm font-bold text-green-600 hover:text-green-700 flex items-center gap-2 "
                            >
                                <FiFileText /> Print Documentation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndServices;