// src/pages/farmer/FarmerLayout.jsx
import { Link, Outlet } from 'react-router-dom';
import { FiHome, FiPackage, FiShoppingBag } from 'react-icons/fi';

const FarmerLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-56 bg-green-800 text-white p-4">
        <h2 className="text-xl font-bold mb-8">Farmer Dashboard</h2>
        <nav className="space-y-2">
          <Link to="/farmer" className="flex items-center gap-2 p-2 hover:bg-green-700 rounded">
            <FiHome /> Dashboard
          </Link>
          <Link to="/farmer/products" className="flex items-center gap-2 p-2 hover:bg-green-700 rounded">
            <FiPackage /> Products
          </Link>
          <Link to="/farmer/orders" className="flex items-center gap-2 p-2 hover:bg-green-700 rounded">
            <FiShoppingBag /> Orders
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-6">
        <Outlet /> {/* This renders the current route's component */}
      </div>
    </div>
  );
};

export default FarmerLayout;