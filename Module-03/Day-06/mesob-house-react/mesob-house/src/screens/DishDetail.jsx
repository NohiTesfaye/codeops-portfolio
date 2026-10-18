"use client";

import { useRouter } from "next/navigation";
import { CategoryIcon, BackArrowIcon } from "../Icons";
import { useCartStore } from "../store/useCartStore";

export default function DishDetail({ dish }) {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="screen">
      <button
        className="back-btn"
        onClick={() => router.push("/")}
        aria-label="Back to menu"
      >
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
        {dish.category} - {dish.servings}
      </div>

      <p className="detail-description">{dish.description}</p>

      <h3 className="section-title" style={{ marginTop: 0 }}>
        Ingredients
      </h3>

      <div className="ingredient-list">
        {dish.ingredients.map((ingredient) => (
          <span key={ingredient} className="ingredient-pill">
            {ingredient}
          </span>
        ))}
      </div>

      <button
        className="primary-btn"
        onClick={() => {
          addToCart(dish);
          router.push("/cart");
        }}
      >
        Add to Gursha Basket - ETB {dish.priceETB}
      </button>
    </div>
  );
}