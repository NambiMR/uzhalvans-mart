import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaLeaf, FaHandshake, FaTruck, FaQuoteLeft, FaCheck, FaShieldAlt } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import aboutImg from '../assets/images/aboutus.jpg';
import founder1 from '../assets/images/customers/c6.jpg';
import founder2 from '../assets/images/customers/c4.jpg';
import founder3 from '../assets/images/customers/c3.jpg';

const API_URL = 'http://localhost:5000/api/settings';

const About = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 500], [0, 200]);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await axios.get(API_URL);
                setSettings(data.aboutContent);
            } catch (err) {
                console.error('Failed to load about settings');
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const stats = settings?.stats?.length > 0 ? settings.stats : [
        { label: "Farmers Connected", value: "500+" },
        { label: "Fresh Orders Delivered", value: "10K+" },
        { label: "Middlemen Eliminated", value: "100%" },
        { label: "States Covered", value: "5+" }
    ];

    const pillars = [
        { icon: <FaLeaf />, title: "Direct from Farm", text: "Every piece of produce is harvested on the morning of delivery. No cold storage, no old stock.", color: "bg-green-100 text-green-600" },
        { icon: <FaHandshake />, title: "Empowering Farmers", text: "We provide farmers with market intelligence and fair pricing, helping them earn 30-40% more.", color: "bg-blue-100 text-blue-600" },
        { icon: <FaTruck />, title: "Farm to Doorstep", text: "Our optimized logistics ensure your food travels from the farm to your table in under 24 hours.", color: "bg-orange-100 text-orange-600" }
    ];

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="animate-pulse flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full mb-4"></div>
                <div className="h-4 bg-gray-100 w-32 rounded"></div>
            </div>
        </div>
    );

    return (
        <div className="bg-white overflow-hidden">
            {/* 🚀 Hero Section */}
            <section className="relative h-[60dvh] flex items-center justify-center overflow-hidden">
                <motion.div style={{ y: yHero }} className="absolute inset-0">
                    <img src={aboutImg} alt="About Uzhavan Mart" className="w-full h-full object-cover scale-110" />
                    <div className="absolute inset-0 bg-black/50" />
                </motion.div>
                <div className="relative z-10 text-center px-4">
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-xl">
                        {settings?.title || "Our Roots"}
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-xl text-green-100 max-w-2xl mx-auto font-medium">
                        {settings?.subtitle || "Revolutionizing the Indian agricultural market by connecting farmers directly with your kitchen."}
                    </motion.p>
                </div>
            </section>

            {/* 📊 Stats Section */}
            <section className="container mx-auto px-6 -mt-16 relative z-20">
                <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 lg:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 border border-gray-50 bg-white/95 backdrop-blur-md">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <h3 className="text-3xl lg:text-5xl font-black text-green-600 mb-2">{stat.value}</h3>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] lg:text-xs leading-relaxed">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 🌿 Mission & Story */}
            <section className="container mx-auto px-6 py-24 lg:py-32">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    <div className="lg:w-1/2">
                        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                            <FaShieldAlt /> Our Promise
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black text-gray-900 mb-8 leading-[1.1]">
                            {settings?.storyTitle || 'Giving the "Uzhavan" back his power and dignity.'}
                        </h2>
                        <div className="space-y-6 text-lg lg:text-xl text-gray-600 leading-relaxed font-medium">
                            <p className="whitespace-pre-wrap">{settings?.storyText || 'Loading our story...'}</p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                                {["100% Traceable Sourcing", "Chemical-Free Verification", "Direct Bank Transfers", "Zero Commission Model"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="bg-green-600 text-white p-1 rounded-lg shadow-lg shadow-green-100"><FaCheck size={10} /></div>
                                        <span className="font-bold text-gray-700 text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="lg:w-1/2 relative">
                        <div className="absolute -inset-10 bg-green-100/50 rounded-full blur-3xl pointer-events-none" />
                        <img src={aboutImg} alt="Farm Life" className="relative rounded-[3rem] shadow-2xl w-full h-auto object-cover border-8 border-white ring-1 ring-gray-100" />
                    </div>
                </div>
            </section>

            {/* ✨ Core Pillars */}
            <section className="bg-slate-50 py-24 lg:py-32">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">The Uzhavan Ecosystem</h2>
                        <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">We don't just sell vegetables; we sustain livelihoods and promote holistic health.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                        {pillars.map((pillar, i) => (
                            <motion.div key={i} whileHover={{ y: -12 }} className="bg-white p-10 lg:p-14 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all border border-white flex flex-col items-center text-center group">
                                <div className={`w-24 h-24 rounded-[2rem] ${pillar.color} flex items-center justify-center text-4xl mb-10 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                                    {pillar.icon}
                                </div>
                                <h3 className="text-2xl font-black text-gray-800 mb-4">{pillar.title}</h3>
                                <p className="text-gray-500 leading-relaxed font-medium">{pillar.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 📧 Join the Movement CTA */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="bg-slate-900 rounded-[3rem] md:rounded-[5rem] shadow-3xl overflow-hidden relative group">
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -mr-48 -mt-48 transition-transform duration-1000 group-hover:scale-110"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -ml-32 -mb-32 transition-transform duration-1000 group-hover:scale-110"></div>

                        <div className="relative z-10 px-8 py-16 lg:py-24 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-green-500/30"
                            >
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                Open for Partnerships
                            </motion.div>

                            <h2 className="text-4xl lg:text-7xl font-black text-white mb-8 leading-tight">
                                Ready to Grow <span className="text-green-500">Together?</span>
                            </h2>
                            
                            <p className="text-slate-400 max-w-2xl mx-auto mb-12 text-lg lg:text-xl font-medium leading-relaxed">
                                Whether you're a farmer ready to reach more kitchens or a consumer looking for better health, the Uzhavan movement starts here.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Link 
                                    to="/farmer/auth" 
                                    className="w-full sm:w-auto bg-green-600 text-white font-black px-10 py-5 rounded-[2rem] hover:bg-green-500 transition-all shadow-xl shadow-green-900/40 flex items-center justify-center gap-3 active:scale-95"
                                >
                                    Join as a Farmer <FaHandshake size={20} />
                                </Link>
                                <Link 
                                    to="/contact" 
                                    className="w-full sm:w-auto bg-white/10 text-white font-black px-10 py-5 rounded-[2rem] hover:bg-white/20 transition-all border border-white/10 flex items-center justify-center gap-3 active:scale-95"
                                >
                                    Get in Touch <FaLeaf size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;