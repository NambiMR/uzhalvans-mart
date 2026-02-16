import {useState,useEffect} from 'react'

// Lists farmer's products + edit/delete/add
const FarmerProducts = (products) => {
  const [farmerProducts, setFarmerProducts] = useState([]);

  useEffect(() => {
    // Replace with actual farmer ID from auth
    const filtered = products.filter(p => p.farmerId === "f1");
    setFarmerProducts(filtered);
  }, []);

  const handleDelete = (id) => {
    setFarmerProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Products</h1>
        <Link to="/farmer/products/new" className="bg-green-600 text-white px-4 py-2 rounded">
          Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {farmerProducts.map(product => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <img src={product.image} alt={product.name} className="h-32 w-full object-cover" />
            <h3 className="font-bold mt-2">{product.name}</h3>
            <p>Stock: {product.stock}</p>
            <div className="flex gap-2 mt-2">
              <button className="text-blue-600">Edit</button>
              <button onClick={() => handleDelete(product.id)} className="text-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmerProducts