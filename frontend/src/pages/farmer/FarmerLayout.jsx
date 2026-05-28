// src/pages/farmer/FarmerLayout.jsx
import { NavLink, Outlet, Link } from 'react-router-dom';
import { FiHome, FiPackage, FiShoppingBag, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import { useState } from 'react';

const navItems = [
  { to: '/farmer',          icon: FiHome,        label: 'Dashboard',  end: true },
  { to: '/farmer/products', icon: FiPackage,      label: 'Products' },
  { to: '/farmer/orders',   icon: FiShoppingBag,  label: 'Orders' },
];

const SidebarLink = ({ to, icon: Icon, label, end = false, onClick }) => (
  <NavLink
    to={to}
    end={end}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
        isActive
          ? 'bg-white/15 text-white shadow-lg shadow-black/10'
          : 'text-green-200 hover:bg-white/10 hover:text-white'
      }`
    }
  >
    <Icon className="text-lg" />
    {label}
  </NavLink>
);

const FarmerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* ── Desktop Sidebar ─────────────────────────────────── */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-gradient-to-b from-green-800 to-green-900 p-6 fixed h-full z-40">
        {/* Brand */}
        <Link to="/farmer" className="flex items-center gap-3 mb-10 group">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
            <FaLeaf className="text-white text-lg" />
          </div>
          <div>
            <h2 className="text-white font-black text-lg leading-tight">Uzhavan</h2>
            <p className="text-green-300 text-[10px] font-bold uppercase tracking-widest">Farmer Panel</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map(item => (
            <SidebarLink key={item.to} {...item} />
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-4 mt-4 space-y-2">
          <SidebarLink to="/farmer/profile" icon={FiUser} label="Profile" />
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all"
          >
            <FiLogOut className="text-lg" />
            Back to Store
          </Link>
        </div>
      </aside>

      {/* ── Mobile Top Bar ──────────────────────────────────── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-green-800 text-white px-4 py-3 flex items-center justify-between shadow-lg">
        <Link to="/farmer" className="flex items-center gap-2">
          <FaLeaf className="text-lg" />
          <span className="font-black">Uzhavan</span>
          <span className="text-green-300 text-[10px] font-bold uppercase">Farmer</span>
        </Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
          {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* ── Mobile Sidebar Overlay ──────────────────────────── */}
      {sidebarOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="lg:hidden fixed top-0 left-0 w-72 h-full bg-gradient-to-b from-green-800 to-green-900 p-6 z-50 shadow-2xl">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <FaLeaf className="text-white text-lg" />
              </div>
              <div>
                <h2 className="text-white font-black text-lg">Uzhavan</h2>
                <p className="text-green-300 text-[10px] font-bold uppercase tracking-widest">Farmer Panel</p>
              </div>
            </div>
            <nav className="flex flex-col gap-2">
              {navItems.map(item => (
                <SidebarLink key={item.to} {...item} onClick={() => setSidebarOpen(false)} />
              ))}
            </nav>
            <div className="border-t border-white/10 pt-4 mt-8">
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-red-300 hover:bg-red-500/10"
              >
                <FiLogOut className="text-lg" />
                Back to Store
              </Link>
            </div>
          </aside>
        </>
      )}

      {/* ── Mobile Bottom Nav ───────────────────────────────── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="flex justify-around py-2">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-1.5 text-[11px] font-bold transition-colors ${
                  isActive ? 'text-green-700' : 'text-gray-400'
                }`
              }
            >
              <Icon className="text-xl" />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* ── Main Content Area ───────────────────────────────── */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 pb-20 lg:pb-0">
        <Outlet />
      </main>
    </div>
  );
};

export default FarmerLayout;