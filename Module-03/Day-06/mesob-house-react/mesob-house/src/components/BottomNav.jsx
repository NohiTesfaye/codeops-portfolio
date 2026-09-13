import { NavLink } from "react-router-dom";
import { useCart } from "../CartContext";
import { StarIcon, ListIcon, BasketIcon, UserIcon } from "../Icons";

export default function BottomNav() {
  const { totalItems } = useCart();

  return (
    <nav className="bottom-nav">
      <NavLink to="/specials" className={({ isActive }) => (isActive ? "active" : "")}>
        <span className="nav-icon">
          <StarIcon size={19} />
        </span>
        Specials
      </NavLink>
      <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
        <span className="nav-icon">
          <ListIcon size={19} />
        </span>
        Menu
      </NavLink>
      <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}>
        <span className="nav-icon">
          <BasketIcon size={19} />
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </span>
        Cart
      </NavLink>
      <NavLink to="/account" className={({ isActive }) => (isActive ? "active" : "")}>
        <span className="nav-icon">
          <UserIcon size={19} />
        </span>
        Account
      </NavLink>
    </nav>
  );
}
