// import { useState } from 'react';
// import RatingStars from '../shared/RatingStars';

// const ProductTabs = ({ product }) => {
//   const [activeTab, setActiveTab] = useState('details');

//   const tabs = [
//     { id: 'details', label: 'Product Details' },
//     { id: 'specs', label: 'Specifications' },
//     { id: 'reviews', label: `Reviews (${product.reviewCount || 0})` }
//   ];

//   return (
//     <div className="mt-8">
//       {/* Tab Navigation */}
//       <div className="border-b border-gray-200">
//         <nav className="flex space-x-8">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`py-3 px-1 font-medium text-sm border-b-2 ${
//                 activeTab === tab.id
//                   ? 'border-green-500 text-green-600'
//                   : 'border-transparent text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* Tab Content */}
//       <div className="py-6">
//         {activeTab === 'details' && (
//           <div>
//             <h3 className="text-lg font-medium mb-2">Description</h3>
//             <p className="text-gray-600 whitespace-pre-line">
//               {product.description}
//             </p>
//           </div>
//         )}

//         {activeTab === 'specs' && (
//           <div className="grid grid-cols-2 gap-4">
//             {Object.entries(product.specs || {}).map(([key, value]) => (
//               <div key={key} className="border-b pb-2">
//                 <span className="font-medium capitalize">{key}:</span>
//                 <span className="ml-2 text-gray-600">{value}</span>
//               </div>
//             ))}
//           </div>
//         )}

//         {activeTab === 'reviews' && (
//           <div>
//             {product.reviews?.length > 0 ? (
//               product.reviews.map(review => (
//                 <div key={review.id} className="border-b py-4">
//                   <div className="flex items-center mb-2">
//                     <RatingStars rating={review.rating} />
//                     <span className="ml-2 text-sm text-gray-500">
//                       {review.author} • {new Date(review.date).toLocaleDateString()}
//                     </span>
//                   </div>
//                   <p className="text-gray-800">{review.comment}</p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">No reviews yet. Be the first!</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductTabs;

// src/components/products/ProductTabs.jsx
import { useState } from 'react';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="mt-12">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {['description', 'specifications', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 font-medium text-sm border-b-2 ${
                activeTab === tab 
                  ? 'border-green-500 text-green-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      <div className="py-6">
        {activeTab === 'description' && (
          <p className="text-gray-600">{product.description}</p>
        )}
        
        {activeTab === 'specifications' && (
          <ul className="space-y-2">
            {Object.entries(product.specs).map(([key, value]) => (
              <li key={key} className="flex">
                <span className="text-gray-500 w-32">{key}:</span>
                <span className="text-gray-800">{value}</span>
              </li>
            ))}
          </ul>
        )}
        
        {activeTab === 'reviews' && (
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold mr-2">{product.rating}</span>
              <div className="text-yellow-400">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="text-gray-500 ml-2">({product.reviewCount} reviews)</span>
            </div>
            {/* Reviews would be mapped here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;