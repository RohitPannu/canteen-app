function FoodCard({ item, addToCart }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        margin: "10px",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h3>{item.name}</h3>
        <p>Rs. {item.price}</p>
      </div>
      <button
        onClick={() => addToCart(item)}
        style={{
          padding: "8px 12px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default FoodCard;
