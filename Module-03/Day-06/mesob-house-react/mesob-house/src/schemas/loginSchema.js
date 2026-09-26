import { z } from "zod";

export const loginSchema = z
  .object({
    channel: z.enum(["phone", "email"]),
    phone: z.string().optional(),
    email: z.string().optional(),
    pin: z
      .string()
      .min(4, "PIN must be at least 4 characters")
      .max(20, "PIN is too long"),
    remember: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.channel === "phone") {
      if (!/^9\d{8}$/.test(data.phone ?? "")) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["phone"],
          message: "Enter a valid 9-digit number starting with 9",
        });
      }
    } else {
      const emailCheck = z.string().email().safeParse(data.email ?? "");
      if (!emailCheck.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["email"],
          message: "Enter a valid email address",
        });
      }
    }
  });
