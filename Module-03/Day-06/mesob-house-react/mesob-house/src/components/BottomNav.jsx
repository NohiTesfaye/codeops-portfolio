"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartTotalItems } from "../store/useCartStore";
import { StarIcon, ListIcon, BasketIcon, UserIcon } from "../Icons";

export default function BottomNav() {
  const pathname = usePathname();
  const totalItems = useCartTotalItems();

  return (
    <nav className="bottom-nav">
      <Link href="/specials" className={pathname === "/specials" ? "active" : ""}>
        <span className="nav-icon"><StarIcon size={19} /></span>
        Specials
      </Link>

      <Link href="/" className={pathname === "/" ? "active" : ""}>
        <span className="nav-icon"><ListIcon size={19} /></span>
        Menu
      </Link>

      <Link href="/cart" className={pathname === "/cart" ? "active" : ""}>
        <span className="nav-icon">
          <BasketIcon size={19} />
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </span>
        Cart
      </Link>

      <Link href="/account" className={pathname === "/account" ? "active" : ""}>
        <span className="nav-icon"><UserIcon size={19} /></span>
        Account
      </Link>
    </nav>
  );
}
