# Sawai Gir Amrut – Deployment Guide

This document covers setting up Razorpay payments, Supabase database, admin access, and email notifications for production.

---

## 1. Prerequisites

| Requirement | Notes |
|---|---|
| Supabase project | Free tier is fine for starting |
| Razorpay account | Test mode for development; switch to live for production |
| SMTP email provider | Gmail App Passwords, Resend, or Mailgun recommended |
| Existing deployment | Vercel, Cloudflare, or any Node/Bun-compatible host |

---

## 2. Supabase Setup

### 2a. Create the database schema

1. Go to **Supabase Dashboard → SQL Editor**
2. Copy the contents of [`app/migrations/0002_payments_and_orders.sql`](./app/migrations/0002_payments_and_orders.sql)
3. Run it — this creates `products`, `orders`, `order_items`, `admin_users` tables with correct RLS policies

### 2b. Get your API keys

From **Supabase Dashboard → Project Settings → API**:
- `SUPABASE_URL` — your project URL (e.g. `https://abcdef.supabase.co`)
- `SUPABASE_ANON_KEY` — safe for frontend
- `SUPABASE_SERVICE_ROLE_KEY` — **secret, server-only, never expose in browser**

---

## 3. Razorpay Setup

### 3a. Get API keys

From **Razorpay Dashboard → Settings → API Keys**:
- `RAZORPAY_KEY_ID` — `rzp_test_XXXX` (test) or `rzp_live_XXXX` (production)
- `RAZORPAY_KEY_SECRET` — **secret, server-only**

### 3b. Configure webhook

1. Go to **Razorpay Dashboard → Webhooks → Add New Webhook**
2. Set URL to: `https://sawaighee.com/api/webhooks/razorpay`
3. Select events: `payment.captured`, `payment.failed`
4. Copy the webhook secret → set as `RAZORPAY_WEBHOOK_SECRET`

> **Why do webhooks matter?** If a customer's browser closes before the payment handler runs, the webhook still marks the order as paid in your database.

---

## 4. Environment Variables

Copy `.env.example` to `.env` and fill in all values:

```bash
cp app/.env.example app/.env
```

Then edit `.env`:

```env
# Supabase
SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key   # SERVER ONLY

# Razorpay
RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXXXXX         # safe to expose
RAZORPAY_KEY_SECRET=your_secret_key               # SERVER ONLY
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret       # SERVER ONLY

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=orders@sawaighee.com
SMTP_PASS=your_gmail_app_password
SMTP_FROM_NAME=Sawai Gir Amrut
SMTP_FROM_EMAIL=orders@sawaighee.com
ADMIN_NOTIFICATION_EMAIL=admin@sawaighee.com

# Admin
ADMIN_SESSION_SECRET=<run: bun -e "console.log(require('crypto').randomBytes(64).toString('hex'))">
ADMIN_PASSWORD_SALT=<run: bun -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
```

> **Never commit `.env`** — it is already in `.gitignore`

---

## 5. Create the First Admin User

After setting up Supabase and environment variables:

```bash
cd app
bun scripts/create-admin.mjs --email admin@sawaighee.com --password YourSecurePassword
```

Then log in at `https://sawaighee.com/admin` with those credentials.

> Admin sessions are stored in `sessionStorage` (not cookies) — they expire when the browser tab is closed.

---

## 6. Local Development

```bash
cd app
cp .env.example .env
# fill in .env with test credentials

bun install
bun run dev
```

The dev server starts at `http://localhost:3000`.

- Use Razorpay **test keys** (`rzp_test_...`) for local development
- Razorpay test cards: Card `4111111111111111`, CVV `123`, any future expiry

---

## 7. Vercel Deployment

If deploying to Vercel:

1. Add all environment variables in **Vercel Dashboard → Settings → Environment Variables**
2. Set `NODE_ENV=production`
3. Deploy — `bun run build` runs automatically

> **Important**: On Vercel, environment variables are injected at runtime into server functions, not at build time. The `.env` file is only for local development.

---

## 8. Payment Flow Overview

```
Customer clicks "Shop Now" or "Order Now"
        │
        ▼
PurchaseForm dialog appears (client-side)
        │
        ▼
Customer fills name/phone/email/address → clicks Pay
        │
        ▼
createOrderServerFn() [SERVER]
  ├─ Validates product ID against server-side catalog (price never from frontend)
  ├─ Creates Supabase order row (status: pending)
  └─ Creates Razorpay order → returns order ID + key_id to frontend
        │
        ▼
Razorpay Checkout opens (browser-side, from Razorpay CDN)
        │
        ▼
Customer pays → Razorpay calls handler
        │
        ▼
verifyPaymentServerFn() [SERVER]
  ├─ HMAC-SHA256 signature verification
  ├─ Updates order to paid + confirmed
  └─ Sends confirmation email to customer + admin alert
        │
        ▼
Success screen shown to customer
        │
        ▼  (async, parallel path)
Razorpay Webhook → /api/webhooks/razorpay [SERVER]
  ├─ Verifies webhook signature
  ├─ Idempotent: checks if already paid before updating
  └─ Sends emails if not already sent
```

---

## 9. Admin Dashboard

Access at `https://sawaighee.com/admin`

**Features:**
- Login with email + password (no login button on the storefront)
- Dashboard stats: total orders, paid, pending, revenue
- Searchable orders table (by name, email, phone, order number)
- Filter by payment status and order status
- View complete order detail (customer info, delivery address, payment ref)
- Update fulfillment status (pending → confirmed → shipped → delivered)
- Export orders to CSV

**Security:**
- Session stored in `sessionStorage` (expires on tab close)
- Admin token is an HMAC-SHA256 signed JWT-like token (24-hour expiry)
- All admin server functions validate the token before execution
- Admin routes not linked from the storefront

---

## 10. Running Tests

```bash
cd app
bun test ./tests/
```

All 13 tests should pass. Tests cover:
- Offer popup accessibility and Razorpay integration contract
- Landing page contract (routes, structure)
- Security headers
- History/performance windowing

---

## 11. Checklist Before Going Live

- [ ] Switch Razorpay from `rzp_test_` to `rzp_live_` keys
- [ ] Set webhook URL in Razorpay dashboard: `https://sawaighee.com/api/webhooks/razorpay`
- [ ] Run the Supabase migration in production project
- [ ] Create admin user with a strong password
- [ ] Test a complete purchase flow with a Razorpay test payment
- [ ] Verify order confirmation email is received
- [ ] Verify admin notification email is received
- [ ] Log in to `/admin` and verify the order appears
