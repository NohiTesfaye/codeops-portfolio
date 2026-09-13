import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { CategoryIcon, CloseIcon } from "../Icons";

export default function Cart() {
  const { items, changeQty, removeFromCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  const deliveryFee = items.length > 0 ? 60 : 0;
  const grandTotal = totalPrice + deliveryFee;

  return (
    <>
      <div className="topbar">
        <div className="brand">Your Gursha Basket</div>
        <div className="tagline">
          {totalItems > 0 ? `${totalItems} item${totalItems > 1 ? "s" : ""}` : "Empty basket"}
        </div>
      </div>

      <div className="screen">
        {items.length === 0 && (
          <div className="empty-state">
            Your basket is empty.
            <div style={{ marginTop: 14 }}>
              <button className="primary-btn" onClick={() => navigate("/")}>
                Browse the menu
              </button>
            </div>
          </div>
        )}

        {items.map(({ dish, qty }) => (
          <div className="cart-row" key={dish.id}>
            <div className="dish-thumb" style={{ width: 48, height: 48 }}>
              <CategoryIcon category={dish.category} size={20} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="dish-name">{dish.nameEn}</div>
              <div className="dish-price">ETB {dish.priceETB}</div>
            </div>
            <div className="qty-control">
              <button onClick={() => changeQty(dish.id, -1)}>−</button>
              <span>{qty}</span>
              <button onClick={() => changeQty(dish.id, 1)}>+</button>
            </div>
            <button
              onClick={() => removeFromCart(dish.id)}
              style={{ border: "none", background: "none", color: "var(--ink-soft)" }}
              aria-label={`Remove ${dish.nameEn}`}
            >
              <CloseIcon size={14} />
            </button>
          </div>
        ))}

        {items.length > 0 && (
          <>
            <div className="summary-row" style={{ marginTop: 16 }}>
              <span>Items subtotal</span>
              <span>ETB {totalPrice}</span>
            </div>
            <div className="summary-row">
              <span>Delivery fee</span>
              <span>ETB {deliveryFee}</span>
            </div>
            <div className="summary-total">
              <span>Grand total</span>
              <span>ETB {grandTotal}</span>
            </div>

            <button
              className="primary-btn"
              style={{ marginTop: 18 }}
              onClick={() => alert("Order placed! (demo checkout)")}
            >
              Proceed to Checkout — ETB {grandTotal}
            </button>
          </>
        )}
      </div>
    </>
  );
}
