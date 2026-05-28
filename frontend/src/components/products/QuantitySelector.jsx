// src/components/products/QuantitySelector.jsx
import { FiMinus, FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';

const QuantitySelector = ({ quantity, onIncrease, onDecrease, className = "" }) => {
  return (
    <div className={`flex items-center bg-gray-50 rounded-2xl p-1 w-fit border border-gray-100 ${className}`}>
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={onDecrease}
        className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-red-500 hover:text-red-600 transition-colors disabled:opacity-30"
        aria-label="Decrease quantity"
        disabled={quantity <= 1}
      >
        <FiMinus />
      </motion.button>
      
      <div className="w-14 text-center font-black text-gray-800 text-lg">
        {quantity}
      </div>

      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={onIncrease}
        className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-green-600 hover:text-green-700 transition-colors"
        aria-label="Increase quantity"
      >
        <FiPlus />
      </motion.button>
    </div>
  );
};

export default QuantitySelector;