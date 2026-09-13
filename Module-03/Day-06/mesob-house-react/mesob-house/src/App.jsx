import { Navigate, Route, Routes } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Menu from "./pages/Menu";
import Specials from "./pages/Specials";
import DishDetail from "./pages/DishDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Account from "./pages/Account";
import { useAuth } from "./AuthContext";

export default function App() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="app-shell">
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/specials" element={<Specials />} />
        <Route path="/dish/:slug" element={<DishDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomNav />
    </div>
  );
}
