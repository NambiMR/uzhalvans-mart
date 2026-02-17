import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // 1. Added Axios

const AuthForm = ({ isLogin, userType }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (!agreedToTerms) {
        setError('You must agree to the Terms and Conditions');
        return;
      }
    }

    setIsLoading(true);

    try {
      // 2. Real API Call
      const endpoint = isLogin ? '/login' : '/register';
      const { data } = await axios.post(`http://localhost:5000/api/auth${endpoint}`, {
        ...formData,
        role: userType // Passes 'buyer' or 'farmer' based on the page
      });

      // 3. Store the successful response
      localStorage.setItem('userInfo', JSON.stringify(data));

      // 4. Redirect based on role
      if (data.role === 'farmer') {
        navigate('/seller-dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      // 5. Handle Real Backend Errors
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto w-full">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {isLogin ? `Welcome Back` : `Join as ${userType}`}
      </h2>

      {error && <div className="mb-4 text-red-500 text-center bg-red-50 p-2 rounded">{error}</div>}

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
            disabled={isLoading}
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
          disabled={isLoading}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
          minLength="6"
          disabled={isLoading}
        />
      </div>

      {!isLogin && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-6 flex items-start italic">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              disabled={isLoading}
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
              I agree to the <span className="text-green-600 cursor-pointer underline">Terms of Service</span> and <span className="text-green-600 cursor-pointer underline">Privacy Policy</span>.
            </label>
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white py-3 px-4 rounded-lg font-medium transition-all flex justify-center items-center`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
            Processing...
          </>
        ) : (
          isLogin ? 'Login' : 'Create Account'
        )}
      </button>
    </form>
  );
};

export default AuthForm;