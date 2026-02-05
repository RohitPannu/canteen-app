function Navbar({ cartCount }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#ffcc00",
      padding: "10px",
      borderRadius: "5px",
      marginBottom: "20px"
    }}>
      <h1>🍔 Canteen App</h1>
      <div>🛒 Cart: {cartCount}</div>
    </div>
  );
}

export default Navbar;
