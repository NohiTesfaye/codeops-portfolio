# Addis Eats

A small React app that brings together a week's worth of hooks concepts:
a fetched menu, a category filter, a cart shared through context, a
reducer owning the cart's transitions, and a hand-written `useFetch` hook.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. The menu data is served from
`public/menu.json`, so `useFetch("/menu.json")` hits a real network
request (no mocking needed) — open the Network tab to see it.

## How the pieces fit together

| Requirement | Where it lives |
|---|---|
| Custom `useFetch` hook (data / loading / error / cleanup) | `src/hooks/useFetch.js` |
| Pure cart reducer (add / remove / clear) | `src/cart/cartReducer.js` |
| Cart context object | `src/cart/CartContext.js` |
| `useReducer` + context Provider, memoized value | `src/cart/CartProvider.jsx` |
| `useContext` consumers | `src/components/Header.jsx` (badge), `src/components/Checkout.jsx` (panel) |
| Category filter + `useMemo` filtering/sorting | `src/Menu.jsx`, `src/components/CategoryFilter.jsx` |
| Dish card / add-to-cart | `src/components/DishCard.jsx` |

## Testing the reducer on its own

Before it was wired into React, `cartReducer` was exercised directly:

```js
import { cartReducer, initialCartState } from "./src/cart/cartReducer.js";

let state = initialCartState;
state = cartReducer(state, { type: "add", dish: { id: "d1", name: "Doro Wat", price: 320 } });
state = cartReducer(state, { type: "add", dish: { id: "d1", name: "Doro Wat", price: 320 } });
console.log(state); // [{ id: "d1", name: "Doro Wat", price: 320, qty: 2 }]

state = cartReducer(state, { type: "remove", id: "d1" });
console.log(state); // [{ id: "d1", name: "Doro Wat", price: 320, qty: 1 }]

state = cartReducer(state, { type: "clear" });
console.log(state); // []
```

## Verifying the memoisation in the Profiler

1. Open React DevTools → Profiler, start recording.
2. Add a dish to the cart.
3. Stop recording and inspect the commit: `Header` and `Checkout`
   re-render (they read the cart), but `Menu`'s dish grid does not,
   because `visibleDishes` is memoised on `[dishes, activeCategory, sortBy]`
   and none of those changed — only the cart did.

## Publishing to GitHub

```bash
git init
git add .
git commit -m "Week 1 mini-project: Addis Eats"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
