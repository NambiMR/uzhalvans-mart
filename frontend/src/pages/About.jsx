// src/pages/About.jsx
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaLeaf, FaHandshake, FaTruck, FaQuoteLeft, FaCheck } from 'react-icons/fa';
import aboutImg from '../assets/images/aboutus.jpg';
import founder1 from '../assets/images/customers/c6.jpg';
import founder2 from '../assets/images/customers/c4.jpg';
import founder3 from '../assets/images/customers/c3.jpg';

import { toast } from 'react-hot-toast';

const About = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 200]);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`Thanks for your message, ${formData.name}! We'll contact you soon.`, {
      icon: '🌾',
      style: {
        borderRadius: '20px',
        background: '#fff',
        color: '#15803d',
        border: '1px solid #15803d',
      }
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const stats = [
    { label: "Farmers Connected", value: "500+" },
    { label: "Fresh Orders Delivered", value: "10K+" },
    { label: "Middlemen Eliminated", value: "100%" },
    { label: "States Covered", value: "5+" }
  ];

  const pillars = [
    {
      icon: <FaLeaf />,
      title: "Direct from Farm",
      text: "Every piece of produce is harvested on the morning of delivery. No cold storage, no old stock.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: <FaHandshake />,
      title: "Empowering Farmers",
      text: "We provide farmers with market intelligence and fair pricing, helping them earn 30-40% more.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <FaTruck />,
      title: "Farm to Doorstep",
      text: "Our optimized logistics ensure your food travels from the farm to your table in under 24 hours.",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* 🚀 Hero Section with Parallax */}
      <section className="relative h-[60dvh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: yHero }} className="absolute inset-0">
          <img
            src={aboutImg}
            alt="About Uzhavan Mart"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg"
          >
            Our Roots
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-green-100 max-w-2xl mx-auto font-medium"
          >
            Revolutionizing the Indian agricultural market by connecting farmers directly with your kitchen.
          </motion.p>
        </div>
      </section>

      {/* 📊 Stats Section (Floating) */}
      <section className="container mx-auto px-6 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 border border-gray-100">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <h3 className="text-3xl lg:text-5xl font-extrabold text-green-600 mb-2">{stat.value}</h3>
              <p className="text-gray-500 font-medium text-sm lg:text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🌿 Mission & Story */}
      <section className="container mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h4 className="text-green-600 font-bold uppercase tracking-widest mb-4">The Uzhavan Story</h4>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Giving the "Uzhavan" back his power and dignity.
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                In 2023, we saw a gap. While consumers paid premium prices for "farm-fresh" food,
                the actual farmers (Uzhavas) were struggling to survive under the weight of middlemen
                and outdated market systems.
              </p>
              <p>
                We built Uzhavan Mart to simplify this. By using technology, we enable farmers to
                list their today's harvest directly. You get food that was literally in the ground
                a few hours ago.
              </p>
              <ul className="space-y-4 pt-4">
                {["100% Traceable Sourcing", "Chemical-Free Verification", "Direct Bank Transfers to Farmers"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="bg-green-100 text-green-600 p-1 rounded-full"><FaCheck size={12} /></div>
                    <span className="font-semibold text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="absolute -inset-4 bg-green-200/30 rounded-full blur-3xl" />
            <img
              src={aboutImg}
              alt="Farm Life"
              className="relative rounded-[2rem] shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* ✨ Core Pillars */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Uzhavan Mart?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">We don't just sell vegetables; we sustain ecosystems and promote health.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 flex flex-col items-center text-center"
              >
                <div className={`w-20 h-20 rounded-2xl ${pillar.color} flex items-center justify-center text-3xl mb-8 shadow-inner`}>
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{pillar.title}</h3>
                <p className="text-gray-500 leading-relaxed">{pillar.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🗣️ Testimonials */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">The Voice of the Soil</h2>
          <p className="text-gray-500">Farmers who have transformed their lives through our platform.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 container mx-auto px-6">
          {[
            { name: "Rajesh Kumar", role: "Organic Greens Farmer", quote: "My income has doubled, and my children can now go to a better school. Uzhavan Mart is family." },
            { name: "Priya Patel", role: "Mango Orchards", quote: "I no longer wait in mandis for hours. I sell from my farm directly to the city." },
            { name: "Arun Singh", role: "Spice Cultivator", quote: "Transparent pricing is what we always wanted. No more hidden commissions." }
          ].map((t, i) => (
            <div key={i} className="bg-green-700 text-white p-10 rounded-3xl relative">
              <FaQuoteLeft className="text-green-300/30 text-6xl absolute top-8 right-8" />
              <p className="text-lg italic mb-8 relative z-10">"{t.quote}"</p>
              <div className="flex items-center gap-4 border-t border-green-600 pt-6">
                <div className="w-12 h-12 bg-white/20 rounded-full" />
                <div className="text-left">
                  <p className="font-bold">{t.name}</p>
                  <p className="text-sm text-green-200">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 👥 Founders Section */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Meet the Visionaries</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { name: "John Doe", role: "Co-Founder & CEO", bio: "Agri-Tech Visionary", img: founder1 },
              { name: "Pooja K", role: "Operations Lead", bio: "Farmer Advocate", img: founder2 },
              { name: "Alex Chen", role: "Technical Officer", bio: "Systems Architect", img: founder3 }
            ].map((person, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl"
              >
                <div className="h-[400px] overflow-hidden">
                  <img src={person.img} alt={person.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold text-white mb-1">{person.name}</h3>
                  <p className="text-green-400 font-medium mb-2">{person.role}</p>
                  <p className="text-white/70 text-sm">{person.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 📧 Contact / Join Us */}
      <section className="py-24 bg-green-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 p-12 lg:p-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Let's Grow Together.</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Whether you are a farmer looking to join us, or a customer with a question, we are here to talk.
              </p>
              <div className="space-y-4">
                <p className="flex items-center gap-4 text-gray-700 font-semibold"><span className="text-green-600">Email:</span> hello@uzhavanmart.com</p>
                <p className="flex items-center gap-4 text-gray-700 font-semibold"><span className="text-green-600">Phone:</span> +91 98765 43210</p>
                <p className="flex items-center gap-4 text-gray-700 font-semibold"><span className="text-green-600">Office:</span> Coimbatore, Tamil Nadu, India</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="md:w-1/2 bg-green-700 p-12 lg:p-16 flex flex-col justify-center space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/50 focus:bg-white/20 outline-none transition-all"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/50 focus:bg-white/20 outline-none transition-all"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <textarea
                placeholder="How can we help?"
                rows="4"
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/50 focus:bg-white/20 outline-none transition-all"
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
              <button className="bg-white text-green-700 font-bold py-4 rounded-2xl hover:bg-green-100 transition-colors shadow-xl">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;