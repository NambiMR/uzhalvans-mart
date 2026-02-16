import { useParams } from "react-router-dom";
// Shows quick stats and recent orders
const FarmerDashboard = () => {
  const { farmerId } = useParams(); // From URL or auth context
  const farmerProducts = products.filter(p => p.farmerId === farmerId);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Your Dashboard</h1>
      
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <p>Total Products</p>
          <p className="text-3xl">{farmerProducts.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p>Orders Today</p>
          <p className="text-3xl">12</p> {/* Hardcoded for now */}
        </div>
      </div>

      {/* Recent Orders */}
      <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
      <div className="space-y-4">
        {orders.slice(0, 5).map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default FarmerDashboard