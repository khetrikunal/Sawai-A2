// Shared validation schemas (used by both frontend & backend via server functions).
// Zod v4 compatible (already in the project).
import { z } from "zod";

/** Normalise an Indian phone number to a 10-digit string.
 *  Accepts:  +91XXXXXXXXXX, 91XXXXXXXXXX, or XXXXXXXXXX */
export function normalisePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length === 12) return digits.slice(2);
  return digits;
}

export const CustomerDetailsSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .transform(normalisePhone)
    .refine((v) => /^\d{10}$/.test(v), "Enter a valid 10-digit Indian mobile number"),
  email: z.email("Enter a valid email address"),
  // Delivery fields — required only when product needs delivery
  deliveryAddress: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z
    .string()
    .optional()
    .refine((v) => !v || /^\d{6}$/.test(v), "PIN code must be 6 digits"),
});

export const OrderRequestSchema = CustomerDetailsSchema.extend({
  productId: z.string().min(1, "Product is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1").max(20),
});

export type CustomerDetails = z.infer<typeof CustomerDetailsSchema>;
export type OrderRequest = z.infer<typeof OrderRequestSchema>;

export const PaymentVerifySchema = z.object({
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string(),
  orderNumber: z.string(),
});
