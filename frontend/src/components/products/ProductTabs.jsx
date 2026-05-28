// src/components/products/ProductTabs.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Details' },
    { id: 'farmer', label: 'Farmer Story' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <div className="w-full">
      {/* 🧭 Tab Navigation */}
      <div className="flex border-b border-gray-100 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 px-4 font-bold text-xs uppercase tracking-widest transition-all relative ${
              activeTab === tab.id ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab" 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
              />
            )}
          </button>
        ))}
      </div>

      {/* 📄 Content Area */}
      <div className="p-8 min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-gray-600 leading-relaxed"
          >
            {activeTab === 'description' && (
              <div className="space-y-4">
                <p className="text-lg font-medium text-gray-800">Fresh from the Soil</p>
                <p>{product.description || "This fresh produce is harvested with care from local farms. 100% organic and handled with the highest hygiene standards."}</p>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specs || { "Weight": "1Kg", "Origin": "Local Farm", "Type": "Organic" }).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-gray-400 capitalize font-medium">{key}</span>
                    <span className="text-gray-800 font-bold">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'farmer' && (
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-24 h-24 rounded-3xl bg-green-50 shrink-0 overflow-hidden border border-green-100">
                  <img src={product.farmerAvatar} alt={product.farmer} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-gray-800 font-bold text-xl mb-2">Meet {product.farmer || "Farmer Rajesh"}</p>
                  <p className="text-sm">
                    {product.farmerBio || "A 3rd generation organic farmer dedicated to sustainable agriculture. Every seed is planted with the goal of bringing health to your family."}
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-2xl w-fit">
                  <span className="text-4xl font-black text-gray-800">{product.rating || "4.8"}</span>
                  <div>
                    <div className="text-yellow-400 text-lg">★★★★★</div>
                    <p className="text-xs text-gray-400 font-bold uppercase">{product.reviewCount || "12"} Verified Reviews</p>
                  </div>
                </div>
                <p className="text-sm italic text-gray-400">"Real feedback from our farm-to-table community."</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductTabs;