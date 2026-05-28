const AuthToggle = ({ isLogin, setIsLogin, userType }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white p-1 rounded-full shadow-md">
        <button
          onClick={() => setIsLogin(true)}
          className={`px-6 py-2 rounded-full ${isLogin ? 'bg-green-600 text-white' : 'text-gray-700'}`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`px-6 py-2 rounded-full ${!isLogin ? 'bg-green-600 text-white' : 'text-gray-700'}`}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default AuthToggle;