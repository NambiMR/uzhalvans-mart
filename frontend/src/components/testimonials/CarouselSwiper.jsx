import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { FaQuoteLeft } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/effect-cards';

export default function CarouselSwiper({ testimonials = [] }) {
  if (!testimonials.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No testimonials available</p>
      </div>
    );
  }

  return (
    <Swiper
      effect="cards"
      grabCursor
      modules={[EffectCards]}
      className="w-full max-w-sm mx-auto lg:hidden"
    >
      {testimonials.map((testimonial) => (
        <SwiperSlide key={testimonial.id} className="!bg-transparent">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <FaQuoteLeft className="text-green-500 text-3xl mb-4" />
            <p className="text-gray-700 text-base mb-6 italic">
              "{testimonial.content}"
            </p>
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4 shadow-md bg-gray-200">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="font-bold text-lg">{testimonial.name}</h4>
                <p className="text-gray-600">{testimonial.role}</p>
                <div className="flex mt-1 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${
                        i < testimonial.rating
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
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
