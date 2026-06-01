import { useState, useEffect } from 'react';
import { FiSave, FiImage, FiType, FiLink, FiStar, FiZap, FiAlignLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/settings';

const AdminSettings = () => {
    const [settings, setSettings] = useState({
        hero: {
            title: '',
            subtitle: '',
            backgroundImage: '',
            ctaText: ''
        },
        activePromotions: [],
        termsContent: '',
        aboutContent: {
            title: '',
            subtitle: '',
            storyTitle: '',
            storyText: '',
            stats: []
        }
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await axios.get(API_URL);
                setSettings(data);
            } catch (err) {
                toast.error('Failed to load settings');
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleHeroChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({
            ...prev,
            hero: { ...prev.hero, [name]: value }
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        };

        try {
            await axios.put(API_URL, settings, config);
            toast.success('Settings updated successfully! 🚀');
        } catch (err) {
            toast.error('Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-black text-slate-800">Site Settings</h1>
                    <p className="text-slate-500 font-medium">Customize your platform's appearance and behavior.</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all disabled:opacity-50"
                >
                    <FiSave /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="space-y-8">
                {/* Hero Section Settings */}
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                        <FiZap className="text-amber-500" /> Hero Section
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <FiType /> Main Title
                                </label>
                                <input 
                                    name="title" 
                                    value={settings.hero.title} 
                                    onChange={handleHeroChange}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <FiAlignLeft /> Subtitle
                                </label>
                                <textarea 
                                    name="subtitle" 
                                    value={settings.hero.subtitle} 
                                    onChange={handleHeroChange}
                                    rows="3"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none" 
                                />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <FiImage /> Background Image URL
                                </label>
                                <input 
                                    name="backgroundImage" 
                                    value={settings.hero.backgroundImage} 
                                    onChange={handleHeroChange}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                                />
                                <div className="mt-4 rounded-2xl overflow-hidden h-32 bg-slate-100">
                                    <img src={settings.hero.backgroundImage} alt="Hero Preview" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <FiLink /> CTA Button Text
                                </label>
                                <input 
                                    name="ctaText" 
                                    value={settings.hero.ctaText} 
                                    onChange={handleHeroChange}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Terms of Service Section */}
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                        <FiAlignLeft className="text-indigo-500" /> Terms of Service
                    </h2>
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                            Page Content (Markdown / Text)
                        </label>
                        <textarea 
                            name="termsContent" 
                            value={settings.termsContent} 
                            onChange={(e) => setSettings(prev => ({ ...prev, termsContent: e.target.value }))}
                            rows="10"
                            placeholder="Enter the official terms of service..."
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-y" 
                        />
                    </div>
                </div>

                {/* About Us Section */}
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                        <FiStar className="text-emerald-500" /> About Us Content
                    </h2>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Hero Title</label>
                                <input 
                                    value={settings.aboutContent?.title} 
                                    onChange={(e) => setSettings(prev => ({ ...prev, aboutContent: { ...prev.aboutContent, title: e.target.value } }))}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Hero Subtitle</label>
                                <input 
                                    value={settings.aboutContent?.subtitle} 
                                    onChange={(e) => setSettings(prev => ({ ...prev, aboutContent: { ...prev.aboutContent, subtitle: e.target.value } }))}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Our Story Title</label>
                            <input 
                                value={settings.aboutContent?.storyTitle} 
                                onChange={(e) => setSettings(prev => ({ ...prev, aboutContent: { ...prev.aboutContent, storyTitle: e.target.value } }))}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Our Story Text</label>
                            <textarea 
                                value={settings.aboutContent?.storyText} 
                                onChange={(e) => setSettings(prev => ({ ...prev, aboutContent: { ...prev.aboutContent, storyText: e.target.value } }))}
                                rows="5"
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y" 
                            />
                        </div>

                        {/* Quick Stats Editor */}
                        <div className="pt-6 border-t border-slate-50">
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-5">Platform Statistics</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[0, 1, 2, 3].map(i => (
                                    <div key={i} className="space-y-2">
                                        <input 
                                            placeholder="Label"
                                            value={settings.aboutContent?.stats?.[i]?.label || ''} 
                                            onChange={(e) => {
                                                const newStats = [...(settings.aboutContent?.stats || [])];
                                                newStats[i] = { ...newStats[i], label: e.target.value };
                                                setSettings(prev => ({ ...prev, aboutContent: { ...prev.aboutContent, stats: newStats } }));
                                            }}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold text-slate-700"
                                        />
                                        <input 
                                            placeholder="Value (e.g. 500+)"
                                            value={settings.aboutContent?.stats?.[i]?.value || ''} 
                                            onChange={(e) => {
                                                const newStats = [...(settings.aboutContent?.stats || [])];
                                                newStats[i] = { ...newStats[i], value: e.target.value };
                                                setSettings(prev => ({ ...prev, aboutContent: { ...prev.aboutContent, stats: newStats } }));
                                            }}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-black text-indigo-600"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Promotional Banner Colors Placeholder */}
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm opacity-60">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <FiStar className="text-purple-500" /> Promotions & Offers
                    </h2>
                    <p className="text-slate-400 text-sm font-medium">Detailed promotion management coming soon.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
