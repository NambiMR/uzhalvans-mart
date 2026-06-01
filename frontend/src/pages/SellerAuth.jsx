import AuthLayout from '../components/auth/AuthLayout';

const SellerAuth = () => {
  const authContent = {
    title: "Farmer Portal",
    description: "Sell your farm products directly to consumers. Register to:",
    benefits: [
      "Direct Farm-to-Consumer Market",
      "Real-time Inventory Management",
      "Transparent Pricing & Analytics",
      "Instant Direct Bank Transfers"
    ],
    userType: "farmer"
  };

  return <AuthLayout {...authContent} />;
};

export default SellerAuth;