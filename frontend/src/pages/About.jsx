// src/pages/About.jsx

import { motion } from 'framer-motion';
import about from '../assets/images/aboutus.jpg';
import founder1 from '../assets/images/customers/c6.jpg';
import founder2 from '../assets/images/customers/c4.jpg';
import founder3 from '../assets/images/customers/c3.jpg';

const About = () => {


  return (
    <div className="bg-gray-50 text-green-700">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img 
          src={about} 
          alt="Our farming team" 
          className="w-full h-full object-cover "
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-white text-center"
          >
            Our Story
          </motion.h1>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-6">
            Connecting Farms to Families
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Founded in 2023, FarmerMarket bridges the gap between local farmers and 
            health-conscious consumers. We eliminate middlemen to ensure fair prices 
            for both farmers and buyers.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { icon: '🌱', title: 'Direct from Farm', text: '0% chemicals, 100% fresh' },
              { icon: '🤝', title: 'Fair Pricing', text: 'Farmers earn 30% more' },
              { icon: '🚚', title: 'Fast Delivery', text: 'Harvest to home in 24hrs' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Farmer Testimonials */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Farmers Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                farm: "Organic Greens Farm",
                location: "Tamil Nadu",
                quote: "FarmerMarket helped me reach customers directly. My income increased by 40%!",
                rating: 5
              },
              {
                name: "Priya Patel",
                farm: "Mango Grove",
                location: "Maharashtra",
                quote: "Now I get fair prices without middlemen taking cuts.",
                rating: 4
              },
              {
                name: "Arun Singh",
                farm: "Spice Valley",
                location: "Kerala",
                quote: "The platform is easy to use even for non-tech farmers like me.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <span className="text-xl">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.farm}, {testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">"{testimonial.quote}"</p>
                <div className="text-yellow-400">
                  {'★'.repeat(testimonial.rating)}
                  {'☆'.repeat(5 - testimonial.rating)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Farm Story */}
      <section className="bg-green-700 text-white py-16">
        <div className="container mx-auto px-6 md:flex items-center gap-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img 
              src={about} 
              alt="Organic farm" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Why We Started</h2>
            <p className="mb-4">
              After seeing farmers struggle with unfair pricing and consumers getting 
              stale produce, we built FarmerMarket to create a transparent food ecosystem.
            </p>
            <ul className="space-y-3">
              {[
                "500+ farmers empowered",
                "10,000+ happy customers",
                "100% organic verification"
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-green-300 mr-2">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-600">Meet the Founders</h2>
        <div className="grid md:grid-cols-3 gap-8 text-green-700">
          {[
            { 
              name: "John Doe", 
              role: "CEO", 
              bio: "Former agri-tech engineer",
              img: founder1
            },
            { 
              name: "Pooja K", 
              role: "Head of Farmer Relations", 
              bio: "3rd generation farmer",
              img: founder2
            },
            { 
              name: "Alex Chen", 
              role: "Tech Lead", 
              bio: "Fullstack developer",
              img: founder3 
            }
          ].map((person, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-64 bg-gray-200">
                <img src={person.img} alt={person.name} className="w-full h-full object-cover"/>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{person.name}</h3>
                <p className="text-green-600 mb-2">{person.role}</p>
                <p className="text-gray-600">{person.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Get in Touch</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 text-green-600">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Your name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-gray-700 mb-1">Message</label>
              <textarea 
                id="message" 
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Your message..."
                required
              ></textarea>
            </div>
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium"
            >
              Send Message
            </motion.button>
          </form>
          
          <div className="mt-8 text-center text-gray-600">
            <p>Or reach us directly at:</p>
            <p className="font-medium mt-2">contact@farmermarket.com</p>
            <p className="mt-1">+91 98765 43210</p>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default About;