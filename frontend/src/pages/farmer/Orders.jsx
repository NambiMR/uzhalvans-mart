// Simplified order list with status updates
const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  // Mock orders (replace with API later)
  useEffect(() => {
    setOrders([
      { id: 1, product: "Organic Tomatoes", status: "pending", buyer: "Ramesh" },
      { id: 2, product: "Fresh Apples", status: "shipped", buyer: "Priya" }
    ]);
  }, []);

  const updateStatus = (id, newStatus) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-4 rounded shadow">
            <p><strong>{order.product}</strong></p>
            <p>Buyer: {order.buyer}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`px-2 rounded ${
                order.status === 'shipped' ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                {order.status}
              </span>
              {order.status === 'pending' && (
                <button 
                  onClick={() => updateStatus(order.id, 'shipped')}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                  Mark as Shipped
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};