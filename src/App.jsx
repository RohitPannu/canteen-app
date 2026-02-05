import { useState, useEffect } from "react";
import foodItems from "./data/foodItems";
import Navbar from "./components/NavBar";
import FoodCard from "./components/FoodCard";
import CartItem from "./components/CartItem";

function App() {
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
        <CartItem key={item.id} item={item} increaseQty={increaseQty} decreaseQty={decreaseQty} />
      ))}

      <h3 style={{ marginTop: "20px", fontWeight: "bold" }}>Total Bill: Rs. {total}</h3>
    </div>
  );
}

export default App;
