function CartItem({ item, increaseQty, decreaseQty }) {
  return (
    <div
      style={{
        marginBottom: "10px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <div>
        <p>{item.name} — Rs. {item.price}</p>
        <p>Total: Rs. {item.price * item.qty}</p>
      </div>
      <div>
        <button onClick={() => decreaseQty(item.id)}>➖</button>
        <span style={{ margin: "0 10px" }}>{item.qty}</span>
        <button onClick={() => increaseQty(item.id)}>➕</button>
      </div>
    </div>
  );
}

export default CartItem;
