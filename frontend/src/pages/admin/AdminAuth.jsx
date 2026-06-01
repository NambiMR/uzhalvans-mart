import AuthLayout from '../../components/auth/AuthLayout';

const AdminAuth = () => {
  const authContent = {
    title: "Super Admin Gateway",
    description: "Secure access for Uzhavan Mart platform managers. Connect to the Command Center to:",
    benefits: [
      "Manage product categories",
      "Control site-wide settings",
      "Monitor system health",
      "Manage users and farmers"
    ],
    userType: "admin"
  };

  return (
    <div className="bg-slate-900 min-h-screen pt-12">
        <AuthLayout {...authContent} />
    </div>
  );
};

export default AdminAuth;
