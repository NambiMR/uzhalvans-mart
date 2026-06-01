import AuthLayout from '../components/auth/AuthLayout';

const BuyerAuth = () => {
  const authContent = {
    title: "Buyer Portal",
    description: "Access fresh farm products directly from local growers. Create an account to:",
    benefits: [
      "Daily Morning Harvest Delivery",
      "100% Traceable Organic Sources",
      "Save Your Favorite Local Farms",
      "Exclusive Farm-to-Table Offers"
    ],
    userType: "buyer"
  };

  return <AuthLayout {...authContent} />;
};

export default BuyerAuth;