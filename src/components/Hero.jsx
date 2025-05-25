

// components/Hero.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { FaSearch } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Hero.css';
import hero1 from '../assets/images/hero-1.jpg';
import hero3 from '../assets/images/hero3.jpg';
import organicImage from '../assets/images/organic.jpg';

const Hero = () => {
  // Animated text settings
  const phrases = ["Organic Vegetables", "Fresh Fruits", "Local Grains", "Farm Fresh Eggs"];
  const [currentPhrase, setCurrentPhrase] = useState(0);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    fade: true
  };


  // Hero images data
  const heroImages = [
    { id: 1, image: hero1, alt: 'Fresh vegetables' },
    { id: 2, image: hero3, alt: 'Organic fruits' },
    { id: 3, image: organicImage, alt: 'Farm fresh dairy' }
  ];
  // Animate text rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <section className="relative h-[500px] md:h-[630px] overflow-hidden">
      {/* Image Slider */}
      <div className="absolute inset-0 z-0">
        <Slider {...settings}>
          {heroImages.map((item) => (
            <div key={item.id}>
              <div 
                className="w-full h-[500px] md:h-[630px] bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
                aria-label={item.alt}
              />
            </div>
          ))}
        </Slider>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>  
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
        <div className="text-center md:text-left max-w-2xl">
          {/* Animated Text */}
          <motion.div
            key={currentPhrase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl font-semibold text-green-100 mb-2"
          >
            {phrases[currentPhrase]}
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Farm-Fresh Goodness Delivered!
          </h1>
          <p className="text-lg text-green-50 mb-8">
            Buy directly from local farmers. 100% organic, 100% fresh.
          </p>

          {/* Reused Search Bar */}
          <div className="mb-8 max-w-md mx-auto md:mx-0">
            <form className="flex">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-grow px-4 py-3 outline-1 rounded-l-lg focus:outline-green-700"
              />
              <button 
                type="submit"
                className="bg-green-600 outline-1 hover:bg-green-700 text-white px-6 rounded-r-lg"
              >
                <FaSearch className="text-xl" />
              </button>
            </form>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/products"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium text-center transition-colors"
            >
              Shop Now
            </Link>
            <Link
              to="/farmers"
              className="bg-white hover:bg-gray-100 text-green-700 px-8 py-3 rounded-lg font-medium text-center transition-colors"
            >
              Meet Our Farmers
            </Link>
          </div>

          {/* Seasonal Badge */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ 
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.5
            }}
            className="mt-8 inline-block bg-yellow-400 bg-opacity-90 text-yellow-900 px-4 py-2 rounded-full font-medium"
          >
            🌱 Summer Special: 20% Off!
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;



// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/autoplay';
// import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// import banner1 from "../assets/images/banner-1.png";
// import banner2 from "../assets/images/banner-2.png";
// import banner3 from "../assets/images/banner-3.png";
// import banner4 from "../assets/images/sale.jpg";


// const Carousel = () => {
//   return (
//     <Swiper
//       modules={[Autoplay, Navigation, Pagination]}
//       autoplay={{ delay: 5000, disableOnInteraction: false }}
//       loop={true}
//       pagination={{ clickable: true }}
//       navigation
//       className="w-full h-[350px] overflow-hidden"
//     >
//     <SwiperSlide>
//   <img src={banner1} alt="Empowering Farmers" className="w-full h-full object-center" />
// </SwiperSlide>

// <SwiperSlide>
//   <img src={banner2} alt="Trending Products" className="w-full h-full object-center" />
// </SwiperSlide>

// <SwiperSlide>
//   <img src={banner3} alt="Trending Products" className="w-full h-full object-center" />
// </SwiperSlide>
// <SwiperSlide>
//   <img src={banner4} alt="Trending Products" className="w-full h-full object-center" />
// </SwiperSlide>

// {/* <SwiperSlide>
//   <img src="/path-to-your-banner/limited-time-offers.png" alt="Limited Time Offers" className="w-full h-auto object-cover" />
// </SwiperSlide> */}

//   </Swiper>
//   );
// };

// export default Carousel;