// src/Router.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";

// Import your route components
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductPage";
import AllProducts from "./pages/AllProducts";
import About from "./pages/About";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./components/footer";
// import Testimonial from "./pages/Testimonial";
import TestimonialPage from "./pages/TestimonialPage";
import TermsAndServices from "./pages/TermsAndServices";
import ContactPage from "./pages/ContactPage";
import { farmerTestimonials, customerTestimonials } from './data/testimonials';
import BuyerAuth from "./pages/BuyerAuth";
import SellerAuth from "./pages/SellerAuth";
import FarmerLayout from "./pages/farmer/FarmerLayout"
import FarmerDashboard from "./pages/farmer/Dashboard";
import FarmerProducts from "./pages/farmer/Products";


function AppRouter() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/testimonials" element={<TestimonialPage  farmerTestimonials={farmerTestimonials}
        customerTestimonials={customerTestimonials}/>} />
        <Route path="/terms" element={<TermsAndServices />} />
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/buyer-auth" element={<BuyerAuth />} />
        <Route path="/seller-auth" element={<SellerAuth />} />

{/*         
        <Route path="/farmer" element={<FarmerLayout />}>
          <Route index element={<FarmerDashboard />} />
          <Route path="products" element={<FarmerProducts />} />
          <Route path="orders" element={<FarmerOrders />} /> */}
        {/* </Route> */}
      </Routes>
      <Footer/>
    </>
  );
}

export default AppRouter;