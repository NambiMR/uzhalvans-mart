import { FiUsers, FiPackage, FiGrid, FiTrendingUp } from 'react-icons/fi';

const StatCard = ({ icon: Icon, label, value, trend, color }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10`}>
        <Icon className={`text-2xl ${color.replace('bg-', 'text-')}`} />
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">
          <FiTrendingUp /> {trend}
        </span>
      )}
    </div>
    <div className="mt-4">
      <h3 className="text-slate-500 text-sm font-medium">{label}</h3>
      <p className="text-2xl font-black text-slate-800 mt-1">{value}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-800">Command Center</h1>
        <p className="text-slate-500 font-medium">Welcome back, Super Admin. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={FiUsers} 
          label="Total Users" 
          value="1,284" 
          trend="+12%" 
          color="bg-indigo-600" 
        />
        <StatCard 
          icon={FiPackage} 
          label="Active Products" 
          value="452" 
          trend="+5%" 
          color="bg-emerald-600" 
        />
        <StatCard 
          icon={FiGrid} 
          label="Categories" 
          value="18" 
          color="bg-amber-600" 
        />
        <StatCard 
          icon={FiTrendingUp} 
          label="Monthly Revenue" 
          value="₹45,280" 
          trend="+18%" 
          color="bg-rose-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity Placeholder */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400">
                    {i}
                </div>
                <div>
                   <p className="text-sm font-bold text-slate-700">New Farmer Registered</p>
                   <p className="text-xs text-slate-400">2 hours ago • Madurai, TN</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health Placeholder */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
           <h2 className="text-xl font-bold text-slate-800 mb-6">System Health</h2>
           <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-slate-600">Database Capacity</span>
                    <span className="text-indigo-600 font-black">42%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-slate-600">Server Load</span>
                    <span className="text-emerald-600 font-black">18%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '18%' }}></div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
