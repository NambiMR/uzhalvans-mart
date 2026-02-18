import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar"
import Footer from "./components/footer";
import SearchResults from './pages/SearchResults';
import Home from "./pages/Home";
import About from "./pages/About";
import ProductDetail from "./pages/ProductDetail";
import AllProducts from "./pages/AllProducts";
import TermsAndServices from "./pages/TermsAndServices";
import { farmerTestimonials, customerTestimonials } from './data/testimonials';
import TestimonialsPage from "./pages/TestimonialPage";
import ContactPage from "./pages/ContactPage";
import ProductsPage from "./pages/ProductPage";
import BuyerAuth from "./pages/BuyerAuth";
import SellerAuth from "./pages/SellerAuth";
import { Toaster } from 'react-hot-toast';
import CartDrawer from './components/CartDrawer';

const App = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <CartDrawer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<TermsAndServices />} />
        <Route path="/testimonials" element={<TestimonialsPage farmerTestimonials={farmerTestimonials}
          customerTestimonials={customerTestimonials} />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/buyer-auth" element={<BuyerAuth />} />
        <Route path="/seller-auth" element={<SellerAuth />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App