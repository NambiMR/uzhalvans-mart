import CarouselSwiper from '../components/testimonials/CarouselSwiper';
import TestimonialCard from '../components/testimonials/TestimonialCard';
import TestimonialForm from '../components/testimonials/TestimonialForm'
import useMediaQuery from '../hooks/useMediaQuery';
import PropTypes from 'prop-types';

const TestimonialsPage = ({ farmerTestimonials, customerTestimonials }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (
    (!farmerTestimonials || farmerTestimonials.length === 0) &&
    (!customerTestimonials || customerTestimonials.length === 0)
  ) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No testimonials available</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100  text-green-800">
         {/* Hero Section */}
      <section className="bg-green-700 mb-5 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Success Stories</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Hear directly from our farmers and customers about their experiences
        </p>
      </section>

      <section className="mb-16 sm:p-16">
        <h2 className="text-2xl text-center font-bold mb-4 text-green-800">Farmer Testimonials</h2>
        {isMobile ? (
          <div className="overflow-x-hidden px-0.5">
            <CarouselSwiper testimonials={farmerTestimonials} />
        </div>
        ) : (
          <div className="grid gap-6  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {farmerTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        )}
      </section>

      <section className="mb-16 sm:p-16 ">
        <h2 className="text-2xl font-bold text-center mb-4 text-green-800">Customer Testimonials</h2>
        {isMobile ? (
          <div className="overflow-x-hidden px-4">
            <CarouselSwiper testimonials={farmerTestimonials} />
        </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {customerTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        )}
      </section>
      <section className='pb-6'>
        <TestimonialForm/>
      </section>
      
    </div>
    
  );
};

TestimonialsPage.propTypes = {
  farmerTestimonials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      featured: PropTypes.bool,
    })
  ).isRequired,
  customerTestimonials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      featured: PropTypes.bool,
    })
  ).isRequired,
};

export default TestimonialsPage;
