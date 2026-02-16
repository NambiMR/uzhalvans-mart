// src/components/SectionHeader.jsx
import { Link } from 'react-router-dom';

const SectionHeader = ({ title, subtitle, link, icon }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
      <div className="mb-4 md:mb-0">
        <div className="flex items-center">
          {icon && <span className="text-2xl mr-2">{icon}</span>}
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        </div>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      {link && (
        <Link 
          to={link} 
          className="text-green-600 hover:text-green-800 font-medium flex items-center"
        >
          View all
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;