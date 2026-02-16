// src/components/Testimonial.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import pulses from "../assets/images/pulses.jpeg";
import flowers from "../assets/images/flowers.jpeg";
import seeds from "../assets/images/seeds.jpeg";


// Sample testimonial data - replace with your actual data
const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Organic Farmer, Tamil Nadu",
    content: "FarmerMarket increased my income by 40% by connecting me directly with buyers. No more middlemen taking cuts!",
    rating: 5,
    image: pulses // Replace with your image path
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Customer, Mumbai",
    content: "The freshest produce I've ever received! My family can taste the difference in every vegetable.",
    rating: 4,
    image: flowers
  },
  {
    id: 3,
    name: "Arun Singh",
    role: "Dairy Farmer, Punjab",
    content: "The platform is so easy to use. Even at 58, I can manage my listings and communicate with buyers effortlessly.",
    rating: 5,
    image: seeds
  }
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-700">
          What People Say About Us
        </h2>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial Card */}
          <motion.div
            key={testimonials[currentIndex].id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md p-8 md:p-10"
          >
            <FaQuoteLeft className="text-green-500 text-3xl mb-4" />
            
            <p className="text-gray-700 text-lg mb-6">
              "{testimonials[currentIndex].content}"
            </p>
            
            <div className="flex items-center">
              <div className="mr-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-lg">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-gray-600">
                  {testimonials[currentIndex].role}
                </p>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`text-lg ${
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

          {/* Navigation Arrows */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 bg-white p-2 rounded-full shadow-md hover:bg-green-100 transition"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-green-600" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 bg-white p-2 rounded-full shadow-md hover:bg-green-100 transition"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="text-green-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-green-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;