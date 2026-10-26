// Server-only email notifications via Nodemailer.
// Supports any SMTP provider (Gmail, Resend SMTP, Mailgun SMTP, etc.).
import nodemailer from "nodemailer";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const fromName = process.env.SMTP_FROM_NAME ?? "Sawai Gir Amrut";
  const fromEmail = process.env.SMTP_FROM_EMAIL ?? user;

  if (!host || !user || !pass) {
    // Email is not configured — log and skip gracefully.
    return null;
  }
  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  return { transport, fromName, fromEmail };
}

export interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  phone: string;
  email: string;
  productName: string;
  quantity: number;
  amountPaid: number; // INR rupees
  razorpayPaymentId: string | null;
  orderDate: string;
}

export async function sendOrderConfirmationEmail(data: OrderEmailData): Promise<void> {
  const ctx = getTransporter();
  if (!ctx) {
    console.warn("[email] SMTP not configured — skipping customer confirmation email");
    return;
  }

  const { transport, fromName, fromEmail } = ctx;
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#261F18">
      <div style="background:#164A37;padding:28px 32px;text-align:center">
        <h1 style="color:#F4EFE5;font-size:26px;margin:0;letter-spacing:.06em">SAWAI GIR AMRUT</h1>
        <p style="color:#C5A264;font-size:11px;letter-spacing:.15em;margin:8px 0 0">ORDER CONFIRMED</p>
      </div>
      <div style="padding:32px">
        <p>Dear ${data.customerName},</p>
        <p>Thank you for your order! Your payment has been received and your order is confirmed.</p>

        <table style="width:100%;border-collapse:collapse;margin:24px 0">
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#6A655A;width:44%">Order Number</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600">${data.orderNumber}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#6A655A">Product</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee">${data.productName}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#6A655A">Quantity</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee">${data.quantity}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#6A655A">Amount Paid</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600">₹${data.amountPaid.toLocaleString("en-IN")}</td></tr>
          ${data.razorpayPaymentId ? `<tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#6A655A">Payment Reference</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:12px">${data.razorpayPaymentId}</td></tr>` : ""}
          <tr><td style="padding:10px 0;color:#6A655A">Order Date</td>
              <td style="padding:10px 0">${data.orderDate}</td></tr>
        </table>

        <p style="color:#164A37;font-weight:600">What happens next?</p>
        <p>Our team will prepare your order and dispatch it within 2–3 business days. You will receive a WhatsApp message with your tracking details.</p>

        <p style="margin-top:32px">For any queries, please contact us:</p>
        <p>📞 <a href="tel:+919156996309" style="color:#164A37">+91 91569 96309</a></p>
        <p>📍 Sawai Gir Farm, Malwadi, Post Bibi, Tal. Phaltan, Satara, Maharashtra 415537</p>
      </div>
      <div style="background:#F4EFE5;padding:16px 32px;text-align:center;font-size:11px;color:#6A655A">
        © 2026 Sawai Gir Amrut · Made with tradition. Presented with care.
      </div>
    </div>`;

  try {
    await transport.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: data.email,
      subject: `Order Confirmed – ${data.orderNumber} | Sawai Gir Amrut`,
      html,
    });
    console.log(`[email] Customer confirmation sent to ${data.email} for order ${data.orderNumber}`);
  } catch (err) {
    // Email failure must NOT roll back a successful payment.
    console.error(`[email] Failed to send customer confirmation for ${data.orderNumber}:`, err);
  }
}

export async function sendAdminOrderNotification(
  data: OrderEmailData & { paymentStatus: string }
): Promise<void> {
  const ctx = getTransporter();
  if (!ctx) {
    console.warn("[email] SMTP not configured — skipping admin notification");
    return;
  }
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (!adminEmail) {
    console.warn("[email] ADMIN_NOTIFICATION_EMAIL not set — skipping admin notification");
    return;
  }

  const { transport, fromName, fromEmail } = ctx;
  const statusBadge =
    data.paymentStatus === "paid"
      ? `<span style="background:#164A37;color:#fff;padding:4px 10px;border-radius:3px;font-size:12px">PAID ✓</span>`
      : `<span style="background:#c0392b;color:#fff;padding:4px 10px;border-radius:3px;font-size:12px">PENDING</span>`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#261F18">
      <div style="background:#261F18;padding:20px 32px">
        <h1 style="color:#C5A264;font-size:20px;margin:0">New Order – Sawai Gir Amrut</h1>
        <p style="color:#E5DAC3;font-size:12px;margin:6px 0 0">${data.orderNumber} &nbsp;${statusBadge}</p>
      </div>
      <div style="padding:28px">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6A655A;width:44%">Customer</td><td style="padding:8px 0;border-bottom:1px solid #eee">${data.customerName}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6A655A">Phone</td><td style="padding:8px 0;border-bottom:1px solid #eee"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6A655A">Email</td><td style="padding:8px 0;border-bottom:1px solid #eee">${data.email}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6A655A">Product</td><td style="padding:8px 0;border-bottom:1px solid #eee">${data.productName} × ${data.quantity}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6A655A">Amount</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">₹${data.amountPaid.toLocaleString("en-IN")}</td></tr>
          <tr><td style="padding:8px 0;color:#6A655A">Payment Ref</td><td style="padding:8px 0;font-size:12px">${data.razorpayPaymentId ?? "—"}</td></tr>
        </table>
      </div>
    </div>`;

  try {
    await transport.sendMail({
      from: `"${fromName} Orders" <${fromEmail}>`,
      to: adminEmail,
      subject: `[${data.paymentStatus.toUpperCase()}] New Order ${data.orderNumber} – ₹${data.amountPaid}`,
      html,
    });
    console.log(`[email] Admin notification sent for order ${data.orderNumber}`);
  } catch (err) {
    console.error(`[email] Failed to send admin notification for ${data.orderNumber}:`, err);
  }
}
