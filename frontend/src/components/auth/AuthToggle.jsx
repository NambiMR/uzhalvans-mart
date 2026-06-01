import { motion } from 'framer-motion';

const AuthToggle = ({ isLogin, setIsLogin, userType }) => {
  const isFarmer = userType === 'farmer';
  const accentColor = isFarmer ? 'indigo' : 'green';

  return (
    <div className="flex justify-center mb-10">
      <div className="bg-slate-100 p-1.5 rounded-[1.5rem] flex items-center relative w-full sm:w-64 border border-slate-200/50">
        <button
          onClick={() => setIsLogin(true)}
          className={`relative z-10 flex-1 py-3 text-sm font-black transition-colors ${
            isLogin ? 'text-white' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Login
        </button>
        {userType !== 'admin' && (
          <button
            onClick={() => setIsLogin(false)}
            className={`relative z-10 flex-1 py-3 text-sm font-black transition-colors ${
              !isLogin ? 'text-white' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Register
          </button>
        )}

        {/* Animated Background Pill */}
        <motion.div
           layout
           transition={{ type: 'spring', stiffness: 300, damping: 30 }}
           className={`absolute h-[calc(100%-12px)] ${userType === 'admin' ? 'w-[calc(100%-12px)]' : 'w-[calc(50%-6px)]'} bg-${accentColor}-600 rounded-2xl shadow-xl shadow-${accentColor}-500/30`}
           style={{
             left: isLogin ? '6px' : 'calc(50%)',
           }}
        />
      </div>
    </div>
  );
};

export default AuthToggle;