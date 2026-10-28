
"use client";

import Link from "next/link";
import DishCard from "../components/DishCard";

const SPECIALS_IMAGE =
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=90";

export default function Specials({ initialDishes = [], loadError = false }) {
  const dishes = Array.isArray(initialDishes) ? initialDishes : [];

  return (
    <>
      <header className="topbar specials-topbar">
        <div className="menu-topbar-content">
          <Link href="/" className="brand brand-link">
            <span className="brand-mark">M</span>
            <span>Mesob <em>House</em></span>
          </Link>
          <span className="topbar-note">Something special, every day</span>
        </div>

        <div className="specials-hero">
          <div className="specials-hero-copy">
            <span className="hero-eyebrow">HANDPICKED WITH LOVE</span>
            <h1>
              Today's
              <br />
              <em>specials.</em>
            </h1>
            <p>
              Discover today's featured dishes, inspired by
              Ethiopian hospitality and the joy of sharing.
            </p>
            <a href="#special-dishes" className="hero-cta">
              See today's dishes <span aria-hidden="true">↘</span>
            </a>
          </div>

          <div className="specials-hero-image">
            <img
              src={SPECIALS_IMAGE}
              alt="A freshly prepared meal to share"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <span className="specials-stamp">Today's<br />selection</span>
          </div>
        </div>
      </header>

      <main className="screen specials-screen" id="special-dishes">
        <div className="menu-intro">
          <div>
            <span className="section-kicker">A LITTLE EXTRA SOMETHING</span>
            <h2>Made for today</h2>
            <p>Explore the dishes our kitchen is featuring right now.</p>
          </div>
          <span className="menu-count">
            {dishes.length} {dishes.length === 1 ? "dish" : "dishes"}
          </span>
        </div>

        {loadError && (
          <div className="error-state">
            We couldn't load today's specials. Please refresh the page and try again.
          </div>
        )}

        {!loadError && dishes.length === 0 && (
          <div className="empty-state">
            <span className="empty-state-icon">✳</span>
            <h3>New specials are coming soon.</h3>
            <p>There aren't any featured dishes right now. Please check back later.</p>
            <Link href="/" className="text-action">
              Explore the full menu
            </Link>
          </div>
        )}

        {!loadError && dishes.length > 0 && (
          <div className="dish-grid">
            {dishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        )}

        <div className="specials-note">
          <span className="specials-note-mark">✳</span>
          <div>
            <h3>Food brings us together.</h3>
            <p>
              From our table to yours, thank you for sharing a little
              Ethiopian tradition with us.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
