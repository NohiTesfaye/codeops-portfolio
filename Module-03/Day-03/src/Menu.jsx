import React, { useState } from 'react';
import { menuData, categories } from './data';
import CategoryBar from './CategoryBar';
import Dish from './Dish';
import OrderForm from './OrderForm';

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [totalAmount, setTotalAmount] = useState(0);

  // Filter menu based on selected category
  const filteredDishes = selectedCategory === "All" 
    ? menuData 
    : menuData.filter((dish) => dish.category === selectedCategory);

  const handleAddToCart = (dish, quantity) => {
    setTotalAmount((prevTotal) => prevTotal + dish.price * quantity);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Addis Eats Menu</h2>
      
      <CategoryBar 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelect={setSelectedCategory} 
      />

      <div>
        {filteredDishes.length === 0 ? (
          <p>No dishes found in this category.</p>
        ) : (
          filteredDishes.map((dish) => (
            <Dish key={dish.id} dish={dish} onAddToCart={handleAddToCart} />
          ))
        )}
      </div>

      <OrderForm totalAmount={totalAmount} />
    </div>
  );
}