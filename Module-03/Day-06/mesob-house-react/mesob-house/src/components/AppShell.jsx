"use client";

import { usePathname } from "next/navigation";
import BottomNav from "./BottomNav";

export default function AppShell({ children }) {
  const pathname = usePathname();

  return (
    <div className="app-shell">
      {children}
      {pathname !== "/login" && <BottomNav />}
    </div>
  );
}
