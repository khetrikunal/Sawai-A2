import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowUpRight, X, ArrowClockwise, DownloadSimple } from "@phosphor-icons/react";
import {
  adminLoginServerFn,
  adminGetStatsServerFn,
  adminGetOrdersServerFn,
  adminGetOrderServerFn,
  adminUpdateOrderStatusServerFn,
} from "@/lib/api/admin.functions";

export const Route = createFileRoute("/admin")({ component: AdminPage });

const ADMIN_TOKEN_KEY = "sawai_admin_token";

type Stats = {
  totalOrders: number;
  paidOrders: number;
  pendingOrders: number;
  failedOrders: number;
  totalRevenue: number;
};

type OrderRow = {
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
};

type OrderDetail = OrderRow & {
  delivery_address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Badge({ status }: { status: string }) {
  return <span className={`admin-badge admin-badge--${status}`}>{status}</span>;
}

function fmt(date: string) {
  return new Date(date).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

function fmtRupee(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: (token: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || loading) return;
    setLoading(true);
    setError("");
    try {
      const result = await adminLoginServerFn({ data: { email, password } });
      try { sessionStorage.setItem(ADMIN_TOKEN_KEY, result.token); } catch { /* ignore */ }
      onLogin(result.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__brand">
          <h1>Sawai Gir Amrut</h1>
          <p>ADMIN PANEL</p>
        </div>
        <form className="admin-login__form" onSubmit={handleSubmit}>
          <div className="admin-field">
            <label htmlFor="admin-email">Email Address</label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="admin-field">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="admin-login__error" role="alert">{error}</p>}
          <button type="submit" className="admin-login__btn" disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
            <ArrowUpRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Order Detail Modal ───────────────────────────────────────────────────────

function OrderDetailModal({
  orderId,
  token,
  onClose,
}: {
  orderId: string;
  token: string;
  onClose: () => void;
}) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const [updateMsg, setUpdateMsg] = useState("");

  useEffect(() => {
    void (async () => {
      setLoading(true);
      try {
        const raw = await adminGetOrderServerFn({ data: { token, orderId } });
        const data = raw as unknown as OrderDetail;
        setOrder(data);
        setNewStatus(data.order_status);
      } catch { /* ignore */ }
      finally { setLoading(false); }
    })();
  }, [orderId, token]);

  const handleUpdate = async () => {
    if (!order || !newStatus || updating) return;
    setUpdating(true);
    try {
      await adminUpdateOrderStatusServerFn({
        data: { token, orderId: order.id, orderStatus: newStatus as "pending" | "confirmed" | "shipped" | "delivered" | "cancelled" },
      });
      setOrder((o) => o ? { ...o, order_status: newStatus } : o);
      setUpdateMsg("Status updated successfully.");
    } catch (e) {
      setUpdateMsg(e instanceof Error ? e.message : "Update failed.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="admin-order-modal" onClick={onClose}>
      <div className="admin-order-modal__card" onClick={(e) => e.stopPropagation()}>
        <div className="admin-order-modal__header">
          <h3>{order ? order.order_number : "Loading…"}</h3>
          <button type="button" onClick={onClose} aria-label="Close" style={{ background: "none", border: 0, color: "inherit", cursor: "pointer" }}>
            <X size={20} />
          </button>
        </div>
        <div className="admin-order-modal__body">
          {loading && <p style={{ color: "var(--sawai-muted)" }}>Loading order details…</p>}
          {!loading && order && (
            <>
              <p className="admin-order-modal__section-title">ORDER SUMMARY</p>
              <dl>
                <dt>Order No.</dt><dd>{order.order_number}</dd>
                <dt>Date</dt><dd>{fmt(order.created_at)}</dd>
                <dt>Amount</dt><dd style={{ fontWeight: 600 }}>{fmtRupee(order.final_amount)}</dd>
                <dt>Payment</dt><dd><Badge status={order.payment_status} /></dd>
                <dt>Order Status</dt><dd><Badge status={order.order_status} /></dd>
                <dt>Payment Ref</dt><dd style={{ fontSize: 12 }}>{order.razorpay_payment_id ?? "—"}</dd>
                <dt>Product</dt><dd>{order.order_items[0]?.product_name_snapshot ?? "—"}</dd>
                <dt>Quantity</dt><dd>{order.order_items[0]?.quantity ?? "—"}</dd>
              </dl>

              <p className="admin-order-modal__section-title">CUSTOMER</p>
              <dl>
                <dt>Name</dt><dd>{order.customer_name}</dd>
                <dt>Phone</dt><dd><a href={`tel:${order.phone}`}>{order.phone}</a></dd>
                <dt>Email</dt><dd>{order.email}</dd>
              </dl>

              {order.delivery_address && (
                <>
                  <p className="admin-order-modal__section-title">DELIVERY ADDRESS</p>
                  <dl>
                    <dt>Address</dt><dd>{order.delivery_address}</dd>
                    <dt>City</dt><dd>{order.city}</dd>
                    <dt>State</dt><dd>{order.state}</dd>
                    <dt>PIN</dt><dd>{order.pincode}</dd>
                  </dl>
                </>
              )}

              <p className="admin-order-modal__section-title">UPDATE FULFILLMENT STATUS</p>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <select
                  className="admin-status-select"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  {["pending", "confirmed", "shipped", "delivered", "cancelled"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <button type="button" className="admin-update-btn" onClick={handleUpdate} disabled={updating}>
                  {updating ? "Updating…" : "Update"}
                </button>
              </div>
              {updateMsg && <p style={{ fontSize: 12, marginTop: 8, color: "var(--sawai-muted)" }}>{updateMsg}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [payFilter, setPayFilter] = useState("all");
  const [ordFilter, setOrdFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadStats = useCallback(async () => {
    try {
      const data = await adminGetStatsServerFn({ data: { token } });
      setStats(data);
    } catch { /* ignore */ }
  }, [token]);

  const loadOrders = useCallback(async (pg = 1, q = search, pay = payFilter, ord = ordFilter) => {
    setLoading(true);
    try {
      const result = await adminGetOrdersServerFn({
        data: {
          token,
          page: pg,
          limit: 20,
          search: q || undefined,
          paymentStatus: pay as "all" | "pending" | "paid" | "failed" | "refunded",
          orderStatus: ord as "all" | "pending" | "confirmed" | "shipped" | "delivered" | "cancelled",
        },
      });
      setOrders(result.orders as OrderRow[]);
      setTotal(result.total);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, [token, search, payFilter, ordFilter]);

  useEffect(() => {
    void loadStats();
    void loadOrders();
  }, [loadStats, loadOrders]);

  const handleSearch = (v: string) => {
    setSearch(v);
    setPage(1);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => void loadOrders(1, v), 400);
  };

  const handleRefresh = () => {
    void loadStats();
    void loadOrders(page);
  };

  const exportCSV = () => {
    const headers = ["Order No", "Date", "Customer", "Phone", "Email", "Product", "Qty", "Amount", "Payment", "Status", "Payment Ref"];
    const rows = orders.map((o) => [
      o.order_number, fmt(o.created_at), o.customer_name, o.phone, o.email,
      o.order_items[0]?.product_name_snapshot ?? "", o.order_items[0]?.quantity ?? "",
      o.final_amount, o.payment_status, o.order_status, o.razorpay_payment_id ?? "",
    ]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `sawai-orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <h2>Sawai Gir Amrut</h2>
          <small>ADMIN PANEL</small>
        </div>
        <nav>
          <button type="button" className="active">📦 Orders</button>
        </nav>
        <button type="button" className="admin-sidebar__logout" onClick={onLogout}>
          Sign Out
        </button>
      </aside>

      {/* Main */}
      <main className="admin-main">
        <div className="admin-topbar">
          <h1>Orders Dashboard</h1>
          <button type="button" className="admin-refresh-btn" onClick={handleRefresh}>
            <ArrowClockwise size={15} />
            Refresh
          </button>
        </div>

        <div className="admin-content">
          {/* Stats */}
          {stats && (
            <div className="admin-stats">
              <div className="admin-stat-card">
                <p className="admin-stat-card__label">TOTAL ORDERS</p>
                <p className="admin-stat-card__value">{stats.totalOrders}</p>
              </div>
              <div className="admin-stat-card">
                <p className="admin-stat-card__label">PAID ORDERS</p>
                <p className="admin-stat-card__value">{stats.paidOrders}</p>
              </div>
              <div className="admin-stat-card">
                <p className="admin-stat-card__label">PENDING</p>
                <p className="admin-stat-card__value">{stats.pendingOrders}</p>
              </div>
              <div className="admin-stat-card">
                <p className="admin-stat-card__label">FAILED</p>
                <p className="admin-stat-card__value">{stats.failedOrders}</p>
              </div>
              <div className="admin-stat-card">
                <p className="admin-stat-card__label">VERIFIED REVENUE</p>
                <p className="admin-stat-card__value">{fmtRupee(stats.totalRevenue)}</p>
                <p className="admin-stat-card__sub">Paid orders only</p>
              </div>
            </div>
          )}

          {/* Orders table */}
          <div className="admin-orders-header">
            <h2>All Orders ({total})</h2>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <div className="admin-search">
                <input
                  type="search"
                  placeholder="Search by order no, name, email, phone…"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  aria-label="Search orders"
                />
              </div>
              <div className="admin-filters">
                <select
                  value={payFilter}
                  onChange={(e) => { setPayFilter(e.target.value); setPage(1); void loadOrders(1, search, e.target.value, ordFilter); }}
                  aria-label="Filter by payment status"
                >
                  {["all", "pending", "paid", "failed", "refunded"].map((s) => <option key={s} value={s}>{s === "all" ? "All Payments" : s}</option>)}
                </select>
                <select
                  value={ordFilter}
                  onChange={(e) => { setOrdFilter(e.target.value); setPage(1); void loadOrders(1, search, payFilter, e.target.value); }}
                  aria-label="Filter by order status"
                >
                  {["all", "pending", "confirmed", "shipped", "delivered", "cancelled"].map((s) => <option key={s} value={s}>{s === "all" ? "All Statuses" : s}</option>)}
                </select>
              </div>
              <button type="button" className="admin-export-btn" onClick={exportCSV}>
                <DownloadSimple size={14} />
                Export CSV
              </button>
            </div>
          </div>

          {loading && <p style={{ color: "var(--sawai-muted)", marginBottom: 16 }}>Loading orders…</p>}

          <div className="admin-table-wrap">
            {orders.length === 0 && !loading ? (
              <p className="admin-empty">No orders found.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order No</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Ref</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td style={{ fontWeight: 600, fontSize: 12 }}>{o.order_number}</td>
                      <td style={{ fontSize: 12 }}>{fmt(o.created_at)}</td>
                      <td>
                        <div>{o.customer_name}</div>
                        <div style={{ fontSize: 11, color: "var(--sawai-muted)" }}>{o.email}</div>
                      </td>
                      <td style={{ fontSize: 12 }}>{o.phone}</td>
                      <td style={{ fontSize: 12 }}>
                        {o.order_items[0]?.product_name_snapshot ?? "—"}
                        {o.order_items[0] && <span style={{ color: "var(--sawai-muted)", marginLeft: 4 }}>×{o.order_items[0].quantity}</span>}
                      </td>
                      <td style={{ fontWeight: 600 }}>{fmtRupee(o.final_amount)}</td>
                      <td><Badge status={o.payment_status} /></td>
                      <td><Badge status={o.order_status} /></td>
                      <td style={{ fontSize: 11, color: "var(--sawai-muted)" }}>{o.razorpay_payment_id?.slice(-8) ?? "—"}</td>
                      <td>
                        <button type="button" className="admin-view-btn" onClick={() => setSelectedOrderId(o.id)}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="admin-pagination">
              <span>Page {page} of {totalPages} · {total} total</span>
              <div className="admin-pagination__btns">
                <button type="button" disabled={page <= 1} onClick={() => { const p = page - 1; setPage(p); void loadOrders(p); }}>
                  ← Previous
                </button>
                <button type="button" disabled={page >= totalPages} onClick={() => { const p = page + 1; setPage(p); void loadOrders(p); }}>
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Order detail modal */}
      {selectedOrderId && (
        <OrderDetailModal
          orderId={selectedOrderId}
          token={token}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────

function AdminPage() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Restore session from sessionStorage
    try {
      const stored = sessionStorage.getItem(ADMIN_TOKEN_KEY);
      if (stored) setToken(stored);
    } catch { /* ignore */ }
  }, []);

  const handleLogout = () => {
    try { sessionStorage.removeItem(ADMIN_TOKEN_KEY); } catch { /* ignore */ }
    setToken(null);
  };

  return (
    <div className="admin-page">
      {!token ? (
        <LoginScreen onLogin={setToken} />
      ) : (
        <Dashboard token={token} onLogout={handleLogout} />
      )}
    </div>
  );
}
