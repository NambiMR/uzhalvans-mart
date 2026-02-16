// src/components/Footer.jsx
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">FarmerMarket</h3>
            <p className="mb-4">
              Connecting local farmers directly with consumers for fresh, organic produce at fair prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-300 transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-green-300 transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-green-300 transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-green-300 transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Products', path: '/products' },
                { name: 'About Us', path: '/about' },
                { name: 'Farmers', path: '/farmers' },
                { name: 'Contact', path: '/contact' }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.path} 
                    className="hover:text-green-300 transition"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              {[
                'FAQs',
                'Shipping Policy',
                'Return Policy',
                'Payment Options',
                'Privacy Policy'
              ].map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-green-300 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MdLocationOn className="mt-1 mr-2" size={18} />
                <span>123 Farm Road, Agricultural Zone, Chennai, Tamil Nadu</span>
              </li>
              <li className="flex items-center">
                <MdEmail className="mr-2" size={18} />
                <a href="mailto:contact@farmermarket.com" className="hover:text-green-300">
                  contact@farmermarket.com
                </a>
              </li>
              <li className="flex items-center">
                <MdPhone className="mr-2" size={18} />
                <a href="tel:+919876543210" className="hover:text-green-300">
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold mb-4 text-center md:text-left">
            Subscribe to Our Newsletter
          </h4>
          <div className="flex flex-col md:flex-row gap-2 max-w-2xl mx-auto md:mx-0">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-2 rounded-lg text-white outline-1 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-green-300 pt-6 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} FarmerMarket. All rights reserved.
          </p>
          <p className="mt-1">
            Designed with ❤️ for Indian farmers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;