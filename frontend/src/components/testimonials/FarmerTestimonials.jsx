// src/components/testimonials/FarmerTestimonials.jsx
import { useState } from 'react';
import { farmerTestimonials } from '../../data/testimonials';
import TestimonialCard from './TestimonialCard';

const FarmerTestimonials = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const testimonialsPerPage = 6;

  const indexOfLast = currentPage * testimonialsPerPage;
  const indexOfFirst = indexOfLast - testimonialsPerPage;
  const currentTestimonials = farmerTestimonials.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(farmerTestimonials.length / testimonialsPerPage);

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {currentTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
  key={i}
  onClick={() => setCurrentPage(i + 1)}
  className={`w-10 h-10 rounded-full transition-transform duration-300 ease-in-out 
    ${currentPage === i + 1 
      ? 'bg-green-600 text-white shadow-lg' 
      : 'bg-gray-200 hover:bg-gray-300 hover:scale-110'}
  `}
>
  {i + 1}
</button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmerTestimonials