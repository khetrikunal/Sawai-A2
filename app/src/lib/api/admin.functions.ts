// Server functions for admin operations.
// All endpoints require valid admin session — unauthenticated requests are rejected.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSupabaseAdmin } from "../supabase.server";

// Shorthand with `any` cast to fix Supabase generic `never` inference on mutations.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = () => getSupabaseAdmin() as any;

// ─── Explicit result-row types ────────────────────────────────────────────────
interface AdminUserRow {
  email: string;
  password_hash: string;
}

export interface OrderListRow {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  email: string;
  final_amount: number;
  payment_status: string;
  order_status: string;
  razorpay_payment_id: string | null;
  created_at: string;
  order_items: { product_name_snapshot: string; quantity: number }[];
}

// ─── SESSION ───────────────────────────────────────────────────────────────────

const SESSION_SECRET = () => {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error("ADMIN_SESSION_SECRET not set");
  return s;
};

export async function createAdminToken(email: string): Promise<string> {
  const { createHmac } = await import("node:crypto");
  const payload = Buffer.from(JSON.stringify({ email, iat: Date.now() })).toString("base64url");
  const sig = createHmac("sha256", SESSION_SECRET()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export async function verifyAdminToken(token: string): Promise<{ email: string } | null> {
  try {
    const { createHmac, timingSafeEqual } = await import("node:crypto");
    const [payload, sig] = token.split(".");
    if (!payload || !sig) return null;
    const expected = createHmac("sha256", SESSION_SECRET()).update(payload).digest("hex");
    const expectedBuf = Buffer.from(expected, "hex");
    const sigBuf = Buffer.from(sig, "hex");
    if (expectedBuf.length !== sigBuf.length) return null;
    if (!timingSafeEqual(expectedBuf, sigBuf)) return null;
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      email: string;
      iat: number;
    };
    if (Date.now() - parsed.iat > 24 * 60 * 60 * 1000) return null;
    return { email: parsed.email };
  } catch {
    return null;
  }
}

// ─── ADMIN LOGIN ──────────────────────────────────────────────────────────────

export const adminLoginServerFn = createServerFn({ method: "POST" })
  .validator(z.object({ email: z.string().email(), password: z.string().min(1) }))
  .handler(async ({ data }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await db()
      .from("admin_users")
      .select("email, password_hash")
      .eq("email", data.email);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const admin = result.data?.[0] as AdminUserRow | undefined;
    if (!admin) throw new Error("Invalid credentials");

    const { createHash } = await import("node:crypto");
    const salt = process.env.ADMIN_PASSWORD_SALT ?? "";
    const hashed = createHash("sha256").update(data.password + salt).digest("hex");
    if (hashed !== admin.password_hash) throw new Error("Invalid credentials");

    const token = await createAdminToken(admin.email);
    return { token, email: admin.email };
  });

// ─── ADMIN GUARD ─────────────────────────────────────────────────────────────

async function requireAdmin(token: string | undefined): Promise<void> {
  const verified = token ? await verifyAdminToken(token) : null;
  if (!token || !verified) {
    throw new Error("Unauthorised: admin authentication required");
  }
}

// ─── GET ORDERS LIST ─────────────────────────────────────────────────────────

export const adminGetOrdersServerFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      token: z.string(),
      page: z.number().int().min(1).default(1),
      limit: z.number().int().min(1).max(100).default(50),
      search: z.string().optional(),
      paymentStatus: z.enum(["pending", "paid", "failed", "refunded", "all"]).default("all"),
      orderStatus: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled", "all"]).default("all"),
    })
  )
  .handler(async ({ data }) => {
    await requireAdmin(data.token);

    let query = db()
      .from("orders")
      .select(
        `id, order_number, customer_name, phone, email, final_amount,
         payment_status, order_status, razorpay_payment_id, created_at,
         order_items(product_name_snapshot, quantity)`,
        { count: "exact" }
      )
      .order("created_at", { ascending: false })
      .range((data.page - 1) * data.limit, data.page * data.limit - 1);

    if (data.search) {
      const s = `%${data.search}%`;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      query = query.or(
        `order_number.ilike.${s},customer_name.ilike.${s},email.ilike.${s},phone.ilike.${s}`
      );
    }
    if (data.paymentStatus !== "all") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      query = query.eq("payment_status", data.paymentStatus);
    }
    if (data.orderStatus !== "all") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      query = query.eq("order_status", data.orderStatus);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data: rows, count, error } = await query;
    if (error) throw new Error("Failed to fetch orders");

    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      orders: (rows ?? []) as OrderListRow[],
      total: (count as number) ?? 0,
      page: data.page,
      limit: data.limit,
    };
  });

// ─── GET SINGLE ORDER ─────────────────────────────────────────────────────────

export const adminGetOrderServerFn = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), orderId: z.string() }))
  .handler(async ({ data }) => {
    await requireAdmin(data.token);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await db()
      .from("orders")
      .select(`*, order_items(*)`)
      .eq("id", data.orderId);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const order = result.data?.[0] as (OrderListRow & {
      delivery_address: string | null;
      city: string | null;
      state: string | null;
      pincode: string | null;
      subtotal: number;
      discount_amount: number;
      razorpay_order_id: string | null;
      payment_verified_at: string | null;
      notes: string | null;
    }) | undefined;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (result.error || !order) throw new Error("Order not found");
    return order;
  });

// ─── UPDATE ORDER STATUS ──────────────────────────────────────────────────────

export const adminUpdateOrderStatusServerFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      token: z.string(),
      orderId: z.string(),
      orderStatus: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled"]),
    })
  )
  .handler(async ({ data }) => {
    await requireAdmin(data.token);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await db()
      .from("orders")
      .update({ order_status: data.orderStatus })
      .eq("id", data.orderId);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (result.error) throw new Error("Failed to update order status");
    return { success: true };
  });

// ─── DASHBOARD STATS ─────────────────────────────────────────────────────────

export const adminGetStatsServerFn = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    await requireAdmin(data.token);

    const [totalRes, paidRes, pendingRes, failedRes] = await Promise.all([
      db().from("orders").select("id", { count: "exact", head: true }),
      db().from("orders").select("id, final_amount").eq("payment_status", "paid"),
      db().from("orders").select("id", { count: "exact", head: true }).eq("payment_status", "pending"),
      db().from("orders").select("id", { count: "exact", head: true }).eq("payment_status", "failed"),
    ]) as [
      { count: number | null },
      { data: { id: string; final_amount: number }[] | null },
      { count: number | null },
      { count: number | null }
    ];

    const paidOrders = paidRes.data ?? [];
    const revenue = paidOrders.reduce((sum, o) => sum + (o.final_amount ?? 0), 0);

    return {
      totalOrders: totalRes.count ?? 0,
      paidOrders: paidOrders.length,
      pendingOrders: pendingRes.count ?? 0,
      failedOrders: failedRes.count ?? 0,
      totalRevenue: revenue,
    };
  });
