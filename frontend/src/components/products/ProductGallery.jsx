// src/components/products/ProductGallery.jsx
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';

// Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';

const ProductGallery = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-6">
      {/* 📸 Thumbnail Gallery (Vertical on Desktop) */}
      <div className="lg:w-20 w-full shrink-0">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          slidesPerView={4}
          direction="horizontal"
          breakpoints={{
            1024: {
              direction: "vertical",
              slidesPerView: 5,
            }
          }}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="lg:h-[450px] w-full"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i} className="!w-20 !h-20 lg:!w-20 lg:!h-20">
              <div className={`w-full h-full rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${activeIdx === i ? 'border-green-600 shadow-lg shadow-green-100' : 'border-transparent hover:border-gray-200'
                }`}>
                <img
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 🖼️ Main Image Showcase */}
      <div className="flex-grow min-w-0">
        <Swiper
          onSlideChange={(swiper) => setActiveIdx(swiper.activeIndex)}
          thumbs={{ swiper: thumbsSwiper }}
          slidesPerView={1}
          spaceBetween={0}
          modules={[FreeMode, Navigation, Thumbs]}
          className="rounded-[2.5rem] overflow-hidden bg-white border border-gray-100 h-[400px] md:h-[600px] shadow-sm w-full"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i} className="flex items-center justify-center p-2 bg-white">
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={img}
                alt={`Product view ${i + 1}`}
                className="w-full h-full object-contain cursor-zoom-in hover:scale-105 transition-transform duration-500"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductGallery;