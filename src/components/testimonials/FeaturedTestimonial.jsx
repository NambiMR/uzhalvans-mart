// src/components/testimonials/FeaturedTestimonial.jsx
import { featuredTestimonials } from '../../data/testimonials';
import TestimonialCard from './TestimonialCard';

const FeaturedTestimonial = () => {
  return (
    <section className="bg-green-50 py-12 mb-12">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-8 text-green-800">Featured Story</h2>
    <div className="max-w-4xl mx-auto">
      {featuredTestimonials.map((testimonial) => (
        <TestimonialCard 
          key={testimonial.id} 
          testimonial={testimonial}
          className="bg-white p-8 rounded-xl border-4 border-green-400 shadow-xl animate-pulse-slow"
        />
      ))}
    </div>
  </div>
</section>
  );
};
export default FeaturedTestimonial