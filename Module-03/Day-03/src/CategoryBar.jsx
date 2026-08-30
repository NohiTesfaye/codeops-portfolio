import React from 'react';

export default function CategoryBar({ categories, selectedCategory, onSelect }) {
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          style={{
            padding: '8px 16px',
            backgroundColor: selectedCategory === cat ? '#007bff' : '#f0f0f0',
            color: selectedCategory === cat ? '#fff' : '#000',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}