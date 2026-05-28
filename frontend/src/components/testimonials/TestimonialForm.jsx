// src/components/testimonials/TestimonialForm.jsx
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const TestimonialForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 0,
    hoverRating: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      image: '/images/placeholder-avatar.jpg' // Default image
    });
    setFormData({ name: '', role: '', content: '', rating: 0, hoverRating: 0 });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Share Your Experience</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Role</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              placeholder="Farmer/Customer"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Your Testimonial</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            rows="4"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Rating</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onMouseEnter={() => setFormData({...formData, hoverRating: star})}
                onMouseLeave={() => setFormData({...formData, hoverRating: 0})}
                onClick={() => setFormData({...formData, rating: star})}
                className="text-2xl mr-1"
              >
                <FaStar 
  className={
    star <= (formData.hoverRating || formData.rating) 
      ? 'text-yellow-400 transform transition-transform duration-200 ease-in-out hover:scale-125'
      : 'text-gray-300'
  }
/>
              </button>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Testimonial
        </button>
      </form>
    </div>
  );
};

export default TestimonialForm;