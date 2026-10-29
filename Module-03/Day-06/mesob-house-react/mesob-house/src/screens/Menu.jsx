"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DishCard from "../components/DishCard";
import { CategoryIcon } from "../Icons";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=90";

export default function Menu({ initialDishes = [], loadError = false }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [fastingOnly, setFastingOnly] = useState(false);

  const dishes = Array.isArray(initialDishes) ? initialDishes : [];

  const categories = useMemo(() => {
    const values = [...new Set(dishes.map((d) => d.category).filter(Boolean))];
    return ["All", ...values];
  }, [dishes]);

  const hasFasting = useMemo(() => dishes.some((d) => d.isFasting), [dishes]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return dishes.filter((dish) => {
      if (activeCategory !== "All" && dish.category !== activeCategory) return false;
      if (fastingOnly && !dish.isFasting) return false;

      const haystack = [dish.nameEn, dish.category, dish.description, dish.spiceLevel]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [dishes, activeCategory, search, fastingOnly]);

  const hasActiveFilters =
    search.trim() !== "" || activeCategory !== "All" || fastingOnly;

  function clearFilters() {
    setSearch("");
    setActiveCategory("All");
    setFastingOnly(false);
  }

  return (
    <>
      <header className="topbar menu-topbar">
        <div className="menu-topbar-content">
          <Link href="/" className="brand brand-link">
            <span className="brand-mark">M</span>
            <span>
              Mesob <em>House</em>
            </span>
          </Link>
          <span className="topbar-note">A taste of Ethiopian tradition</span>
        </div>

        <div className="menu-hero">
          <div className="menu-hero-copy">
            <span className="hero-eyebrow">TRADITION ON EVERY PLATE</span>
            <h1>
              Gather around
              <br />
              <em>something delicious.</em>
            </h1>
            <p>
              Discover Ethiopian favourites, made for sharing and savouring
              together.
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
      </header>

      {/* Sticky: search + categories stay reachable while scrolling */}
      <div className="menu-sticky">
        <label className="search-row menu-search">
          <span aria-hidden="true" className="search-symbol">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dishes, e.g. doro wat, shiro…"
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
                {category !== "All" && (
                  <CategoryIcon category={category} size={14} />
                )}
                {category}
              </button>
            ))}

            {hasFasting && (
              <button
                type="button"
                className={`chip-fasting ${fastingOnly ? "active" : ""}`}
                aria-pressed={fastingOnly}
                onClick={() => setFastingOnly((v) => !v)}
              >
                🌿 Fasting (የጾም)
              </button>
            )}
          </div>
        )}
      </div>

      <main className="screen menu-screen" id="our-menu">
        <div className="menu-intro">
          <div>
            <span className="section-kicker">FROM OUR KITCHEN</span>
            <h2>Explore the menu</h2>
            <p>Comforting classics and flavours worth coming back for.</p>
          </div>
          <span className="menu-count" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "dish" : "dishes"}
          </span>
        </div>

        {loadError && (
          <div className="error-state" role="alert">
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
            {hasActiveFilters && (
              <button type="button" className="text-action" onClick={clearFilters}>
                Clear filters
              </button>
            )}
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
          <p>
            Good food. Good company. <em>Selam.</em>
          </p>
        </footer>
      </main>
    </>
  );
}
