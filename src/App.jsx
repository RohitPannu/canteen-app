import { useState, useEffect } from "react";
import foodItems from "./data/foodItems";
import Navbar from "./components/NavBar";
import FoodCard from "./components/FoodCard";
import CartItem from "./components/CartItem";

function App() {
  const [orders, setOrders] = useState(() => {
  const saved = localStorage.getItem("orders");
  return saved ? JSON.parse(saved) : [];
});

  const [menu, setMenu] = useState(() => {
    const saved = localStorage.getItem("menu");
    return saved ? JSON.parse(saved) : foodItems;
  });

  const [showCheckout, setShowCheckout] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

const increaseQty = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item));
  };

const decreaseQty = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, qty: item.qty - 1 } : item).filter(item => item.qty > 0));
  };

const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("menu", JSON.stringify(menu));
  }, [menu]);

const updateQty = (id, change) => {
  setCart(cart =>
    cart
      .map(item =>
        item.id === id
          ? { ...item, qty: item.qty + change }
          : item
      )
      .filter(item => item.qty > 0)
  );
};

const removeFromCart = (id) => {
  setCart(cart.filter(item => item.id !== id));
};

return (
  <div className="min-h-screen bg-gray-100 p-6">
      {isAdmin ? (
        <div className="flex justify-between items-center bg-white shadow px-6 py-4 mb-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800">
            🛠 Admin Dashboard
          </h2>

          <button
            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
            onClick={() => setIsAdmin(false)}
          >
            Exit Admin
          </button>
        </div>
      ) : (
        <button
          className="mb-4 bg-black text-white px-4 py-2 rounded"
          onClick={() => setIsAdmin(true)}
        >
          Switch to Admin Mode
        </button>
      )}

      <Navbar cartCount={cart.length} />

      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              ➕ Add New Item
            </h3>

            <input
              type="text"
              placeholder="Item Name"
              className="w-full border rounded px-3 py-2 mb-3 focus:outline-none focus:ring focus:ring-blue-300"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />

            <input
              type="number"
              placeholder="Price (Rs)"
              className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring focus:ring-blue-300"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />

            <button
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              onClick={() => {
                setMenu([...menu, {
                  id: Date.now(),
                  name: newName,
                  price: Number(newPrice),
                }]);
                setNewName("");
                setNewPrice("");
              }}
            >
              Add Item
            </button>
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              📋 Menu Items
            </h3>

            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Name</th>
                  <th>Price</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {menu.map(item => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{item.name}</td>
                    <td>Rs. {item.price}</td>
                    <td className="text-right">
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() =>
                          setMenu(menu.filter(i => i.id !== item.id))
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!isAdmin && (
        <>
          <button
            className="mb-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            onClick={() => setIsAdmin(true)}
          >
            Enter Admin Panel
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {menu.map(item => (
        <div
          key={item.id}
          className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600">Rs. {item.price}</p>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex-1"
              onClick={() => addToCart(item)}
            >
              Add
            </button>
            {isAdmin && (
              <button
                className="text-red-600 text-sm"
                onClick={() =>
                  setMenu(menu.filter(i => i.id !== item.id))
                }
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
      </div>
        </>
      )}

      <hr />

      <h2>🛒 Cart ({cart.length})</h2>
      {cart.length === 0 && <p>No items in cart</p>}
      {cart.map(item => (
        <div key={item.id} className="bg-white p-4 rounded-lg shadow mb-4">
          <p className="font-medium">{item.name}</p>

          <div className="flex items-center gap-3 mt-2">
            <button
              className="px-2 bg-red-400 text-white rounded"
              onClick={() => decreaseQty(item.id)}
            >−</button>

            <span>{item.qty}</span>

            <button
              className="px-2 bg-green-500 text-white rounded"
              onClick={() => increaseQty(item.id)}
            >+</button>
          </div>

          <p className="mt-2 text-sm text-gray-600">
            Rs. {item.price * item.qty}
          </p>
        </div>
      ))}
    <h3 style={{ marginTop: "20px", fontWeight: "bold" }}>Total Bill: Rs. {total}</h3>
        <button
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          onClick={() => setShowCheckout(true)}
        >
          Checkout
        </button>

      <hr />
      <h2>📦 Order History</h2>

      {orders.length === 0 && <p>No past orders</p>}

      {orders.map(order => (
        <div key={order.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p><strong>Date:</strong> {order.date}</p>

          {order.items.map(item => (
            <p key={item.id}>
              {item.name} × {item.qty}
            </p>
          ))}

          <strong>Total: Rs. {order.total}</strong>
        </div>
      ))}

      {showCheckout && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)"
        }}>
          <div style={{
            background: "#fff",
            padding: "20px",
            width: "300px",
            margin: "100px auto",
            borderRadius: "8px"
          }}>
            <h3>🧾 Order Summary</h3>

            {cart.map(item => (
              <p key={item.id}>
                {item.name} × {item.qty} = Rs. {item.qty * item.price}
              </p>
            ))}

            <hr />
            <strong>Total: Rs. {total}</strong>

            <br /><br />

            <button onClick={() => {
  const newOrder = {
    id: Date.now(),
    items: cart,
    total,
    date: new Date().toLocaleString(),
  };

  setOrders([...orders, newOrder]);
  setCart([]);
  setShowCheckout(false);
}}
            > 
              Confirm Order
            </button>

            <button onClick={() => setShowCheckout(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}




export default App;
