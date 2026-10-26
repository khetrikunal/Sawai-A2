-- Migration: 0002_payments_and_orders.sql
-- Apply this in the Supabase SQL Editor or via supabase db push.
-- All changes are additive — safe to re-run (IF NOT EXISTS everywhere).

-- ── PRODUCTS ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.products (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  description   TEXT,
  price         INTEGER NOT NULL,      -- rupees
  original_price INTEGER,              -- MRP rupees, nullable
  product_type  TEXT NOT NULL DEFAULT 'physical' CHECK (product_type IN ('physical','combo')),
  active        BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed with the authoritative catalog (matches catalog.server.ts)
INSERT INTO public.products (id, name, price, original_price, product_type) VALUES
  ('ghee-200ml',          'Sawai Gir Amrut A2 Gir Cow Bilona Ghee – 200 ml',  640,  800,  'physical'),
  ('ghee-500ml',          'Sawai Gir Amrut A2 Gir Cow Bilona Ghee – 500 ml',  1600, 2000, 'physical'),
  ('ghee-1l',             'Sawai Gir Amrut A2 Gir Cow Bilona Ghee – 1 Litre', 3200, 4000, 'physical'),
  ('offer-pavitra-bhet',  'Pavitra Bhet Combo',                                349,  NULL, 'combo'),
  ('offer-satvik-sangam', 'Satvik Sangam Combo',                               349,  NULL, 'combo')
ON CONFLICT (id) DO NOTHING;

-- ── ORDERS ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.orders (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number           TEXT NOT NULL UNIQUE,
  customer_name          TEXT NOT NULL,
  phone                  TEXT NOT NULL,
  email                  TEXT NOT NULL,
  delivery_address       TEXT,
  city                   TEXT,
  state                  TEXT,
  pincode                TEXT,
  subtotal               NUMERIC(10,2) NOT NULL,
  discount_amount        NUMERIC(10,2) NOT NULL DEFAULT 0,
  final_amount           NUMERIC(10,2) NOT NULL,
  order_status           TEXT NOT NULL DEFAULT 'pending'
                           CHECK (order_status IN ('pending','confirmed','shipped','delivered','cancelled')),
  payment_status         TEXT NOT NULL DEFAULT 'pending'
                           CHECK (payment_status IN ('pending','paid','failed','refunded')),
  razorpay_order_id      TEXT,
  razorpay_payment_id    TEXT,
  payment_verified_at    TIMESTAMPTZ,
  notes                  TEXT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_razorpay_order_id ON public.orders (razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders (order_number);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders (payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_email ON public.orders (email);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON public.orders (phone);

-- ── ORDER ITEMS ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.order_items (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id                UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id              TEXT NOT NULL REFERENCES public.products(id),
  product_name_snapshot   TEXT NOT NULL,
  quantity                INTEGER NOT NULL CHECK (quantity > 0),
  unit_price              NUMERIC(10,2) NOT NULL,
  total_price             NUMERIC(10,2) NOT NULL,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items (order_id);

-- ── ADMIN USERS ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.admin_users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,   -- sha256(password + ADMIN_PASSWORD_SALT) — see README
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── AUTO-UPDATE updated_at ────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS orders_updated_at ON public.orders;
CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ── ROW LEVEL SECURITY ────────────────────────────────────────────────────────

-- Enable RLS on all tables
ALTER TABLE public.products      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users   ENABLE ROW LEVEL SECURITY;

-- Products: anyone can read active products (public catalog)
DROP POLICY IF EXISTS "products_public_read" ON public.products;
CREATE POLICY "products_public_read"
  ON public.products FOR SELECT
  USING (active = TRUE);

-- Orders: NO customer reads via anon key — server uses service-role key only.
-- The anon key (VITE_SUPABASE_ANON_KEY) can read a single order by order_number
-- only for its own status-check use case. Customers must NOT list all orders.
DROP POLICY IF EXISTS "orders_anon_status_read" ON public.orders;
CREATE POLICY "orders_anon_status_read"
  ON public.orders FOR SELECT
  TO anon
  USING (FALSE);   -- Deny all anon reads; server-side service key bypasses RLS.

-- Order items: deny anon reads
DROP POLICY IF EXISTS "order_items_deny_anon" ON public.order_items;
CREATE POLICY "order_items_deny_anon"
  ON public.order_items FOR SELECT
  TO anon
  USING (FALSE);

-- Admin users: completely private — no anon access
DROP POLICY IF EXISTS "admin_users_deny_all" ON public.admin_users;
CREATE POLICY "admin_users_deny_all"
  ON public.admin_users FOR ALL
  TO anon
  USING (FALSE);

-- Service role key bypasses RLS by default in Supabase — no additional policy needed.
-- The supabase.server.ts file uses the service-role key for all server-side operations.
