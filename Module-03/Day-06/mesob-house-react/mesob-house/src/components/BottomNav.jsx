
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartTotalItems } from "../store/useCartStore";
import {
  StarIcon,
  UserIcon,
} from "../Icons";

function MenuIcon({ size = 19 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="6.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ShoppingBagIcon({ size = 19 }) {  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 8h14l1 12H4L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

export default function BottomNav() {
  const pathname = usePathname();
  const totalItems = useCartTotalItems();

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <Link
        href="/specials"
        className={pathname === "/specials" ? "active" : ""}
        aria-current={pathname === "/specials" ? "page" : undefined}
      >
        <span className="nav-icon">
          <StarIcon size={19} />
        </span>
        <span>Specials</span>
      </Link>

      <Link
        href="/"
        className={pathname === "/" ? "active" : ""}
        aria-current={pathname === "/" ? "page" : undefined}
      >
        <span className="nav-icon">
          <MenuIcon size={21} />
        </span>
        <span>Menu</span>
      </Link>

      <Link
        href="/cart"
        className={pathname === "/cart" ? "active" : ""}
        aria-current={pathname === "/cart" ? "page" : undefined}
      >
        <span className="nav-icon">
          <ShoppingBagIcon size={20} />
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </span>
        <span>Cart</span>
      </Link>

      <Link
        href="/account"
        className={pathname === "/account" ? "active" : ""}
        aria-current={pathname === "/account" ? "page" : undefined}
      >
        <span className="nav-icon">
          <UserIcon size={19} />
        </span>
        <span>Account</span>
      </Link>
    </nav>
  );
}
