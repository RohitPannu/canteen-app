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

  const [showCheckout, setShowCheckout] = useState(false);

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
    <div style={{ padding: "20px" }}>
      <Navbar cartCount={cart.length} />

      {foodItems.map(item => (
        <FoodCard key={item.id} item={item} addToCart={addToCart} />
      ))}

      <hr />

      <h2>🛒 Cart ({cart.length})</h2>
      {cart.length === 0 && <p>No items in cart</p>}
      {cart.map(item => (
  
  <div key={item.id}>
    <p>
      {item.name} — Rs. {item.price} × {item.qty}
    </p>

    <button onClick={() => updateQty(item.id, -1)}>-</button>
    <button onClick={() => updateQty(item.id, 1)}>+</button>
    <button onClick={() => removeFromCart(item.id)}>Remove</button>
  </div>
))}
    <h3 style={{ marginTop: "20px", fontWeight: "bold" }}>Total Bill: Rs. {total}</h3>
        <button onClick={() => setShowCheckout(true)}>
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
