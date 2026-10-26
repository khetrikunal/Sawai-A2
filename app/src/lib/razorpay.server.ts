// Server-only Razorpay helpers.
// The Razorpay Key Secret is NEVER exposed to the browser.
import Razorpay from "razorpay";

let _instance: Razorpay | null = null;

export function getRazorpay(): Razorpay {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new Error("RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set.");
  }
  if (!_instance) {
    _instance = new Razorpay({ key_id: keyId, key_secret: keySecret });
  }
  return _instance;
}

export interface RazorpayOrderResult {
  id: string;
  amount: number; // paise
  currency: string;
  receipt: string;
}

export async function createRazorpayOrder(
  amountPaise: number,
  receipt: string
): Promise<RazorpayOrderResult> {
  const rz = getRazorpay();
  const order = await rz.orders.create({
    amount: amountPaise,
    currency: "INR",
    receipt,
  });
  return {
    id: order.id,
    amount: Number(order.amount),
    currency: order.currency,
    receipt: order.receipt ?? receipt,
  };
}

/** Verify the Razorpay payment signature.
 *  Returns true only when the HMAC-SHA256 matches. */
export async function verifyPaymentSignature(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
): Promise<boolean> {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) throw new Error("RAZORPAY_KEY_SECRET not set");
  const { createHmac } = await import("node:crypto");
  const body = `${razorpayOrderId}|${razorpayPaymentId}`;
  const expected = createHmac("sha256", secret).update(body).digest("hex");
  return expected === razorpaySignature;
}

/** Verify a Razorpay webhook signature.
 *  Uses the separate RAZORPAY_WEBHOOK_SECRET. */
export async function verifyWebhookSignature(rawBody: string, signature: string): Promise<boolean> {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) throw new Error("RAZORPAY_WEBHOOK_SECRET not set");
  const { createHmac } = await import("node:crypto");
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  return expected === signature;
}
