import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMenu } from "../api";
import { CategoryIcon, BackArrowIcon } from "../Icons";
import { useCart } from "../CartContext";

export default function DishDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [dish, setDish] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    fetchMenu()
      .then((data) => {
        if (cancelled) return;
        const found = data.find((d) => d.slug === slug);
        setDish(found || null);
        setStatus(found ? "ready" : "not-found");
      })
      .catch(() => !cancelled && setStatus("error"));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (status === "loading") {
    return <div className="screen loading">Loading dish…</div>;
  }
  if (status === "error" || status === "not-found") {
    return (
      <div className="screen error-state">
        Couldn't find that dish.
        <div style={{ marginTop: 12 }}>
          <button className="primary-btn" onClick={() => navigate("/")}>
            Back to menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <BackArrowIcon size={18} />
      </button>

      <div className="detail-hero">
        <CategoryIcon category={dish.category} size={54} />
      </div>

      <div className="detail-title-row">
        <div>
          <h2 style={{ fontSize: 20 }}>{dish.nameEn}</h2>
          <div style={{ color: "var(--ink-soft)", fontSize: 13, marginTop: 2 }}>
            {dish.nameAm}
          </div>
        </div>
        <div className="detail-price">ETB {dish.priceETB}</div>
      </div>

      <div className="dish-tags" style={{ marginTop: 10 }}>
        {dish.isSpecial && <span className="tag special">Chef's Special</span>}
        {dish.isFasting && <span className="tag fasting">Fasting Friendly</span>}
        <span className="tag">{dish.spiceLevel}</span>
      </div>

      <div className="detail-meta">
        {dish.category} · {dish.servings}
      </div>

      <p className="detail-description">{dish.description}</p>

      <h3 className="section-title" style={{ marginTop: 0 }}>
        Ingredients
      </h3>
      <div className="ingredient-list">
        {dish.ingredients.map((ing) => (
          <span key={ing} className="ingredient-pill">
            {ing}
          </span>
        ))}
      </div>

      <button
        className="primary-btn"
        onClick={() => {
          addToCart(dish);
          navigate("/cart");
        }}
      >
        Add to Gursha Basket — ETB {dish.priceETB}
      </button>
    </div>
  );
}
