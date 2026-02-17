import { motion } from 'framer-motion';

const TermsAndServices = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-200 py-12"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-8">
          Terms of Service
        </h1>
        
        <div className="max-w-4xl mx-auto bg-green-50 rounded-xl p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 mb-6">
            By accessing or using FarmerMarket ("the Platform"), you agree to comply with and be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use our services.
          </p>

          <h2 className="text-2xl font-semibold text-green-700 mb-4">2. Farmer Responsibilities</h2>
          <p className="text-gray-700 mb-6">
            Farmers selling on our platform must provide accurate product information, 
            maintain fair pricing, and ensure all products meet quality standards. 
            Any misrepresentation may result in account suspension.
          </p>

          <h2 className="text-2xl font-semibold text-green-700 mb-4">3. Buyer Responsibilities</h2>
          <p className="text-gray-700 mb-6">
            Buyers are responsible for reviewing product details before purchase. 
            We encourage direct communication with farmers for any specific requirements.
          </p>

          <h2 className="text-2xl font-semibold text-green-700 mb-4">4. Payments & Refunds</h2>
          <p className="text-gray-700 mb-6">
            All transactions are processed securely. Refunds are handled on a case-by-case basis 
            and must be requested within 7 days of delivery for perishable goods.
          </p>

          <h2 className="text-2xl font-semibold text-green-700 mb-4">5. Delivery Policy</h2>
          <p className="text-gray-700 mb-6">
            Delivery times may vary based on product availability and location. 
            Farmers will provide estimated delivery timelines at checkout.
          </p>

          <h2 className="text-2xl font-semibold text-green-700 mb-4">6. Privacy Policy</h2>
          <p className="text-gray-700 mb-6">
            We collect only necessary information to facilitate transactions. 
            Your data will never be sold to third parties.
          </p>

          <h2 className="text-2xl font-semibold text-green-700 mb-4">7. Changes to Terms</h2>
          <p className="text-gray-700">
            We reserve the right to modify these terms at any time. Continued use of the Platform 
            after changes constitutes acceptance of the new terms.
          </p>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TermsAndServices;