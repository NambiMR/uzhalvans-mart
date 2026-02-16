// src/pages/Home.jsx
import Hero from '../components/Hero';
import CategoryCarousel from '../components/CategoryCarousel';
import ProductGrid from '../components/ProductGrid';

const Home = () => {
  return (
    <div>
        <Hero/>
        <CategoryCarousel/>
        <ProductGrid/>
    </div>
  )
}

export default Home;