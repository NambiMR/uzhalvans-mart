import { useState } from 'react';
import AuthForm from './AuthForm';
import AuthToggle from './AuthToggle';

const AuthLayout = ({ title, description, benefits, userType }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Content */}
      <div className="hidden lg:block w-1/2 bg-green-700 text-white p-12">
        <h1 className="text-4xl font-bold mb-6">{title}</h1>
        <p className="text-xl mb-8">{description}</p>
        <ul className="space-y-4">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <svg className="h-6 w-6 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
        <AuthToggle isLogin={isLogin} setIsLogin={setIsLogin} userType={userType} />
        <AuthForm isLogin={isLogin} userType={userType} />
      </div>
    </div>
  );
};

export default AuthLayout;