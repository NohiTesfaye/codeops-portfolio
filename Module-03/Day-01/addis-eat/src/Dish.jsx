
export default function Dish({ name, price }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem 0', borderRadius: '8px' }}>
      <h3>{name}</h3>
      <p>Price: {price}</p>
    </div>
  );
}