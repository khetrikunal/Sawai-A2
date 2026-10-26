import { createFileRoute } from "@tanstack/react-router";
import { verifyWebhookSignature } from "@/lib/razorpay.server";
import { getSupabaseAdmin } from "@/lib/supabase.server";
import { sendOrderConfirmationEmail, sendAdminOrderNotification } from "@/lib/email.server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = () => getSupabaseAdmin() as any;

interface WebhookOrderRow {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  email: string;
  final_amount: number;
  payment_status: string;
}
interface WebhookItemRow {
  product_name_snapshot: string;
  quantity: number;
}

export const Route = createFileRoute("/api/webhooks/razorpay")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rawBody = await request.text();
        const signature = request.headers.get("x-razorpay-signature") ?? "";

        if (!(await verifyWebhookSignature(rawBody, signature))) {
          console.warn("[webhook] Invalid Razorpay webhook signature — rejected");
          return new Response(JSON.stringify({ error: "Invalid signature" }), {
            status: 401,
            headers: { "content-type": "application/json" },
          });
        }

        let payload: Record<string, unknown>;
        try {
          payload = JSON.parse(rawBody) as Record<string, unknown>;
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }

        const event = payload.event as string | undefined;
        const paymentEntity = (
          (payload.payload as Record<string, unknown>)?.payment as Record<string, unknown>
        )?.entity as Record<string, unknown> | undefined;

        if (!event || !paymentEntity) {
          return new Response(JSON.stringify({ received: true }), {
            headers: { "content-type": "application/json" },
          });
        }

        const razorpayOrderId = paymentEntity.order_id as string | undefined;
        const razorpayPaymentId = paymentEntity.id as string | undefined;

        if (!razorpayOrderId || !razorpayPaymentId) {
          return new Response(JSON.stringify({ received: true }), {
            headers: { "content-type": "application/json" },
          });
        }

        if (event === "payment.captured") {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const fetchResult = await db()
            .from("orders")
            .select("id, order_number, customer_name, phone, email, final_amount, payment_status")
            .eq("razorpay_order_id", razorpayOrderId);

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const order = fetchResult.data?.[0] as WebhookOrderRow | undefined;

          if (!order) {
            console.error(`[webhook] No order found for Razorpay order: ${razorpayOrderId}`);
            return new Response(JSON.stringify({ received: true }), {
              headers: { "content-type": "application/json" },
            });
          }

          if (order.payment_status === "paid") {
            console.log(`[webhook] Order ${order.order_number} already paid — skipping`);
            return new Response(JSON.stringify({ received: true }), {
              headers: { "content-type": "application/json" },
            });
          }

          // Mark as paid
          await db()
            .from("orders")
            .update({
              payment_status: "paid",
              order_status: "confirmed",
              razorpay_payment_id: razorpayPaymentId,
              payment_verified_at: new Date().toISOString(),
            })
            .eq("id", order.id);

          // Fetch items for email
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const itemsResult = await db()
            .from("order_items")
            .select("product_name_snapshot, quantity")
            .eq("order_id", order.id);

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const items = (itemsResult.data ?? []) as WebhookItemRow[];
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
            razorpayPaymentId,
            orderDate: new Date().toLocaleDateString("en-IN", { dateStyle: "long" }),
          };

          await Promise.allSettled([
            sendOrderConfirmationEmail(emailData),
            sendAdminOrderNotification({ ...emailData, paymentStatus: "paid" }),
          ]);

          console.log(`[webhook] Payment captured for order ${order.order_number}`);
        } else if (event === "payment.failed") {
          await db()
            .from("orders")
            .update({ payment_status: "failed" })
            .eq("razorpay_order_id", razorpayOrderId)
            .neq("payment_status", "paid");
          console.log(`[webhook] Payment failed for Razorpay order ${razorpayOrderId}`);
        }

        return new Response(JSON.stringify({ received: true }), {
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});
