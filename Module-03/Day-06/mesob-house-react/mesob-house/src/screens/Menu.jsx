
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DishCard from "../components/DishCard";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=90";

export default function Menu({ initialDishes = [], loadError = false }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const dishes = Array.isArray(initialDishes) ? initialDishes : [];

  const categories = useMemo(() => {
    const values = [
      ...new Set(
        dishes
          .map((dish) => dish.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...values];
  }, [dishes]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return dishes.filter((dish) => {
      const matchesCategory =
        activeCategory === "All" ||
        dish.category === activeCategory;

      const searchableText = [
        dish.nameEn,
        dish.category,
        dish.description,
        dish.spiceLevel,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(query);
    });
  }, [dishes, activeCategory, search]);

  return (
    <>
      <header className="topbar menu-topbar">
        <div className="menu-topbar-content">
          <Link href="/" className="brand brand-link">
            <span className="brand-mark">M</span>
            <span>Mesob <em>House</em></span>
          </Link>

          <span className="topbar-note">
            A taste of Ethiopian tradition
          </span>
        </div>

        <div className="menu-hero">
          <div className="menu-hero-copy">
            <span className="hero-eyebrow">
              TRADITION ON EVERY PLATE
            </span>

            <h1>
              Gather around
              <br />
              <em>something delicious.</em>
            </h1>

            <p>
              Discover Ethiopian favourites, made for sharing
              and savouring together.
            </p>

            <a className="hero-cta" href="#our-menu">
              Explore the menu <span aria-hidden="true">↘</span>
            </a>
          </div>

          <div className="menu-hero-image">
            <img
              src={HERO_IMAGE}
              alt="A colourful, freshly prepared meal"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <div className="hero-image-caption">
              <span className="caption-dot" />
              Made to be shared
            </div>
          </div>
        </div>

        <label className="search-row menu-search">
          <span aria-hidden="true" className="search-symbol">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Find your next favourite dish..."
            aria-label="Search dishes"
          />
          {search && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </label>
      </header>

      <main className="screen menu-screen" id="our-menu">
        <div className="menu-intro">
          <div>
            <span className="section-kicker">FROM OUR KITCHEN</span>
            <h2>Explore the menu</h2>
            <p>Comforting classics and flavours worth coming back for.</p>
          </div>

          <span className="menu-count">
            {filtered.length} {filtered.length === 1 ? "dish" : "dishes"}
          </span>
        </div>

        {!loadError && dishes.length > 0 && (
          <div className="category-chips" aria-label="Filter by category">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? "active" : ""}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {loadError && (
          <div className="error-state">
            We couldn't load the menu. Please refresh the page and try again.
          </div>
        )}

        {!loadError && dishes.length === 0 && (
          <div className="empty-state">
            <span className="empty-state-icon">♨</span>
            <h3>Something delicious is on its way.</h3>
            <p>No dishes are available right now. Please check back soon.</p>
          </div>
        )}

        {!loadError && dishes.length > 0 && filtered.length === 0 && (
          <div className="empty-state">
            <h3>No dishes found</h3>
            <p>Try another search or choose a different category.</p>
            <button
              className="text-action"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}

        {!loadError && filtered.length > 0 && (
          <div className="dish-grid">
            {filtered.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        )}

        <footer className="menu-footer">
          <span className="footer-flourish">✳</span>
          <p>Good food. Good company. <em>Selam.</em></p>
        </footer>
      </main>
    </>
  );
}
