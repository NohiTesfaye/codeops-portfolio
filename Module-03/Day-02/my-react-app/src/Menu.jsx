import Dish from './Dish';
import Card from './Card';
import { menuData } from './data';

export default function Menu({ selectedCategory }) {
  // Filter the menu by category
  const filteredMenu = menuData.filter(
    (dish) => dish.category === selectedCategory
  );

  return (
    <div>
      <h2>Menu - {selectedCategory}</h2>
      
      {/* Empty state handling */}
      {filteredMenu.length === 0 ? (
        <p>No dishes found in this category.</p>
      ) : (
        filteredMenu.map((dish) => (
          <Card key={dish.id}>
            <Dish 
              name={dish.name} 
              price={dish.price} 
              spicy={dish.spicy} 
            />
          </Card>
        ))
      )}
    </div>
  );
}