import { FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const TestimonialCard = ({ testimonial, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.4 }}
    className={`
      ${testimonial.featured ? 'p-8 border-2 border-green-400' : 'p-6'} 
      bg-white rounded-lg shadow-sm 
      hover:shadow-md transition-transform ${className}
    `}
  >
    <FaQuoteLeft className="text-green-500 text-2xl mb-4" />
    <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
    <div className="flex items-center">
      <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4 shadow-sm">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h4 className="font-bold text-green-800">{testimonial.name}</h4>
        <p className="text-gray-600 text-sm">{testimonial.role}</p>
        <div className="flex mt-1 space-x-1">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-xl ${
                i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    featured: PropTypes.bool
  }).isRequired,
  className: PropTypes.string
};

export default TestimonialCard;
