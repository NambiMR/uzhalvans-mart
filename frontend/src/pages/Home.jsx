// src/pages/Home.jsx
import Hero from '../components/Hero';
import CategoryCarousel from '../components/CategoryCarousel';
import SeasonalPicks from '../components/SeasonalPicks';
import ProductGrid from '../components/ProductGrid';

const Home = () => {
  return (
    <div>
      <Hero />
      <CategoryCarousel />
      <SeasonalPicks />
      <ProductGrid />
    </div>
  );
};

export default Home;