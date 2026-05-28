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
import TestimonialPage from "./pages/TestimonialPage";
import TermsAndServices from "./pages/TermsAndServices";
import ContactPage from "./pages/ContactPage";
import { farmerTestimonials, customerTestimonials } from './data/testimonials';
import BuyerAuth from "./pages/BuyerAuth";
import SellerAuth from "./pages/SellerAuth";

// Farmer Dashboard
import FarmerLayout from "./pages/farmer/FarmerLayout"
import FarmerDashboard from "./pages/farmer/Dashboard";
import FarmerProducts from "./pages/farmer/Products";

function AppRouter() {
  return (
    <Routes>
      {/* ── Public Store Routes (with Navbar + Footer) ─── */}
      <Route path="/" element={
        <>
          <Navbar />
          <Home />
          <Footer />
        </>
      } />
      <Route path="/products" element={
        <><Navbar /><ProductsPage /><Footer /></>
      } />
      <Route path="/all-products" element={
        <><Navbar /><AllProducts /><Footer /></>
      } />
      <Route path="/products/:id" element={
        <><Navbar /><ProductDetail /><Footer /></>
      } />
      <Route path="/about" element={
        <><Navbar /><About /><Footer /></>
      } />
      <Route path="/testimonials" element={
        <><Navbar />
        <TestimonialPage
          farmerTestimonials={farmerTestimonials}
          customerTestimonials={customerTestimonials}
        />
        <Footer /></>
      } />
      <Route path="/terms" element={
        <><Navbar /><TermsAndServices /><Footer /></>
      } />
      <Route path="/contact" element={
        <><Navbar /><ContactPage /><Footer /></>
      } />
      <Route path="/buyer-auth" element={
        <><Navbar /><BuyerAuth /><Footer /></>
      } />
      <Route path="/seller-auth" element={
        <><Navbar /><SellerAuth /><Footer /></>
      } />

      {/* ── Farmer Dashboard (separate layout, NO public Navbar/Footer) ─── */}
      <Route path="/farmer" element={<FarmerLayout />}>
        <Route index element={<FarmerDashboard />} />
        <Route path="products" element={<FarmerProducts />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;