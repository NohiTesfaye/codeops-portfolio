import { useCart } from "../cart/useCart";

export function Checkout() {
  const { items, dispatch, total } = useCart();

  return (
    <aside className="checkout-panel" aria-label="Checkout">
      <h2>Your order</h2>

      {items.length === 0 ? (
        <p className="empty-cart">Nothing here yet. Add a dish to get started.</p>
      ) : (
        <ul className="cart-list">
          {items.map((line) => (
            <li key={line.id} className="cart-line">
              <div>
                <p className="cart-line-name">{line.name}</p>
                <p className="cart-line-meta">
                  {line.qty} × {line.price} ETB
                </p>
              </div>
              <div className="cart-line-actions">
                <span className="cart-line-total">{line.qty * line.price} ETB</span>
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => dispatch({ type: "remove", id: line.id })}
                  aria-label={`Remove one ${line.name}`}
                >
                  −
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-total-row">
        <span>Total</span>
        <strong>{total} ETB</strong>
      </div>

      <button
        type="button"
        className="clear-button"
        disabled={items.length === 0}
        onClick={() => dispatch({ type: "clear" })}
      >
        Clear cart
      </button>
    </aside>
  );
}
