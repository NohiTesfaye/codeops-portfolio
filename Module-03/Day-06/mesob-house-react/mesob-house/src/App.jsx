import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import ErrorBoundary from "./ErrorBoundary";
import { useAuthStore } from "./store/useAuthStore";

const Menu = lazy(() => import("./pages/Menu"));
const Specials = lazy(() => import("./pages/Specials"));
const DishDetail = lazy(() => import("./pages/DishDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Login = lazy(() => import("./pages/Login"));
const Account = lazy(() => import("./pages/Account"));

function PageLoader() {
  return <div className="screen loading">Loading…</div>;
}

export default function App() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <div className="app-shell">
        <ErrorBoundary key={location.pathname}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="*" element={<Login />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <ErrorBoundary key={location.pathname}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/specials" element={<Specials />} />
            <Route path="/dish/:slug" element={<DishDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <BottomNav />
    </div>
  );
}
