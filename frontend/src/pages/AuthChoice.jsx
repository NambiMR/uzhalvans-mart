import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUserGraduate, FaSeedling, FaArrowRight, FaShoppingCart, FaStore } from 'react-icons/fa';
import { FiHexagon, FiShield, FiTrendingUp } from 'react-icons/fi';

const AuthChoice = () => {
    return (
        <div className="min-h-[90dvh] bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-100/50 rounded-full blur-[120px] -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[120px] -ml-64 -mb-64"></div>

            <div className="max-w-5xl w-full relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 mb-6"
                    >
                        <FiShield className="text-green-600" />
                        <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Secure Unified Gateway</span>
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
                    >
                        Join the <span className="text-green-600 underline decoration-green-200 underline-offset-8">Movement.</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-slate-500 font-medium text-lg max-w-2xl mx-auto"
                    >
                        Select your identity to enter the Uzhavan Mart ecosystem. 
                        Direct farm-to-consumer commerce starts here.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Buyer Choice */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ y: -10 }}
                        className="group"
                    >
                        <Link to="/buyer-auth" className="block h-full">
                            <div className="bg-emerald-50/50 backdrop-blur-md p-10 lg:p-14 rounded-[3.5rem] shadow-[0_20px_50px_rgba(16,185,129,0.08)] border border-white hover:border-green-200 transition-all relative overflow-hidden h-full">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/80 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                                
                                <div className="w-20 h-20 bg-green-600 text-white rounded-3xl flex items-center justify-center text-3xl mb-10 shadow-xl shadow-green-200 group-hover:rotate-6 transition-transform">
                                    <FaShoppingCart />
                                </div>
                                
                                <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">I am a Buyer</h2>
                                <p className="text-slate-600 font-medium leading-relaxed mb-8">
                                    Shop for the freshest organic produce directly from verified local farms. Support farmers and eat healthy.
                                </p>
                                
                                <ul className="space-y-3 mb-10">
                                    <li className="flex items-center gap-3 text-sm font-bold text-slate-600">
                                        <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px]"><FaArrowRight /></div>
                                        Fresh Daily Harvest
                                    </li>
                                    <li className="flex items-center gap-3 text-sm font-bold text-slate-600">
                                        <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px]"><FaArrowRight /></div>
                                        Direct Farmer Chat
                                    </li>
                                </ul>

                                <div className="flex items-center gap-2 text-green-600 font-black uppercase tracking-widest text-xs">
                                    Continue to Marketplace <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Farmer Choice */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ y: -10 }}
                        className="group"
                    >
                        <Link to="/seller-auth" className="block h-full">
                            <div className="bg-indigo-50/50 backdrop-blur-md p-10 lg:p-14 rounded-[3.5rem] shadow-[0_20px_50px_rgba(99,102,241,0.08)] border border-white hover:border-indigo-200 transition-all relative overflow-hidden h-full">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/80 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                                
                                <div className="w-20 h-20 bg-indigo-600 text-white rounded-3xl flex items-center justify-center text-3xl mb-10 shadow-xl shadow-indigo-200 group-hover:-rotate-6 transition-transform">
                                    <FaSeedling />
                                </div>
                                
                                <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">I am a Farmer</h2>
                                <p className="text-slate-600 font-medium leading-relaxed mb-8">
                                    List your harvest, manage your farm inventory, and reach thousands of customers without any middlemen.
                                </p>
                                
                                <ul className="space-y-3 mb-10">
                                    <li className="flex items-center gap-3 text-sm font-bold text-slate-600">
                                        <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px]"><FaArrowRight /></div>
                                        Zero Listing Fees
                                    </li>
                                    <li className="flex items-center gap-3 text-sm font-bold text-slate-600">
                                        <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px]"><FaArrowRight /></div>
                                        Store Analytics & Growth
                                    </li>
                                </ul>

                                <div className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-xs">
                                    Continue to Farmer Portal <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                </div>

                {/* Footer Link */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <p className="text-slate-400 font-medium">
                        Already have an account? Just choose your role above to sign in.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default AuthChoice;
