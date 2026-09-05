import { useMemo, useReducer } from "react";
import { CartContext } from "./CartContext";
import { cartReducer, cartTotal, initialCartState } from "./cartReducer";


export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, initialCartState);

  const value = useMemo(
    () => ({
      items,
      dispatch,
      total: cartTotal(items),
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
