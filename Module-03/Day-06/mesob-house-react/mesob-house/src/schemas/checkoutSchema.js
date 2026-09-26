import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(2, "Enter your full name")
    .max(60, "Name is too long"),
  phone: z
    .string()
    .regex(/^9\d{8}$/, "Enter a valid 9-digit number starting with 9"),
  subCity: z.string().min(2, "Enter a sub-city or neighbourhood"),
  street: z.string().min(2, "Enter a street name or house number"),
  landmark: z.string().max(80, "Keep the landmark note short").optional(),
  deliveryMethod: z.enum(["delivery", "pickup"], {
    required_error: "Choose delivery or pickup",
  }),
});
