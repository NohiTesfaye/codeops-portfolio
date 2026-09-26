import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  items: [], // [{ dish, qty }]

  addToCart: (dish) =>
    set((state) => {
      const existing = state.items.find((i) => i.dish.id === dish.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.dish.id === dish.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { dish, qty: 1 }] };
    }),

  changeQty: (dishId, delta) =>
    set((state) => ({
      items: state.items
        .map((i) => (i.dish.id === dishId ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    })),

  removeFromCart: (dishId) =>
    set((state) => ({
      items: state.items.filter((i) => i.dish.id !== dishId),
    })),

  clearCart: () => set({ items: [] }),

  // derived getters (not reactive selectors, safe for one-off reads)
  getTotalItems: () => get().items.reduce((sum, i) => sum + i.qty, 0),
  getTotalPrice: () =>
    get().items.reduce((sum, i) => sum + i.qty * i.dish.priceETB, 0),
}));

// Reactive selector hooks for components that need to re-render on totals change
export const useCartTotalItems = () =>
  useCartStore((state) => state.items.reduce((sum, i) => sum + i.qty, 0));

export const useCartTotalPrice = () =>
  useCartStore((state) =>
    state.items.reduce((sum, i) => sum + i.qty * i.dish.priceETB, 0)
  );
