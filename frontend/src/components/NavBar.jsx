import { useState } from "react";
import { FaHome, FaUser, FaBars, FaTimes, FaShoppingCart, FaHeart } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";
import { IoMdArrowDropdown } from "react-icons/io";
import logo from "../assets/images/logo1.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchBar from './SearchBar';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

// Reusable NavItem component
const NavItem = ({ to, children, icon, onClick, className = "" }) => (
  <li>
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `hover:text-green-500 transition-colors ${className} ${isActive ? "text-green-600 font-semibold" : ""
        }`
      }
      end={to === "/"}
    >
      {icon && <span className="inline mr-1">{icon}</span>}
      {children}
    </NavLink>
  </li>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();

  // 1. Get user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // 2. Logout function
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
    window.location.reload(); // Quick refresh to update UI state
  };

  // Navigation items config
  const navItems = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/seller-auth", label: "Sell" },
    { to: "/buyer-auth", label: "Buy" },
    { to: "/about", label: "About Us" },
    { to: "/terms", label: "Terms & Service" },
    { to: "/testimonials", label: "Testimonial" },
    { to: "/contact", label: "Contact" }
  ];

  return (
    <>
      {/* Top Navbar */}
      <div className="bg-green-700 text-white px-4 py-3 flex flex-wrap justify-between items-center text-lg">
        {/* Language Dropdown */}
        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="btn btn-sm btn-ghost text-white gap-2">
            <GrLanguage className="text-xl" /> Language <IoMdArrowDropdown />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-white text-black rounded-box w-40 animate-fade-in"
          >
            <li><button onClick={() => console.log('Language changed to Tamil')}>Tamil</button></li>
            <li><button onClick={() => console.log('Language changed to English')}>English</button></li>
            <li><button onClick={() => console.log('Language changed to Hindi')}>Hindi</button></li>
          </ul>
        </div>

        <SearchBar />

        <div className="flex items-center gap-4">
          {/* Wishlist Icon */}
          <Link to="/wishlist" className="relative p-2 hover:bg-green-800 rounded-full transition-colors hidden sm:flex">
            <FaHeart className="text-xl" />
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-green-800 rounded-full transition-colors"
          >
            <FaShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Dynamic Login/User Dropdown */}
          <div className="dropdown dropdown-hover dropdown-end">
            <label tabIndex={0} className="btn btn-sm btn-ghost text-white gap-2 capitalize">
              <FaUser className="text-xl lg:hidden" />
              <span className="hidden lg:inline">
                {userInfo ? `Hi, ${userInfo.name.split(' ')[0]}` : 'Account'}
              </span>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[102] menu p-2 shadow bg-white text-black rounded-box w-52 animate-fade-in"
            >
              {userInfo ? (
                <>
                  <li className="px-4 py-2 font-bold border-b border-gray-100 text-green-700">Role: {userInfo.role}</li>
                  {userInfo.role === 'farmer' && (
                    <li><Link to="/seller-dashboard">My Dashboard</Link></li>
                  )}
                  <li><button onClick={handleLogout} className="text-red-600">Logout</button></li>
                </>
              ) : (
                <>
                  <li><Link to="/buyer-auth">Buyer Login</Link></li>
                  <li><Link to="/seller-auth">Farmer Login</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="navbar bg-white shadow-md md:px-40">
        <div className="flex-1">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-24 ml-4" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-none mr-5">
          <ul className="menu menu-horizontal text-black text-lg gap-4">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                className="text-lg"
              >
                {item.label}
              </NavItem>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-3xl text-green-700">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div className={`fixed top-0 right-0 h-full w-full lg:w-[300px] bg-white bg-opacity-90 backdrop-blur-md shadow-lg transform ${menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out z-50 lg:hidden`}>
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu} className="text-3xl text-green-700">
            <FaTimes />
          </button>
        </div>

        <ul className="flex flex-col p-4 text-black text-lg gap-4">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              onClick={toggleMenu}
              className="block py-2"
            >
              {item.label}
            </NavItem>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;