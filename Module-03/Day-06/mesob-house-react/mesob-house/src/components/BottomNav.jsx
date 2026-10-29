"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartTotalItems } from "../store/useCartStore";
import { StarIcon, UserIcon } from "../Icons";

function MenuIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
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

function ShoppingBagIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 8h14l1 12H4L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

const NAV_ITEMS = [
  { href: "/", label: "Menu", Icon: MenuIcon },
  { href: "/specials", label: "Specials", Icon: StarIcon },
  { href: "/cart", label: "Cart", Icon: ShoppingBagIcon, isCart: true },
  { href: "/account", label: "Account", Icon: UserIcon },
];

function isActive(pathname, href) {
  if (href === "/") return pathname === "/" || pathname.startsWith("/dish");
  if (href === "/cart") return pathname === "/cart" || pathname === "/checkout";
  return pathname === href;
}

export default function BottomNav() {
  const pathname = usePathname();
  const totalItems = useCartTotalItems();

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {NAV_ITEMS.map(({ href, label, Icon, isCart }) => {
        const active = isActive(pathname, href);

        return (
          <Link
            key={href}
            href={href}
            className={active ? "active" : ""}
            aria-current={active ? "page" : undefined}
            aria-label={
              isCart && totalItems > 0
                ? `Cart, ${totalItems} ${totalItems === 1 ? "item" : "items"}`
                : label
            }
          >
            <span className="nav-icon">
              <Icon size={20} />
              {isCart && totalItems > 0 && (
                <span className="cart-badge" key={totalItems}>
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </span>
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
