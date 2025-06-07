import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { products } from '../data/products'; // Adjust path as needed

const CategoryCarousel = () => {
  const navigate = useNavigate();

  // Generate category data dynamically from products
  const categoriesMap = products.reduce((acc, product) => {
    const cat = product.category.toLowerCase();
    if (!acc[cat]) {
      acc[cat] = {
        name: cat.charAt(0).toUpperCase() + cat.slice(1),
        img: product.images[0],
        count: 1
      };
    } else {
      acc[cat].count += 1;
    }
    return acc;
  }, {});

  const categories = Object.values(categoriesMap);

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${categoryName.toLowerCase()}`);
  };

  return (
    <section className="py-12 bg-green-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Shop by Category
        </h2>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={8}
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 3 },
            640: { slidesPerView: 4 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 6 },
            1280: { slidesPerView: 8 },
          }}
          className="px-2 pb-10"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => handleCategoryClick(category.name)}
                className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center cursor-pointer justify-center hover:shadow-xl transition-all duration-300 h-full"
              >
                <div className="w-30 h-30 mb-3 overflow-hidden border-2 border-green-100">
                  <img
                    src={category.img}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm font-semibold text-green-800 text-center">
                  {category.name}
                </p>
                <p className="text-gray-500 text-sm">{category.count} items</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategoryCarousel;
