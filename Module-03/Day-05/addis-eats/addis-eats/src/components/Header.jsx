import { useCart } from "../cart/useCart";

export function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, line) => sum + line.qty, 0);

  return (
    <header className="site-header">
      <div className="brand">
        
        <div>
          <p className="brand-name">Addis Eats</p>
          <p className="brand-tag">home cooking, delivered</p>
        </div>
      </div>
      <div className="cart-badge" aria-label={`${itemCount} items in cart`}>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9.5" cy="20.5" r="1.4" />
          <circle cx="17.5" cy="20.5" r="1.4" />
        </svg>
        {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
      </div>
    </header>
  );
}
