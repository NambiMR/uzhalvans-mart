import { NavLink, Outlet, Link } from 'react-router-dom';
import { FiHome, FiGrid, FiUsers, FiSettings, FiLogOut, FiMenu, FiX, FiActivity } from 'react-icons/fi';
import { FaShieldAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { to: '/admin',             icon: FiActivity,   label: 'Overview',  end: true },
  { to: '/admin/categories',   icon: FiGrid,       label: 'Categories' },
  { to: '/admin/users',        icon: FiUsers,      label: 'Users' },
  { to: '/admin/settings',     icon: FiSettings,    label: 'Site Settings' },
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
          : 'text-indigo-200 hover:bg-white/10 hover:text-white'
      }`
    }
  >
    <Icon className="text-lg" />
    {label}
  </NavLink>
);

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Authentication & Authorization Check
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || userInfo.role !== 'admin') {
      navigate('/admin/auth');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* ── Desktop Sidebar ─────────────────────────────────── */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-gradient-to-b from-indigo-900 to-slate-900 p-6 fixed h-full z-40">
        {/* Brand */}
        <Link to="/admin" className="flex items-center gap-3 mb-10 group">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
            <FaShieldAlt className="text-white text-lg" />
          </div>
          <div>
            <h2 className="text-white font-black text-lg leading-tight">Uzhavan</h2>
            <p className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest">Super Admin</p>
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
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-rose-300 hover:bg-rose-500/10 hover:text-rose-200 transition-all w-full text-left"
          >
            <FiLogOut className="text-lg" />
            Logout & Exit
          </button>
        </div>
      </aside>

      {/* ── Mobile Top Bar ──────────────────────────────────── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-indigo-900 text-white px-4 py-3 flex items-center justify-between shadow-lg">
        <Link to="/admin" className="flex items-center gap-2">
          <FaShieldAlt className="text-lg" />
          <span className="font-black">Uzhavan</span>
          <span className="text-indigo-300 text-[10px] font-bold uppercase">Admin</span>
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
          <aside className="lg:hidden fixed top-0 left-0 w-72 h-full bg-gradient-to-b from-indigo-900 to-slate-900 p-6 z-50 shadow-2xl">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <FaShieldAlt className="text-white text-lg" />
              </div>
              <div>
                <h2 className="text-white font-black text-lg">Uzhavan</h2>
                <p className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest">Super Admin</p>
              </div>
            </div>
            <nav className="flex flex-col gap-2">
              {navItems.map(item => (
                <SidebarLink key={item.to} {...item} onClick={() => setSidebarOpen(false)} />
              ))}
            </nav>
            <div className="border-t border-white/10 pt-4 mt-8">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-rose-300 hover:bg-rose-500/10 w-full text-left"
              >
                <FiLogOut className="text-lg" />
                Logout & Exit
              </button>
            </div>
          </aside>
        </>
      )}

      {/* ── Main Content Area ───────────────────────────────── */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 pb-20 lg:pb-0">
        <div className="p-4 md:p-8">
            <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
