// Server functions for order management.
// createServerFn runs only on the server — secrets are never exposed to the browser.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSupabaseAdmin } from "../supabase.server";
import { getProductById, calcAmountPaise, PRODUCT_CATALOG } from "../catalog.server";
import { createRazorpayOrder, verifyPaymentSignature } from "../razorpay.server";
import { OrderRequestSchema, PaymentVerifySchema } from "../validation";
import { sendOrderConfirmationEmail, sendAdminOrderNotification } from "../email.server";

// ─── Result-row types ─────────────────────────────────────────────────────────
interface OrderRow {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  email: string;
  final_amount: number;
  payment_status: string;
  order_status: string;
}
interface OrderItemRow {
  product_name_snapshot: string;
  quantity: number;
}

/** Generate a unique order number like SAW-20261026-A3F2 */
function generateOrderNumber(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SAW-${date}-${rand}`;
}

// Shorthand for the admin client cast to `any` so write operations compile.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = () => getSupabaseAdmin() as any;

// ─── GET PRODUCTS ─────────────────────────────────────────────────────────────

export const getProductsServerFn = createServerFn({ method: "GET" }).handler(async () => {
  return PRODUCT_CATALOG.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    originalPrice: p.originalPrice ?? null,
    productType: p.productType,
    requiresDelivery: p.requiresDelivery,
    maxQuantity: p.maxQuantity,
  }));
});

// ─── CREATE ORDER + RAZORPAY ORDER ────────────────────────────────────────────

export const createOrderServerFn = createServerFn({ method: "POST" })
  .validator(OrderRequestSchema)
  .handler(async ({ data }) => {
    const product = getProductById(data.productId);
    if (!product) throw new Error("Product not found");

    if (product.requiresDelivery) {
      if (!data.deliveryAddress?.trim()) throw new Error("Delivery address is required");
      if (!data.city?.trim()) throw new Error("City is required");
      if (!data.state?.trim()) throw new Error("State is required");
      if (!data.pincode || !/^\d{6}$/.test(data.pincode)) throw new Error("Valid PIN code is required");
    }
    if (data.quantity > product.maxQuantity) {
      throw new Error(`Maximum quantity for this product is ${product.maxQuantity}`);
    }

    const amountPaise = calcAmountPaise(data.productId, data.quantity);
    const finalAmountRupees = amountPaise / 100;
    const orderNumber = generateOrderNumber();

    // Create Razorpay order first
    const rzOrder = await createRazorpayOrder(amountPaise, orderNumber);

    // Persist order in Supabase
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const insertResult = await db().from("orders").insert({
      order_number: orderNumber,
      customer_name: data.fullName,
      phone: data.phone,
      email: data.email,
      delivery_address: data.deliveryAddress ?? null,
      city: data.city ?? null,
      state: data.state ?? null,
      pincode: data.pincode ?? null,
      subtotal: finalAmountRupees,
      discount_amount: 0,
      final_amount: finalAmountRupees,
      order_status: "pending",
      payment_status: "pending",
      razorpay_order_id: rzOrder.id,
      razorpay_payment_id: null,
      payment_verified_at: null,
      notes: null,
    }).select("id, order_number");

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const order = insertResult.data?.[0] as { id: string; order_number: string } | undefined;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (insertResult.error || !order) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.error("[order] Supabase insert error:", insertResult.error);
      throw new Error("Failed to create order. Please try again.");
    }

    // Persist order items
    await db().from("order_items").insert({
      order_id: order.id,
      product_id: product.id,
      product_name_snapshot: product.name,
      quantity: data.quantity,
      unit_price: product.price,
      total_price: finalAmountRupees,
    });

    void sendAdminOrderNotification({
      orderNumber,
      customerName: data.fullName,
      phone: data.phone,
      email: data.email,
      productName: product.name,
      quantity: data.quantity,
      amountPaid: finalAmountRupees,
      razorpayPaymentId: null,
      orderDate: new Date().toLocaleDateString("en-IN", { dateStyle: "long" }),
      paymentStatus: "pending",
    });

    return {
      orderNumber,
      razorpayOrderId: rzOrder.id,
      amountPaise: rzOrder.amount,
      currency: rzOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID ?? "",
      productName: product.name,
      customerName: data.fullName,
      customerEmail: data.email,
      customerPhone: data.phone,
    };
  });

// ─── VERIFY PAYMENT ────────────────────────────────────────────────────────────

export const verifyPaymentServerFn = createServerFn({ method: "POST" })
  .validator(PaymentVerifySchema)
  .handler(async ({ data }) => {
    const isValid = await verifyPaymentSignature(
      data.razorpayOrderId,
      data.razorpayPaymentId,
      data.razorpaySignature
    );
    if (!isValid) throw new Error("Payment signature verification failed. Please contact support.");

    // Fetch order
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const fetchResult = await db()
      .from("orders")
      .select("id, order_number, final_amount, payment_status, customer_name, phone, email")
      .eq("razorpay_order_id", data.razorpayOrderId);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const order = fetchResult.data?.[0] as OrderRow | undefined;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (fetchResult.error || !order) throw new Error("Order not found for this payment.");

    // Idempotency guard
    if (order.payment_status === "paid") {
      return { success: true, orderNumber: order.order_number };
    }

    // Mark paid
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const updateResult = await db()
      .from("orders")
      .update({
        payment_status: "paid",
        order_status: "confirmed",
        razorpay_payment_id: data.razorpayPaymentId,
        payment_verified_at: new Date().toISOString(),
      })
      .eq("id", order.id);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (updateResult.error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.error("[payment] Failed to update order status:", updateResult.error);
      throw new Error("Payment recorded but failed to update order. Please contact support.");
    }

    // Fetch items for email
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const itemsResult = await db()
      .from("order_items")
      .select("product_name_snapshot, quantity")
      .eq("order_id", order.id);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const items = (itemsResult.data ?? []) as OrderItemRow[];
    const productName = items[0]?.product_name_snapshot ?? "Sawai Gir Amrut Product";
    const quantity = items[0]?.quantity ?? 1;

    const emailData = {
      orderNumber: order.order_number,
      customerName: order.customer_name,
      phone: order.phone,
      email: order.email,
      productName,
      quantity,
      amountPaid: order.final_amount,
      razorpayPaymentId: data.razorpayPaymentId,
      orderDate: new Date().toLocaleDateString("en-IN", { dateStyle: "long" }),
    };

    await Promise.allSettled([
      sendOrderConfirmationEmail(emailData),
      sendAdminOrderNotification({ ...emailData, paymentStatus: "paid" }),
    ]);

    return { success: true, orderNumber: order.order_number };
  });

// ─── GET ORDER STATUS ─────────────────────────────────────────────────────────

export const getOrderStatusServerFn = createServerFn({ method: "GET" })
  .validator(z.object({ orderNumber: z.string() }))
  .handler(async ({ data }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await db()
      .from("orders")
      .select("order_number, payment_status, order_status, final_amount, created_at")
      .eq("order_number", data.orderNumber);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const order = result.data?.[0] as {
      order_number: string;
      payment_status: string;
      order_status: string;
      final_amount: number;
      created_at: string;
    } | undefined;

    if (!order) throw new Error("Order not found");
    return order;
  });
