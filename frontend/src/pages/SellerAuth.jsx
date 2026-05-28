import AuthLayout from '../components/auth/AuthLayout';

const SellerAuth = () => {
  const authContent = {
    title: "Farmer Portal",
    description: "Sell your farm products directly to consumers. Register to:",
    benefits: [
      "List your products easily",
      "Manage orders and inventory",
      "Connect with local buyers",
      "Receive direct payments"
    ],
    userType: "farmer"
  };

  return <AuthLayout {...authContent} />;
};

export default SellerAuth;