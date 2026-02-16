import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const RatingStars = ({ rating = 0, size = 'md' }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`flex text-yellow-400 ${sizeClasses[size]}`}>
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) return <FaStar key={i} className="mr-0.5" />;
        if (i === fullStars && hasHalfStar) return <FaStarHalfAlt key={i} className="mr-0.5" />;
        return <FaRegStar key={i} className="mr-0.5" />;
      })}
      <span className="ml-1 text-gray-500 text-sm">{rating.toFixed(1)}</span>
    </div>
  );
};

export default RatingStars;