"use client";

import { usePathname } from "next/navigation";
import BottomNav from "./BottomNav";

const NO_NAV = ["/login", "/register"];

export default function AppShell({ children }) {
  const pathname = usePathname();

  return (
    <div className="app-shell">
      {children}
      {!NO_NAV.includes(pathname) && <BottomNav />}
    </div>
  );
}
