import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [user, setUser] = useState(null);
  const [analytics, setAnalytics] = useState({
    mostRecentProduct: null,
    productCount: 0,
    highestQuantityProduct: null,
    lowestQuantityProduct: null,
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(storedUser);
    }
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }
    setLoading(true);
    fetch('http://localhost:3000/products', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
          let highest = null, lowest = null;
          if (data.length > 0) {
            highest = data.reduce((a, b) => a.quantity > b.quantity ? a : b);
            lowest = data.reduce((a, b) => a.quantity < b.quantity ? a : b);
          }
          setAnalytics(a => ({
            ...a,
            mostRecentProduct: data.length > 0 ? data[data.length - 1].name : '-',
            productCount: data.length,
            highestQuantityProduct: highest ? `${highest.name} (${highest.quantity})` : '-',
            lowestQuantityProduct: lowest ? `${lowest.name} (${lowest.quantity})` : '-',
          }));
        } else {
          setError(data.message || 'Failed to fetch products');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Network error');
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow flex justify-between items-center px-8 py-4">
        <div className="text-xl font-bold">Inventory Management System</div>
        <div className="flex items-center space-x-4">
          <span className="font-medium">{user?.username || 'User'}</span>
          <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Logout</button>
        </div>
      </nav>
      {/* Analytics Cards */}
      <div className="flex flex-row gap-4 p-8 overflow-x-auto justify-center">
        <div className="bg-white p-4 rounded shadow text-center min-w-[220px]">
          <div className="text-gray-500">Most Recent Product</div>
          <div className="font-bold text-lg">{analytics.mostRecentProduct}</div>
        </div>
        <div className="bg-white p-4 rounded shadow text-center min-w-[220px]">
          <div className="text-gray-500">Number of Products</div>
          <div className="font-bold text-lg">{analytics.productCount}</div>
        </div>
        <div className="bg-white p-4 rounded shadow text-center min-w-[220px]">
          <div className="text-gray-500">Highest Quantity Product</div>
          <div className="font-bold text-lg">{analytics.highestQuantityProduct}</div>
        </div>
        <div className="bg-white p-4 rounded shadow text-center min-w-[220px]">
          <div className="text-gray-500">Lowest Quantity Product</div>
          <div className="font-bold text-lg">{analytics.lowestQuantityProduct}</div>
        </div>
      </div>
      {/* Products List */}
      <div className="p-8">
        <h2 className="text-xl font-bold mb-4">All Products</h2>
        <div className="bg-white rounded shadow p-4">
          {loading ? (
            <div className="text-gray-500">Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : products.length === 0 ? (
            <div className="text-gray-500">No products found.</div>
          ) : (
            <table className="min-w-full text-left">
              <thead>
                <tr>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Type</th>
                  <th className="py-2 px-4">SKU</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-t">
                    <td className="py-2 px-4">{product.name}</td>
                    <td className="py-2 px-4">{product.type}</td>
                    <td className="py-2 px-4">{product.sku}</td>
                    <td className="py-2 px-4">{product.quantity}</td>
                    <td className="py-2 px-4">${product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
} 