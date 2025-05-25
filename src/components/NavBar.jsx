import { useState } from "react";
import { FaSearch, FaHome, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";
import { IoMdArrowDropdown } from "react-icons/io";
import logo from "../assets/images/logo1.png";
import { Link, NavLink, useNavigate } from "react-router-dom";

// Reusable NavItem component
const NavItem = ({ to, children, icon, onClick, className = "" }) => (
  <li>
    <NavLink 
      to={to}
      onClick={onClick}
      className={({ isActive }) => 
        `hover:text-green-500 transition-colors ${className} ${
          isActive ? "text-green-600 font-semibold" : ""
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

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
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

        {/* Search Section */}
        <form onSubmit={handleSearch} className="flex flex-grow max-w-2xl mx-4">
          <select 
            className="select select-md rounded-l-sm bg-gray-300 text-black border-r-0 focus:outline-none"
            name="category"
          >
            <option value="all">All Categories</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="grains">Grains</option>
          </select>
          <input
            type="text"
            name="search"
            placeholder="Search Product"
            className="input input-md w-full rounded-none border-x-0 bg-white text-black focus:outline-none"
          />
          <button 
            type="submit"
            className="btn btn-md btn-square bg-green-400 text-white rounded-r-md border-l-0 focus:outline-none"
          >
            <FaSearch />
          </button>
        </form>

        {/* Login/Register Dropdown */}
        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="btn btn-sm btn-ghost text-white gap-2">
            <FaUser className="text-xl" /> Login / Registration
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-white text-black rounded-box w-40 animate-fade-in"
          >
            <li><Link to="/buyer-auth">Buyer Login</Link></li>
            <li><Link to="/seller-auth">Seller Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
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
      <div className={`fixed top-0 right-0 h-full w-full lg:w-[300px] bg-white bg-opacity-90 backdrop-blur-md shadow-lg transform ${
        menuOpen ? "translate-x-0" : "translate-x-full"
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
              icon={item.icon}
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