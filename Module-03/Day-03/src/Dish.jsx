import React, { useState } from 'react';

export default function Dish({ dish, onAddToCart }) {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    const newCount = count + 1;
    setCount(newCount);
    onAddToCart(dish, 1); // Pass dish and quantity change to parent
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', marginBottom: '10px' }}>
      <h3>{dish.name}</h3>
      <p>Price: {dish.price} ETB</p>
      {Boolean(dish.spicy) && <span style={{ color: 'red', fontWeight: 'bold' }}>🌶️ Spicy</span>}
      <div style={{ marginTop: '10px' }}>
        <button onClick={handleAdd} style={{ padding: '6px 12px', cursor: 'pointer' }}>
          Add to Order ({count})
        </button>
      </div>
    </div>
  );
}