// import { useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Thumbs, Zoom } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';
// import 'swiper/css/zoom';

// const ProductGallery = ({ images }) => {
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const [zoomEnabled, setZoomEnabled] = useState(false);

//   return (
//     <div>
//       {/* Main Image Carousel */}
//       <Swiper
//         navigation
//         thumbs={{ swiper: thumbsSwiper }}
//         modules={[Navigation, Thumbs, Zoom]}
//         zoom={zoomEnabled}
//         className="mb-4 rounded-lg overflow-hidden"
//         onDoubleClick={() => setZoomEnabled(!zoomEnabled)}
//       >
//         {images.map((img, i) => (
//           <SwiperSlide key={i}>
//             <div className="swiper-zoom-container">
//               <img 
//                 src={img} 
//                 alt={`Product view ${i + 1}`} 
//                 className="w-full h-96 object-contain bg-gray-50 cursor-zoom-in"
//               />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Thumbnail Carousel */}
//       <Swiper
//         onSwiper={setThumbsSwiper}
//         spaceBetween={10}
//         slidesPerView={4}
//         watchSlidesProgress
//         className="thumbnail-slider"
//       >
//         {images.map((img, i) => (
//           <SwiperSlide key={i}>
//             <img 
//               src={img} 
//               alt={`Thumbnail ${i + 1}`}
//               className="w-20 h-20 object-cover cursor-pointer border-2 border-transparent hover:border-green-500 rounded"
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default ProductGallery;

// src/components/products/ProductGallery.jsx
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const ProductGallery = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <Swiper
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="rounded-lg"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img 
              src={img} 
              alt={`Product view ${i+1}`} 
              className="w-full h-96 object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Gallery */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="thumbnails"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img 
              src={img} 
              alt={`Thumbnail ${i+1}`} 
              className="w-20 h-20 object-cover cursor-pointer border-2 border-transparent hover:border-green-400"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductGallery;