
"use client";

import Link from "next/link";
import { useCartStore } from "../store/useCartStore";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85";

const CATEGORY_IMAGES = {
  breakfast:
    "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=85",
  vegetarian:
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=85",
  drinks:
    "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85",
  dessert:
    "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85",
};

function getDishImage(dish) {
  const suppliedImage =
    dish.imageUrl ||
    dish.image_url ||
    dish.image ||
    dish.photo ||
    dish.photoUrl;

  if (suppliedImage) return suppliedImage;

  const category = String(dish.category || "").toLowerCase();

  for (const [keyword, image] of Object.entries(CATEGORY_IMAGES)) {
    if (category.includes(keyword)) return image;
  }

  return FALLBACK_IMAGE;
}

export default function DishCard({ dish }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const image = getDishImage(dish);

  return (
    <article className="dish-card">
      <Link
        href={`/dish/${dish.slug}`}
        className="dish-card-link"
        aria-label={`View ${dish.nameEn}`}
      >
        <div className="dish-photo-wrap">
          <img
            className="dish-photo"
            src={image}
            alt={dish.nameEn || "Ethiopian dish"}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = FALLBACK_IMAGE;
            }}
          />

          {dish.isSpecial && (
            <span className="photo-badge">Chef's pick</span>
          )}

          {dish.isFasting && (
            <span className="fasting-badge">Fasting</span>
          )}
        </div>

        <div className="dish-info">
          <div className="dish-card-category">
            {dish.category || "Ethiopian cuisine"}
          </div>

          <h3 className="dish-name">{dish.nameEn}</h3>

          {dish.description && (
            <p className="dish-description">{dish.description}</p>
          )}

          <div className="dish-tags">
            {dish.spiceLevel &&
              dish.spiceLevel !== "None" && (
                <span className="tag">{dish.spiceLevel} spice</span>
              )}
          </div>
        </div>
      </Link>

      <div className="dish-card-footer">
        <div className="dish-price">
          <span className="price-currency">ETB</span>{" "}
          {Number(dish.priceETB || 0).toLocaleString()}
        </div>

        <button
          className="add-btn"
          type="button"
          onClick={() => addToCart(dish)}
          aria-label={`Add ${dish.nameEn} to cart`}
        >
          <span aria-hidden="true">+</span>
          <span>Add</span>
        </button>
      </div>
    </article>
  );
}
