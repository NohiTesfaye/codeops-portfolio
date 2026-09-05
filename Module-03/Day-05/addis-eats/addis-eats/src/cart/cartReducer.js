
export const initialCartState = [];
export function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const { dish } = action;
      const existing = state.find((line) => line.id === dish.id);

      if (existing) {
        return state.map((line) =>
          line.id === dish.id ? { ...line, qty: line.qty + 1 } : line
        );
      }

      return [...state, { id: dish.id, name: dish.name, price: dish.price, qty: 1 }];
    }

    case "remove": {
      const { id } = action;
      const existing = state.find((line) => line.id === id);
      if (!existing) return state;

      if (existing.qty <= 1) {
        return state.filter((line) => line.id !== id);
      }

      return state.map((line) =>
        line.id === id ? { ...line, qty: line.qty - 1 } : line
      );
    }

    case "clear":
      return initialCartState;

    default:
      return state;
  }
}

export function cartTotal(cartItems) {
  return cartItems.reduce((sum, line) => sum + line.price * line.qty, 0);
}
