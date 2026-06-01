// components/Hero.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import axios from 'axios';
import './Hero.css';

// Typing effect component for the rotating phrases
const TypingText = ({ text }) => {
  const characters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: { opacity: 1, x: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, x: 20, transition: { type: "spring", damping: 12, stiffness: 100 } },
  };

  return (
    <motion.div
      style={{ display: "flex", overflow: "hidden" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className="text-lg md:text-2xl font-semibold text-green-300 mb-3 tracking-wide"
    >
      {characters.map((char, index) => (
        <motion.span variants={child} key={index}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Hero = () => {
  const [phrases] = useState(["Organic Vegetables", "Fresh Fruits", "Local Grains", "Farm Fresh Eggs"]);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [heroContent, setHeroContent] = useState({
    title: 'Farm-Fresh Goodness',
    subtitle: 'Delivered!',
    backgroundImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80',
    ctaText: 'Shop Now'
  });
  const heroRef = useRef(null);

  // Parallax Scroll logic
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]); 
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/settings');
        if (data.hero) {
          setHeroContent(data.hero);
        }
      } catch (err) {
        console.error('Failed to fetch settings:', err);
      }
    };
    fetchSettings();

    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <section ref={heroRef} className="relative h-[calc(100dvh-48px)] lg:h-[calc(100dvh-120px)] overflow-hidden">
      {/* Dynamic Background Image */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0 scale-110">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${heroContent.backgroundImage})` }}
          />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
        <motion.div style={{ y: y2 }} className="text-center md:text-left max-w-2xl">
          <AnimatePresence mode="wait">
            <TypingText key={currentPhrase} text={phrases[currentPhrase]} />
          </AnimatePresence>

          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl"
          >
            {heroContent.title.split(' ').slice(0, -1).join(' ')}
            <br />
            <span className="text-green-400">{heroContent.title.split(' ').slice(-1)}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl text-gray-100 mb-10 max-w-lg drop-shadow-md leading-relaxed"
          >
            {heroContent.subtitle}
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-5">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/products"
                className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-full font-bold text-lg text-center transition-all shadow-xl shadow-green-900/40 inline-block w-full sm:w-auto"
              >
                {heroContent.ctaText}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/about"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/40 px-12 py-4 rounded-full font-bold text-lg text-center transition-all inline-block w-full sm:w-auto"
              >
                Meet Farmers
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 hidden lg:block"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-3 bg-white/50 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;