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

// Super Admin Panel
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCategories from "./pages/admin/Categories";
import AdminSettings from "./pages/admin/Settings";
import AdminAuth from "./pages/admin/AdminAuth";
import AdminUsers from "./pages/admin/Users";
import AuthChoice from "./pages/AuthChoice";

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
      <Route path="/auth" element={
        <><Navbar /><AuthChoice /><Footer /></>
      } />

      {/* ── Farmer Dashboard (separate layout, NO public Navbar/Footer) ─── */}
      <Route path="/farmer" element={<FarmerLayout />}>
        <Route index element={<FarmerDashboard />} />
        <Route path="products" element={<FarmerProducts />} />
      </Route>

      <Route path="/admin/auth" element={<AdminAuth />} />
      {/* ── Admin Panel (separate layout) ─── */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;