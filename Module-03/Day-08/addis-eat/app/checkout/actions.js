"use server";

import { orderSchema } from "../../schema";
import { createOrder, db } from "../../db";

export async function createOrderAction(previousState, formData) {
  const rawQuantity = formData.get("quantity");

  const result = orderSchema.safeParse({
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    dishId: String(formData.get("dishId") ?? ""),
    quantity:
      rawQuantity === null || rawQuantity === ""
        ? undefined
        : Number(rawQuantity),
    notes: String(formData.get("notes") ?? ""),
  });

  if (!result.success) {
    return {
      success: false,
      message: "Please correct the order details.",
      errors: result.error.issues.map((issue) => issue.message),
    };
  }

  const data = result.data;

  if (!data.dishId) {
    return {
      success: false,
      message: "Please select a dish.",
      errors: ["A dish is required."],
    };
  }

  if (!Number.isInteger(data.quantity) || data.quantity < 1) {
    return {
      success: false,
      message: "Quantity must be a positive whole number.",
      errors: ["Quantity must be a positive whole number."],
    };
  }

  const dish = await db.dish.findUnique({
    where: { id: data.dishId },
  });

  if (!dish || !dish.available) {
    return {
      success: false,
      message: "The selected dish is unavailable.",
      errors: ["Please select an available dish."],
    };
  }

  const order = await createOrder({
    name: data.name,
    phone: data.phone,
    dishId: dish.id,
    quantity: data.quantity,
    notes: data.notes,
    unitPrice: dish.price,
    total: dish.price * data.quantity,
  });

  return {
    success: true,
    message: `Order ${order.id} created. Total: ${order.total} ETB.`,
    errors: [],
  };
}
