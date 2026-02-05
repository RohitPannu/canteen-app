import foodItems from "../data/foodItems";

function Home() {
  return (
    <div>
      <h2>Canteen Menu</h2>
      {foodItems.map(item => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Rs. {item.price}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default Home;
