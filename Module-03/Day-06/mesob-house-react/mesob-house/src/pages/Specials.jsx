import { useEffect, useState } from "react";
import { fetchSpecials } from "../api";
import DishCard from "../components/DishCard";

export default function Specials() {
  const [dishes, setDishes] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    fetchSpecials()
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

        {status === "loading" && <div className="loading">Loading specials…</div>}
        {status === "error" && (
          <div className="error-state">Couldn't load specials. Please try again.</div>
        )}
        {status === "ready" && dishes.length === 0 && (
          <div className="empty-state">No specials right now — check back soon.</div>
        )}
        {status === "ready" &&
          dishes.map((dish) => <DishCard key={dish.id} dish={dish} />)}
      </div>
    </>
  );
}
