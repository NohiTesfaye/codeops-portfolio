"use client";

import { useMemo, useState } from "react";
import DishCard from "../components/DishCard";

export default function Menu({ initialDishes = [], loadError = false }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const dishes = Array.isArray(initialDishes) ? initialDishes : [];
  const status = loadError ? "error" : "ready";

  const categories = useMemo(() => {
    const values = new Set(dishes.map((dish) => dish.category));
    return ["All", ...values];
  }, [dishes]);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return dishes;
    return dishes.filter((dish) => dish.category === activeCategory);
  }, [dishes, activeCategory]);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const dish of filtered) {
      if (!map.has(dish.category)) map.set(dish.category, []);
      map.get(dish.category).push(dish);
    }
    return map;
  }, [filtered]);

  return (
    <>
      <div className="topbar">
        <div className="brand">Mesob House</div>
        <div className="tagline">Traditional Ethiopian dining</div>
        <div className="search-row">Search dishes, tej, injera...</div>
      </div>

      {status === "ready" && (
        <div className="chip-row">
          {categories.map((category) => (
            <button
              key={category}
              className={`chip ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="screen">
        {status === "error" && (
          <div className="error-state">
            Couldn't load the menu. Please try again.
          </div>
        )}

        {status === "ready" && dishes.length === 0 && (
          <div className="empty-state">No dishes are available right now.</div>
        )}

        {status === "ready" &&
          [...grouped.entries()].map(([category, items]) => (
            <section key={category}>
              <h3 className="section-title">{category}</h3>
              {items.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </section>
          ))}
      </div>
    </>
  );
}