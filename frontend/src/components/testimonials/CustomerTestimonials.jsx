// src/components/CustomerTestimonials.jsx
// import { customerTestimonials } from '../data/testimonials';
import { customerTestimonials } from '../../data/testimonials';
import TestimonialCard from './TestimonialCard';

const CustomerTestimonials = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {customerTestimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );
};

export default CustomerTestimonials;