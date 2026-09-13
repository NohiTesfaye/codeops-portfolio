import { useEffect, useMemo, useState } from "react";
import { fetchMenu } from "../api";
import DishCard from "../components/DishCard";

export default function Menu() {
  const [dishes, setDishes] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    let cancelled = false;
    fetchMenu()
      .then((data) => {
        if (!cancelled) {
          setDishes(data);
          setStatus("ready");
        }
      })
      .catch(() => !cancelled && setStatus("error"));
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set(dishes.map((d) => d.category));
    return ["All", ...set];
  }, [dishes]);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return dishes;
    return dishes.filter((d) => d.category === activeCategory);
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
        <div className="search-row">Search dishes, tej, injera…</div>
      </div>

      <div className="chip-row">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`chip ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="screen">
        {status === "loading" && <div className="loading">Loading menu…</div>}
        {status === "error" && (
          <div className="error-state">Couldn't load the menu. Please try again.</div>
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
