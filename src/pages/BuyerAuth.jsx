import AuthLayout from '../components/auth/AuthLayout';

const BuyerAuth = () => {
  const authContent = {
    title: "Buyer Portal",
    description: "Access fresh farm products directly from local growers. Create an account to:",
    benefits: [
      "Order farm-fresh products",
      "Track your deliveries",
      "Save favorite farmers",
      "Get exclusive buyer offers"
    ],
    userType: "buyer"
  };

  return <AuthLayout {...authContent} />;
};

export default BuyerAuth;