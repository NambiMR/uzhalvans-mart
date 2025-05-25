// import { FiMinus, FiPlus } from 'react-icons/fi';

// const QuantitySelector = ({ 
//   quantity, 
//   onIncrease, 
//   onDecrease, 
//   min = 1, 
//   max = 10,
//   className = '' 
// }) => {
//   return (
//     <div className={`flex items-center ${className}`}>
//       <button
//         onClick={onDecrease}
//         disabled={quantity <= min}
//         className={`p-2 rounded-l-lg border ${quantity <= min ? 'bg-gray-100 text-gray-400' : 'bg-white text-green-600 hover:bg-green-50'}`}
//       >
//         <FiMinus />
//       </button>
//       <span className="px-4 py-2 border-t border-b text-center w-12">
//         {quantity}
//       </span>
//       <button
//         onClick={onIncrease}
//         disabled={quantity >= max}
//         className={`p-2 rounded-r-lg border ${quantity >= max ? 'bg-gray-100 text-gray-400' : 'bg-white text-green-600 hover:bg-green-50'}`}
//       >
//         <FiPlus />
//       </button>
//     </div>
//   );
// };

// export default QuantitySelector;


// src/components/products/QuantitySelector.jsx
const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center border rounded-lg w-fit">
      <button 
        onClick={onDecrease}
        className="px-3 py-1 text-red-600 text-xl hover:bg-gray-100"
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="px-4 text-black">{quantity}</span>
      <button 
        onClick={onIncrease}
        className="px-3 py-1 text-green-600 text-xl hover:bg-gray-100"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;