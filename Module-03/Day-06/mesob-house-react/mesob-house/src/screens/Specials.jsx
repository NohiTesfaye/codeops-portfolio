"use client";

import DishCard from "../components/DishCard";

export default function Specials({ initialDishes = [], loadError = false }) {
  const dishes = Array.isArray(initialDishes) ? initialDishes : [];

  return (
    <>
      <div className="topbar">
        <div className="brand">Today's Specials</div>
        <div className="tagline">Chef-picked, slow-cooked heritage</div>
      </div>

      <div className="screen">
        <div className="special-hero">
          <div className="eyebrow">SPECIAL SELECTION</div>
          <h2>Communal Warmth, Slow-Cooked Heritage</h2>
        </div>

        {loadError && (
          <div className="error-state">
            Couldn't load specials. Please try again.
          </div>
        )}

        {!loadError && dishes.length === 0 && (
          <div className="empty-state">
            No specials right now - check back soon.
          </div>
        )}

        {!loadError &&
          dishes.map((dish) => <DishCard key={dish.id} dish={dish} />)}
      </div>
    </>
  );
}