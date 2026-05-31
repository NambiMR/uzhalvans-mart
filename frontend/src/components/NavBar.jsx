import { useState } from "react";
import { FaHome, FaUser, FaBars, FaTimes, FaShoppingCart, FaHeart, FaSearch, FaStore, FaInfoCircle, FaFileContract, FaComments, FaEnvelope, FaSeedling, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";
import { IoMdArrowDropdown } from "react-icons/io";
import logo from "../assets/images/logo1.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchBar from './SearchBar';
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

// Reusable NavItem component with animated underline
const NavItem = ({ to, children, icon, onClick, className = "" }) => (
  <li className="flex items-center">
    <NavLink 
      to={to}
      onClick={onClick}
      className={({ isActive }) => 
        `flex flex-col items-center gap-1 px-4 py-2 transition-all duration-300 relative group ${
          isActive ? "text-green-700 font-bold" : "text-gray-500 font-medium hover:text-green-600"
        } ${className}`
      }
      end={to === "/"}
    >
      {({ isActive }) => (
        <>
          <div className="flex items-center gap-1.5">
            {icon && <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>}
            <span className="text-[14px]">{children}</span>
          </div>
          
          {/* Active Indicator Dot (Simple div, no nested <a>) */}
          <div className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-green-600 transition-all duration-300 ${
            isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`} />
        </>
      )}
    </NavLink>
  </li>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Scroll listener for sticky navbar glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setMenuOpen(false);
    navigate('/');
    window.location.reload();
  };

  // Navigation items config
  const navItems = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/seller-auth", label: "Sell", icon: <FaSeedling /> },
    { to: "/buyer-auth", label: "Buy", icon: <FaStore /> },
    { to: "/about", label: "About Us", icon: <FaInfoCircle /> },
    { to: "/terms", label: "Terms & Service", icon: <FaFileContract /> },
    { to: "/testimonials", label: "Testimonial", icon: <FaComments /> },
    { to: "/contact", label: "Contact", icon: <FaEnvelope /> }
  ];

  return (
    <>
      {/* ═══════════════════════════════════════════
          TOP BAR (Desktop: full | Mobile: compact)
          ═══════════════════════════════════════════ */}
      <div className="bg-green-700 text-white px-4 py-2 lg:py-3">
        <div className="flex justify-between items-center">
          {/* Language Dropdown - Hidden on small screens */}
          <div className="dropdown dropdown-hover hidden md:block">
            <label tabIndex={0} className="btn btn-sm btn-ghost text-white gap-2">
              <GrLanguage className="text-xl" /> Language <IoMdArrowDropdown />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-white text-black rounded-box w-40"
            >
              <li><button onClick={() => console.log('Tamil')}>Tamil</button></li>
              <li><button onClick={() => console.log('English')}>English</button></li>
              <li><button onClick={() => console.log('Hindi')}>Hindi</button></li>
            </ul>
          </div>

          {/* Mobile: Logo + icons row | Desktop: Search bar */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-16" />
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:block flex-grow max-w-xl mx-8">
            <SearchBar className="shadow-inner" />
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-4 lg:gap-6 ml-4">
            {/* Mobile Search Toggle */}
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="lg:hidden p-2 hover:bg-green-800 rounded-full transition-colors"
              aria-label="Search"
            >
              <FaSearch className="text-lg" />
            </motion.button>

            {/* Wishlist - Desktop only */}
            <Link to="/wishlist" className="hidden sm:flex relative p-2 hover:bg-green-800 rounded-full transition-colors">
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                <FaHeart className="text-lg" />
              </motion.div>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 hover:bg-green-800 rounded-full transition-colors">
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                <FaShoppingCart className="text-lg" />
              </motion.div>
            </Link>

            {/* Account Dropdown */}
            <div className="dropdown dropdown-hover dropdown-end hidden lg:block">
              <motion.label 
                whileHover={{ scale: 1.05 }}
                tabIndex={0} 
                className="btn btn-sm btn-ghost text-white gap-2 capitalize"
              >
                <FaUser className="text-lg" />
                <span>{userInfo ? `Hi, ${userInfo.name.split(' ')[0]}` : 'Account'}</span>
              </motion.label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[102] menu p-2 shadow-lg bg-white text-black rounded-box w-52"
              >
                {userInfo ? (
                  <>
                    <li className="px-4 py-2 font-bold border-b border-gray-100 text-green-700 text-sm">{userInfo.name}</li>
                    <li className="px-4 py-1 text-xs text-gray-400 border-b border-gray-100">{userInfo.role}</li>
                    {userInfo.role === 'farmer' && (
                      <li><Link to="/farmer">My Dashboard</Link></li>
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

            {/* Mobile Menu Toggle */}
            <button onClick={toggleMenu} className="lg:hidden p-2 hover:bg-green-800 rounded-full transition-colors">
              <FaBars className="text-lg" />
            </button>
          </div>
        </div>

        {/* Mobile Search Expandable */}
        {mobileSearchOpen && (
          <div className="lg:hidden mt-3 pb-1 animate-fade-in">
            <SearchBar />
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════
          MAIN NAVBAR (Desktop Only: Sticky + Glassmorphism)
          ═══════════════════════════════════════════ */}
      <nav className={`navbar px-4 md:px-40 hidden lg:flex transition-all duration-500 sticky top-0 z-[100] ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-lg h-16 py-0 border-b border-green-50/50" 
          : "bg-white h-24 shadow-sm"
      }`}>
        <div className="flex-1">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-24 ml-4" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="flex-none mr-5">
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
      </nav>

      {/* ═══════════════════════════════════════════
          MOBILE SIDEBAR MENU (Slide-in from right)
          ═══════════════════════════════════════════ */}
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      />

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl transform ${
        menuOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-[70] lg:hidden flex flex-col`}>
        
        {/* Sidebar Header */}
        <div className="bg-green-700 text-white p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Menu</h2>
            <button onClick={toggleMenu} className="p-1.5 hover:bg-green-800 rounded-full transition-colors">
              <FaTimes size={20} />
            </button>
          </div>
          
          {/* User Info in Sidebar */}
          {userInfo ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {userInfo.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-sm">{userInfo.name}</p>
                <p className="text-green-200 text-xs capitalize">{userInfo.role}</p>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link 
                to="/buyer-auth" 
                onClick={toggleMenu}
                className="flex-1 bg-white text-green-700 text-center py-2 rounded-lg text-sm font-bold hover:bg-green-50 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/buyer-auth" 
                onClick={toggleMenu}
                className="flex-1 bg-green-500 text-white text-center py-2 rounded-lg text-sm font-bold hover:bg-green-600 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-2">
          <ul className="space-y-0.5">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={toggleMenu}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-5 py-3 text-[15px] transition-colors ${
                      isActive 
                        ? "bg-green-50 text-green-700 font-semibold border-r-4 border-green-600" 
                        : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                >
                  <span className="text-lg w-6 text-center">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="border-t border-gray-200 my-3 mx-5"></div>

          {/* Quick Actions */}
          <ul className="space-y-0.5">
            <li>
              <Link
                to="/wishlist"
                onClick={toggleMenu}
                className="flex items-center gap-3 px-5 py-3 text-[15px] text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg w-6 text-center"><FaHeart className="text-red-400" /></span>
                My Wishlist
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                onClick={toggleMenu}
                className="flex items-center gap-3 px-5 py-3 text-[15px] text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg w-6 text-center"><FaShoppingCart className="text-green-600" /></span>
                My Cart
              </Link>
            </li>

            {userInfo?.role === 'farmer' && (
              <li>
                <Link
                  to="/farmer"
                  onClick={toggleMenu}
                  className="flex items-center gap-3 px-5 py-3 text-[15px] text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg w-6 text-center"><FaTachometerAlt className="text-blue-500" /></span>
                  Farmer Dashboard
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-200 p-4">
          {userInfo ? (
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-600 rounded-lg font-semibold text-sm hover:bg-red-100 transition-colors"
            >
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <p className="text-center text-xs text-gray-400">
              🌾 Uzhavan Mart — Farm to Consumer
            </p>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MOBILE BOTTOM NAVIGATION BAR
          ═══════════════════════════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 lg:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
        <div className="flex justify-around items-center h-16 px-2">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => `flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${isActive ? 'text-green-600' : 'text-gray-500'}`}
          >
            <FaHome size={20} />
            <span>Home</span>
          </NavLink>

          <NavLink 
            to="/all-products" 
            className={({ isActive }) => `flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${isActive ? 'text-green-600' : 'text-gray-500'}`}
          >
            <FaStore size={20} />
            <span>Shop</span>
          </NavLink>

          <NavLink 
            to="/wishlist" 
            className={({ isActive }) => `flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors relative ${isActive ? 'text-green-600' : 'text-gray-500'}`}
          >
            <FaHeart size={20} />
            <span>Wishlist</span>
          </NavLink>

          <NavLink 
            to="/cart" 
            className={({ isActive }) => `flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors relative ${isActive ? 'text-green-600' : 'text-gray-500'}`}
          >
            <FaShoppingCart size={20} />
            <span>Cart</span>
          </NavLink>

          <NavLink 
            to={userInfo ? "/profile" : "/buyer-auth"} 
            className={({ isActive }) => `flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${isActive ? 'text-green-600' : 'text-gray-500'}`}
          >
            <FaUser size={20} />
            <span>{userInfo ? 'Account' : 'Login'}</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;