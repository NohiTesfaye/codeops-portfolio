import { CartProvider } from "./cart/CartProvider";
import { Header } from "./components/Header";
import { Checkout } from "./components/Checkout";
import { Menu } from "./Menu";

export default function App() {
  return (
    <CartProvider>
      <div className="page">
        <Header />
        <main className="layout">
          <Menu />
          <Checkout />
        </main>
      </div>
    </CartProvider>
  );
}
