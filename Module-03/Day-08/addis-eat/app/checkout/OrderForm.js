"use client";

import { useActionState } from "react";
import { createOrderAction } from "./actions";

const initialState = {
  success: false,
  message: "",
  errors: [],
};

export default function OrderForm() {
  const [state, formAction, pending] = useActionState(
    createOrderAction,
    initialState
  );

  return (
    <section>
      <h2>Place an Order</h2>

      <form action={formAction} data-order-form>
        <p>
          <label>
            Name
            <input name="name" required minLength={2} />
          </label>
        </p>

        <p>
          <label>
            Ethiopian phone number
            <input
              name="phone"
              type="tel"
              required
              pattern="(09|\+2519)\d{8}"
              title="Use 09 followed by 8 digits, or +2519 followed by 8 digits."
            />
          </label>
        </p>

        <p>
          <label>
            Dish
            <select name="dishId" required defaultValue="">
              <option value="">Choose a dish</option>
              <option value="dish_1">Doro Wat — 350 ETB</option>
              <option value="dish_2">Beyaynetu — 220 ETB</option>
              <option value="dish_3">Kitfo — 400 ETB</option>
              <option value="dish_4">Shiro Tegabeno — 180 ETB</option>
            </select>
          </label>
        </p>

        <p>
          <label>
            Quantity
            <input
              name="quantity"
              type="number"
              min="1"
              step="1"
              defaultValue="1"
              required
            />
          </label>
        </p>

        <p>
          <label>
            Notes
            <textarea name="notes" maxLength={200} />
          </label>
        </p>

        <button type="submit" disabled={pending}>
          {pending ? "Submitting..." : "Place Order"}
        </button>
      </form>

      {state.message && (
        <p aria-live="polite">{state.message}</p>
      )}

      {state.errors?.length > 0 && (
        <ul>
          {state.errors.map((error, index) => (
            <li key={`${error}-${index}`}>{error}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
