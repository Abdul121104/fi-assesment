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
  const [showAdd, setShowAdd] = useState(false);
  const [editQtyId, setEditQtyId] = useState(null);
  const [editQtyValue, setEditQtyValue] = useState('');
  const [addForm, setAddForm] = useState({ name: '', type: '', sku: '', image_url: '', description: '', quantity: '', price: '' });
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState('');
  const navigate = useNavigate();

  const fetchProducts = () => {
    const token = localStorage.getItem('access_token');
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
  };

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
    fetchProducts();
    // eslint-disable-next-line
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  // Add Product handler
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setActionError('');
    const token = localStorage.getItem('access_token');
    try {
      const res = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...addForm,
          quantity: Number(addForm.quantity),
          price: Number(addForm.price)
        })
      });
      if (res.ok) {
        setShowAdd(false);
        setAddForm({ name: '', type: '', sku: '', image_url: '', description: '', quantity: '', price: '' });
        fetchProducts();
      } else {
        const data = await res.json();
        setActionError(data.message || 'Failed to add product');
      }
    } catch {
      setActionError('Network error');
    }
    setActionLoading(false);
  };

  // Update Quantity handler
  const handleUpdateQuantity = async (productId) => {
    setActionLoading(true);
    setActionError('');
    const token = localStorage.getItem('access_token');
    try {
      const res = await fetch(`http://localhost:3000/products/${productId}/quantity`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity: Number(editQtyValue) })
      });
      if (res.ok) {
        setEditQtyId(null);
        fetchProducts();
      } else {
        const data = await res.json();
        setActionError(data.message || 'Failed to update quantity');
      }
    } catch {
      setActionError('Network error');
    }
    setActionLoading(false);
  };

  // Add Product form
  function AddProductForm() {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
        <div className="bg-white p-6 rounded shadow w-full max-w-md relative">
          <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={() => setShowAdd(false)}>&times;</button>
          <h2 className="text-xl font-bold mb-4">Add Product</h2>
          <form className="space-y-4" onSubmit={handleAddProduct}>
            <input className="w-full px-3 py-2 border rounded" placeholder="Name" value={addForm.name} onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))} required />
            <input className="w-full px-3 py-2 border rounded" placeholder="Type" value={addForm.type} onChange={e => setAddForm(f => ({ ...f, type: e.target.value }))} required />
            <input className="w-full px-3 py-2 border rounded" placeholder="SKU" value={addForm.sku} onChange={e => setAddForm(f => ({ ...f, sku: e.target.value }))} required />
            <input className="w-full px-3 py-2 border rounded" placeholder="Image URL" value={addForm.image_url} onChange={e => setAddForm(f => ({ ...f, image_url: e.target.value }))} required />
            <input className="w-full px-3 py-2 border rounded" placeholder="Description" value={addForm.description} onChange={e => setAddForm(f => ({ ...f, description: e.target.value }))} required />
            <input className="w-full px-3 py-2 border rounded" placeholder="Quantity" type="number" value={addForm.quantity} onChange={e => setAddForm(f => ({ ...f, quantity: e.target.value }))} required />
            <input className="w-full px-3 py-2 border rounded" placeholder="Price" type="number" value={addForm.price} onChange={e => setAddForm(f => ({ ...f, price: e.target.value }))} required />
            {actionError && <div className="text-red-500 text-sm">{actionError}</div>}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" disabled={actionLoading}>{actionLoading ? 'Adding...' : 'Add Product'}</button>
          </form>
        </div>
      </div>
    );
  }

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
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setShowAdd(true)}
          >
            Add Product
          </button>
        </div>
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
                    <td className="py-2 px-4 relative group">
                      {editQtyId === product._id ? (
                        <span className="flex items-center">
                          <input
                            type="number"
                            className="border rounded px-2 py-1 w-20 mr-2"
                            value={editQtyValue}
                            onChange={e => setEditQtyValue(e.target.value)}
                            autoFocus
                          />
                          <button
                            className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
                            onClick={() => handleUpdateQuantity(product._id)}
                            disabled={actionLoading}
                          >
                            {actionLoading ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            className="ml-1 text-gray-400 hover:text-gray-600 text-lg"
                            onClick={() => setEditQtyId(null)}
                          >
                            &times;
                          </button>
                        </span>
                      ) : (
                        <span className="flex items-center">
                          {product.quantity}
                          <button
                            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-blue-600"
                            title="Edit Quantity"
                            onClick={() => {
                              setEditQtyId(product._id);
                              setEditQtyValue(product.quantity);
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3h3z" /></svg>
                          </button>
                        </span>
                      )}
                      {editQtyId === product._id && actionError && <div className="text-red-500 text-xs mt-1">{actionError}</div>}
                    </td>
                    <td className="py-2 px-4">${product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {showAdd && <AddProductForm />}
    </div>
  );
} 