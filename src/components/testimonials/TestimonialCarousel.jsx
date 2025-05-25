import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import PropTypes from 'prop-types';

const TestimonialCarousel = ({
  testimonials = [],
  autoRotate = true,
  interval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate effect
  useEffect(() => {
    if (!autoRotate || testimonials.length <= 1) return;
    const timer = setInterval(() => {
      if (!isPaused) next();
    }, interval);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused, autoRotate, interval, testimonials.length]);

  const next = () =>
    setCurrentIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  const prev = () =>
    setCurrentIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const goTo = (i) => setCurrentIndex(i);

  if (!testimonials.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No testimonials available</p>
      </div>
    );
  }

  return (
    <div
      className="relative max-w-xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={testimonials[currentIndex].id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8 md:p-10"
        >
          <FaQuoteLeft className="text-green-500 text-3xl mb-4" />
          <p className="text-gray-700 text-lg mb-6 italic">
            "{testimonials[currentIndex].content}"
          </p>
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-4 shadow-md">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <h4 className="font-bold text-lg">{testimonials[currentIndex].name}</h4>
              <p className="text-gray-600">{testimonials[currentIndex].role}</p>
              <div className="flex mt-1 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < testimonials[currentIndex].rating
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {testimonials.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow hover:bg-green-100 transition"
          >
            <FaChevronLeft className="text-green-600" size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow hover:bg-green-100 transition"
          >
            <FaChevronRight className="text-green-600" size={20} />
          </button>
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-3 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-green-600 w-6'
                    : 'bg-gray-300 w-3 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

TestimonialCarousel.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired
    })
  ),
  autoRotate: PropTypes.bool,
  interval: PropTypes.number
};

export default TestimonialCarousel;
