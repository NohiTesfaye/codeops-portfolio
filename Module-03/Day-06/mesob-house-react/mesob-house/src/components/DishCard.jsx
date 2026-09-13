import { Link } from "react-router-dom";
import { CategoryIcon } from "../Icons";
import { useCart } from "../CartContext";

export default function DishCard({ dish }) {
  const { addToCart } = useCart();

  return (
    <div className="dish-card">
      <Link to={`/dish/${dish.slug}`} style={{ display: "flex", gap: 12, flex: 1, minWidth: 0 }}>
        <div className="dish-thumb">
          <CategoryIcon category={dish.category} size={26} />
        </div>
        <div className="dish-info">
          <div className="dish-name">{dish.nameEn}</div>
          <div className="dish-tags">
            {dish.isSpecial && <span className="tag special">Special</span>}
            {dish.isFasting && <span className="tag fasting">Fasting</span>}
            <span className="tag">{dish.spiceLevel}</span>
          </div>
          <div className="dish-price">ETB {dish.priceETB}</div>
        </div>
      </Link>
      <button
        className="add-btn"
        onClick={(e) => {
          e.preventDefault();
          addToCart(dish);
        }}
        aria-label={`Add ${dish.nameEn} to cart`}
      >
        +
      </button>
    </div>
  );
}
