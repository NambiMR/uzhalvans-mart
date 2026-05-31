// src/components/SeasonalPicks.jsx
import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaLeaf, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import ProductCard from './ProductCard';

const API_URL = 'http://localhost:5000/api/products';

// ─── Tamil Nadu Seasonal Data ─────────────────────────────────────────────────
// Month index (0-11): what's in season in Tamil Nadu
const TN_SEASONAL_MAP = {
  0:  { season: 'Pongal Season',   categories: ['vegetables', 'grains'], mood: 'golden',  emoji: '🌾' }, // January
  1:  { season: 'Late Winter',      categories: ['vegetables', 'herbs'],   mood: 'cool',    emoji: '🥦' }, // February
  2:  { season: 'Early Summer',     categories: ['fruits', 'herbs'],       mood: 'sunny',   emoji: '🍎' }, // March
  3:  { season: 'Summer Peak',      categories: ['fruits', 'dairy'],       mood: 'warm',    emoji: '☀️'  }, // April
  4:  { season: 'Mango Season',     categories: ['fruits', 'spices'],      mood: 'vibrant', emoji: '🥭' }, // May
  5:  { season: 'Pre-Monsoon',      categories: ['vegetables', 'flowers'], mood: 'fresh',   emoji: '🌸' }, // June
  6:  { season: 'Monsoon Season',   categories: ['vegetables', 'pulses'],  mood: 'rainy',   emoji: '🌧️' }, // July
  7:  { season: 'Monsoon Harvest',  categories: ['grains', 'pulses'],      mood: 'earthy',  emoji: '🌱' }, // August
  8:  { season: 'Post-Monsoon',     categories: ['vegetables', 'grains'],  mood: 'cool',    emoji: '🌿' }, // September
  9:  { season: 'Karthigai Season', categories: ['vegetables', 'flowers'], mood: 'festive', emoji: '🌼' }, // October
  10: { season: 'Deepavali Season', categories: ['spices', 'grains'],      mood: 'festive', emoji: '✨' }, // November
  11: { season: 'Margazhi Season',  categories: ['flowers', 'dairy'],      mood: 'sacred',  emoji: '🌺' }, // December
};

const MOOD_GRADIENTS = {
  golden:  'from-yellow-50 to-amber-50   border-amber-200',
  cool:    'from-blue-50 to-cyan-50      border-blue-200',
  sunny:   'from-orange-50 to-yellow-50  border-orange-200',
  warm:    'from-amber-50 to-orange-50   border-amber-200',
  vibrant: 'from-yellow-50 to-green-50   border-yellow-200',
  fresh:   'from-green-50 to-emerald-50  border-green-200',
  rainy:   'from-slate-50 to-blue-50     border-slate-200',
  earthy:  'from-stone-50 to-amber-50    border-stone-200',
  festive: 'from-orange-50 to-pink-50    border-orange-200',
  sacred:  'from-pink-50 to-purple-50    border-pink-200',
};

const SEASON_HEADER_COLORS = {
  golden:  'text-amber-700  bg-amber-100',
  cool:    'text-blue-700   bg-blue-100',
  sunny:   'text-orange-700 bg-orange-100',
  warm:    'text-amber-800  bg-amber-100',
  vibrant: 'text-yellow-700 bg-yellow-100',
  fresh:   'text-green-700  bg-green-100',
  rainy:   'text-slate-700  bg-slate-100',
  earthy:  'text-stone-700  bg-stone-100',
  festive: 'text-orange-700 bg-orange-100',
  sacred:  'text-pink-700   bg-pink-100',
};

const SeasonalPicks = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const now = new Date();
  const month = now.getMonth();
  const { season, categories, mood, emoji } = TN_SEASONAL_MAP[month];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(API_URL);
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch seasonal products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Get products matching the season's categories
  const seasonalProducts = useMemo(() => {
    return products
      .filter(p => categories.includes(p.category))
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 4);
  }, [products, categories]);

  // Fallback: If no matching products, show top-rated products 
  const displayProducts = seasonalProducts.length > 0
    ? seasonalProducts
    : products.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4);

  const gradient = MOOD_GRADIENTS[mood] || MOOD_GRADIENTS.fresh;
  const headerColor = SEASON_HEADER_COLORS[mood] || SEASON_HEADER_COLORS.fresh;

  const monthName = now.toLocaleString('en-IN', { month: 'long' });

  return (
    <section className={`bg-gradient-to-br ${gradient} border-y py-16 lg:py-24`}>
      <div className="container mx-auto px-4 lg:px-8">

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            {/* Season Badge */}
            <div className={`inline-flex items-center gap-2 ${headerColor} px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4`}>
              <FaLeaf />
              {monthName} • Tamil Nadu
            </div>

            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 leading-tight">
              {emoji} {season}
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg">
              These are the freshest picks grown right now in Tamil Nadu's farms. 
              Harvested at peak ripeness and delivered within 24 hours.
            </p>
          </div>

          <Link
            to="/all-products"
            className="flex items-center gap-3 bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-green-200 whitespace-nowrap group"
          >
            View All Seasonal
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ── What's In Season Tags ────────────────────────── */}
        <div className="flex flex-wrap gap-3 mb-10">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest self-center">In Season:</span>
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/all-products?category=${cat}`}
              className="bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-200 px-4 py-1.5 rounded-full text-sm font-bold capitalize hover:bg-green-50 hover:border-green-400 hover:text-green-700 transition-all"
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* ── Product Grid ─────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white/40 animate-pulse h-80 rounded-2xl border border-white/50" />
            ))
          ) : displayProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} isSeasonal={true} />
            </motion.div>
          ))}
        </div>

        {/* ── Season Info Footer ───────────────────────────── */}
        <div className="mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/80 text-center">
          <p className="text-sm text-gray-600">
            <span className="font-bold text-gray-800">Why seasonal?</span>{' '}
            Seasonal produce is richer in nutrients, cheaper, and supports Tamil Nadu's farming calendar. 
            Our farmers harvest what nature intended this month.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SeasonalPicks;
