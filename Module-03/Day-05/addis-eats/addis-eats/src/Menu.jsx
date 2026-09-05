import { useMemo, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { CategoryFilter } from "./components/CategoryFilter";
import { DishCard } from "./components/DishCard";

export function Menu() {
  const { data: dishes, loading, error } = useFetch("/menu.json");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const categories = useMemo(() => {
    if (!dishes) return [];
    return [...new Set(dishes.map((dish) => dish.category))];
  }, [dishes]);


  const visibleDishes = useMemo(() => {
    if (!dishes) return [];

    const filtered =
      activeCategory === "All"
        ? dishes
        : dishes.filter((dish) => dish.category === activeCategory);

    if (sortBy === "price-asc") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price-desc") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }
    return filtered;
  }, [dishes, activeCategory, sortBy]);

  if (loading) {
    return <p className="status-message">Loading the menu…</p>;
  }

  if (error) {
    return (
      <p className="status-message status-error">
        Couldn't load the menu ({error.message}). Try refreshing.
      </p>
    );
  }

  return (
    <section className="menu">
      <div className="menu-controls">
        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
        <label className="sort-select">
          Sort
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
      </div>

      {visibleDishes.length === 0 ? (
        <p className="status-message">No dishes in this category yet.</p>
      ) : (
        <div className="dish-grid">
          {visibleDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      )}
    </section>
  );
}
