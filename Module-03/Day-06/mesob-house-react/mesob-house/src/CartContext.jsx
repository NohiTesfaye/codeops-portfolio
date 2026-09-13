import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ dish, qty }]

  function addToCart(dish) {
    setItems((prev) => {
      const existing = prev.find((i) => i.dish.id === dish.id);
      if (existing) {
        return prev.map((i) =>
          i.dish.id === dish.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { dish, qty: 1 }];
    });
  }

  function changeQty(dishId, delta) {
    setItems((prev) =>
      prev
        .map((i) => (i.dish.id === dishId ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }

  function removeFromCart(dishId) {
    setItems((prev) => prev.filter((i) => i.dish.id !== dishId));
  }

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + i.qty * i.dish.priceETB, 0),
    [items]
  );

  const value = {
    items,
    addToCart,
    changeQty,
    removeFromCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside a CartProvider");
  return ctx;
}
