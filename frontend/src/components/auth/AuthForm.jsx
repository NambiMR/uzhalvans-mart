import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ isLogin, userType }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem(`${userType}s`)) || [];

    if (isLogin) {
      // Login logic
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify({ ...user, type: userType }));
        navigate(userType === 'buyer' ? '/' : '/seller-dashboard');
      } else {
        setError('Invalid credentials');
      }
    } else {
      // Register logic
      if (users.some(u => u.email === formData.email)) {
        setError('Email already registered');
        return;
      }
      const newUser = { ...formData, id: Date.now() };
      localStorage.setItem(`${userType}s`, JSON.stringify([...users, newUser]));
      localStorage.setItem('currentUser', JSON.stringify({ ...newUser, type: userType }));
      navigate(userType === 'buyer' ? '/' : '/seller-dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto w-full">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {isLogin ? `Welcome Back` : `Join as ${userType}`}
      </h2>

      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

      {!isLogin && (
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
          minLength="6"
        />
      </div>

      {!isLogin && (
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
      >
        {isLogin ? 'Login' : 'Register'}
      </button>
    </form>
  );
};

export default AuthForm;