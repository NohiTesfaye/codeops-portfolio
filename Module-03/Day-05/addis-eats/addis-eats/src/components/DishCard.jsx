import { useCart } from "../cart/useCart";

export function DishCard({ dish }) {
  const { dispatch } = useCart();

  return (
    <article className="dish-card">
      <div
        className="dish-image"
        style={{ backgroundImage: `url(${dish.image})` }}
        role="img"
        aria-label={dish.name}
      />
      <div className="dish-body">
        <div className="dish-heading">
          <h3>{dish.name}</h3>
          <span className="dish-price">{dish.price} ETB</span>
        </div>
        <p className="dish-description">{dish.description}</p>
        <button
          type="button"
          className="add-button"
          onClick={() => dispatch({ type: "add", dish })}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
