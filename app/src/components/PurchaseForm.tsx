import { useState, useRef, useEffect, useCallback } from "react";
import { X, ArrowUpRight, CircleNotch } from "@phosphor-icons/react";
import { z } from "zod";
import { normalisePhone } from "@/lib/validation";
import { createOrderServerFn, verifyPaymentServerFn } from "@/lib/api/orders.functions";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PurchaseProduct {
  id: string;
  name: string;
  price: number;
  requiresDelivery: boolean;
  maxQuantity: number;
}

interface PurchaseFormProps {
  product: PurchaseProduct;
  quantity?: number;
  onClose: () => void;
  onSuccess: (orderNumber: string) => void;
}

// ─── Declare Razorpay on window ───────────────────────────────────────────────

declare global {
  interface Window {
    Razorpay: new (opts: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: any) => void) => void;
    };
  }
}

// ─── Validation helpers ───────────────────────────────────────────────────────

const VALIDATORS = {
  fullName: (v: string) => (v.trim().length >= 2 ? null : "Name must be at least 2 characters"),
  phone: (v: string) => {
    const n = normalisePhone(v);
    return /^\d{10}$/.test(n) ? null : "Enter a valid 10-digit Indian mobile number";
  },
  email: (v: string) => {
    try {
      z.email().parse(v);
      return null;
    } catch {
      return "Enter a valid email address";
    }
  },
  deliveryAddress: (v: string, req: boolean) =>
    req && !v.trim() ? "Delivery address is required" : null,
  city: (v: string, req: boolean) => (req && !v.trim() ? "City is required" : null),
  state: (v: string, req: boolean) => (req && !v.trim() ? "State is required" : null),
  pincode: (v: string, req: boolean) => {
    if (!req) return null;
    return /^\d{6}$/.test(v) ? null : "Enter a valid 6-digit PIN code";
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

type Step = "form" | "processing" | "success" | "failed";

export function PurchaseForm({ product, quantity: initialQty = 1, onClose, onSuccess }: PurchaseFormProps) {
  const [step, setStep] = useState<Step>("form");
  const [qty, setQty] = useState(Math.min(initialQty, product.maxQuantity));
  const [submitting, setSubmitting] = useState(false);
  const [successOrder, setSuccessOrder] = useState("");
  const [failureMsg, setFailureMsg] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const [fields, setFields] = useState({
    fullName: "",
    phone: "",
    email: "",
    deliveryAddress: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof fields, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof typeof fields, boolean>>>({});

  const req = product.requiresDelivery;

  useEffect(() => {
    dialogRef.current?.showModal();
    firstFieldRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && step === "form") handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [step]);

  const handleClose = useCallback(() => {
    dialogRef.current?.close();
    onClose();
  }, [onClose]);

  const setField = (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    if (touched[k]) validateField(k, e.target.value);
  };

  const validateField = (k: keyof typeof fields, v: string) => {
    let err: string | null = null;
    if (k === "fullName") err = VALIDATORS.fullName(v);
    else if (k === "phone") err = VALIDATORS.phone(v);
    else if (k === "email") err = VALIDATORS.email(v);
    else if (k === "deliveryAddress") err = VALIDATORS.deliveryAddress(v, req);
    else if (k === "city") err = VALIDATORS.city(v, req);
    else if (k === "state") err = VALIDATORS.state(v, req);
    else if (k === "pincode") err = VALIDATORS.pincode(v, req);

    setErrors((er) => {
      const next = { ...er };
      if (err) next[k] = err;
      else delete next[k];
      return next;
    });
    return err;
  };

  const onBlur = (k: keyof typeof fields) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    validateField(k, fields[k]);
  };

  const validateAll = () => {
    const allKeys: (keyof typeof fields)[] = [
      "fullName", "phone", "email", "deliveryAddress", "city", "state", "pincode",
    ];
    const newErrors: Partial<Record<keyof typeof fields, string>> = {};
    for (const k of allKeys) {
      let err: string | null = null;
      if (k === "fullName") err = VALIDATORS.fullName(fields[k]);
      else if (k === "phone") err = VALIDATORS.phone(fields[k]);
      else if (k === "email") err = VALIDATORS.email(fields[k]);
      else if (k === "deliveryAddress") err = VALIDATORS.deliveryAddress(fields[k], req);
      else if (k === "city") err = VALIDATORS.city(fields[k], req);
      else if (k === "state") err = VALIDATORS.state(fields[k], req);
      else if (k === "pincode") err = VALIDATORS.pincode(fields[k], req);
      if (err) newErrors[k] = err;
    }
    setErrors(newErrors);
    setTouched(Object.fromEntries(allKeys.map((k) => [k, true])));
    return Object.keys(newErrors).length === 0;
  };

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) { resolve(true); return; }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll() || submitting) return;
    setSubmitting(true);
    setStep("processing");

    try {
      // 1. Create order on server (server verifies price & creates Razorpay order).
      //    Race against a 30-second timeout so the spinner never hangs indefinitely
      //    if the backend or Razorpay order-creation endpoint is unreachable.
      const ORDER_TIMEOUT_MS = 30_000;
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Request timed out. Please check your connection and try again.")),
          ORDER_TIMEOUT_MS
        )
      );

      const orderResult = await Promise.race([
        createOrderServerFn({
          data: {
            productId: product.id,
            quantity: qty,
            fullName: fields.fullName.trim(),
            phone: normalisePhone(fields.phone),
            email: fields.email.trim(),
            deliveryAddress: req ? fields.deliveryAddress.trim() : undefined,
            city: req ? fields.city.trim() : undefined,
            state: req ? fields.state.trim() : undefined,
            pincode: req ? fields.pincode.trim() : undefined,
          },
        }),
        timeoutPromise,
      ]);

      // 2. Load Razorpay script
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Failed to load payment gateway. Please try again.");

      // 3. Open Razorpay Checkout.
      //
      // CRITICAL — dialog top-layer vs. Razorpay overlay z-index:
      // <dialog showModal()> is placed in the browser "top layer", a special stacking
      // context painted ABOVE all CSS z-index values — including Razorpay's checkout
      // overlay (z-index: 2147483647). Leaving our dialog open when rz.open() is called
      // causes the Razorpay modal to render invisibly behind it. The user sees our
      // "Opening payment gateway…" spinner forever because ondismiss / handler never fire.
      //
      // Fix: close our dialog just before rz.open(), then restore it in every callback
      // path (success, cancellation, error) via the one-shot settle() helper below.
      dialogRef.current?.close();

      await new Promise<void>((resolve, reject) => {
        // Safety net: if Razorpay fires no lifecycle callback within 3 minutes
        // (e.g. silent network failure after open()), reopen our dialog and surface
        // a recoverable error instead of leaving the user on a blank screen forever.
        let settled = false;
        const checkoutTimer = setTimeout(() => {
          if (settled) return;
          settled = true;
          dialogRef.current?.showModal();
          reject(new Error("Payment gateway did not respond. Please check your connection and try again."));
        }, 180_000);

        /** Executes fn exactly once; clears the timer and restores the dialog first. */
        const settle = (fn: () => void) => {
          if (settled) return;
          settled = true;
          clearTimeout(checkoutTimer);
          dialogRef.current?.showModal();
          fn();
        };

        const options = {
          key: orderResult.keyId,
          amount: orderResult.amountPaise,
          currency: orderResult.currency,
          name: "Sawai Gir Amrut",
          description: orderResult.productName,
          order_id: orderResult.razorpayOrderId,
          prefill: {
            name: orderResult.customerName,
            email: orderResult.customerEmail,
            contact: orderResult.customerPhone,
          },
          theme: { color: "#164A37" },
          retry: {
            enabled: true,
            max_count: 4,
          },
          modal: {
            confirm_close: true,
            backdropclose: false,
            escape: true,
            ondismiss: () => {
              // User dismissed the Razorpay modal — restore dialog in form state.
              settle(() => {
                setStep("form");
                setSubmitting(false);
                resolve();
              });
            },
          },
          handler: async (response: {
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
          }) => {
            try {
              // 4. Verify payment on server
              const verified = await verifyPaymentServerFn({
                data: {
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                  orderNumber: orderResult.orderNumber,
                },
              });
              settle(() => {
                if (verified.success) {
                  setSuccessOrder(verified.orderNumber);
                  setStep("success");
                  onSuccess(verified.orderNumber);
                  resolve();
                } else {
                  reject(new Error("Payment verification failed"));
                }
              });
            } catch (err) {
              settle(() => reject(err instanceof Error ? err : new Error(String(err))));
            }
          },
        };
        const rz = new window.Razorpay(options);
        // Razorpay fires payment.failed on a declined attempt; ondismiss fires when the
        // user then closes the modal. Log but do not reject here — that would skip the
        // retry UI Razorpay's modal already provides.
        rz.on("payment.failed", (response: any) => {
          console.warn("[Razorpay] Payment attempt failed:", response?.error);
        });
        rz.open();
      });
    } catch (err: any) {
      // Ensure the dialog is visible to show the failure state.
      // It may have been closed before rz.open() was called.
      if (dialogRef.current && !dialogRef.current.open) {
        dialogRef.current.showModal();
      }
      console.error("[PurchaseForm] Order/Payment submission error:", err?.message || err, err?.stack, JSON.stringify(err));
      const msg = err?.message || (typeof err === "string" ? err : "Something went wrong. Please try again.");
      setFailureMsg(msg);
      setStep("failed");
    } finally {
      setSubmitting(false);
    }
  };

  const totalAmount = (product.price * qty).toLocaleString("en-IN");

  return (
    <dialog
      ref={dialogRef}
      className="purchase-dialog"
      aria-labelledby="purchase-dialog-title"
      onClick={(e) => { if (e.target === dialogRef.current) handleClose(); }}
    >
      <div className="purchase-dialog__inner" data-lenis-prevent="">
        {/* Header */}
        <div className="purchase-dialog__header">
          <div>
            <p className="purchase-dialog__kicker">SECURE CHECKOUT</p>
            <h2 id="purchase-dialog-title" className="purchase-dialog__title">{product.name}</h2>
          </div>
          <button
            type="button"
            className="purchase-dialog__close"
            aria-label="Close checkout"
            onClick={handleClose}
            disabled={submitting}
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Price summary */}
        <div className="purchase-dialog__price-bar">
          <span className="purchase-dialog__price-label">₹{product.price.toLocaleString("en-IN")} × {qty}</span>
          <span className="purchase-dialog__price-total">₹{totalAmount}</span>
        </div>

        {/* ── FORM STEP ── */}
        {step === "form" && (
          <form className="purchase-dialog__form" onSubmit={handleSubmit} noValidate>
            <div className="purchase-form__section">
              <p className="purchase-form__section-label">CONTACT DETAILS</p>

              <div className="purchase-form__row">
                <div className="purchase-form__field">
                  <label htmlFor="pf-name">Full Name *</label>
                  <input
                    ref={firstFieldRef}
                    id="pf-name"
                    type="text"
                    autoComplete="name"
                    value={fields.fullName}
                    onChange={setField("fullName")}
                    onBlur={onBlur("fullName")}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? "pf-name-err" : undefined}
                  />
                  {errors.fullName && <span id="pf-name-err" className="purchase-form__error" role="alert">{errors.fullName}</span>}
                </div>
              </div>

              <div className="purchase-form__row purchase-form__row--2">
                <div className="purchase-form__field">
                  <label htmlFor="pf-phone">Mobile Number *</label>
                  <input
                    id="pf-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="10-digit Indian number"
                    value={fields.phone}
                    onChange={setField("phone")}
                    onBlur={onBlur("phone")}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "pf-phone-err" : undefined}
                  />
                  {errors.phone && <span id="pf-phone-err" className="purchase-form__error" role="alert">{errors.phone}</span>}
                </div>
                <div className="purchase-form__field">
                  <label htmlFor="pf-email">Email Address *</label>
                  <input
                    id="pf-email"
                    type="email"
                    autoComplete="email"
                    value={fields.email}
                    onChange={setField("email")}
                    onBlur={onBlur("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "pf-email-err" : undefined}
                  />
                  {errors.email && <span id="pf-email-err" className="purchase-form__error" role="alert">{errors.email}</span>}
                </div>
              </div>
            </div>

            {req && (
              <div className="purchase-form__section">
                <p className="purchase-form__section-label">DELIVERY ADDRESS</p>

                <div className="purchase-form__field">
                  <label htmlFor="pf-address">Complete Address *</label>
                  <textarea
                    id="pf-address"
                    rows={2}
                    autoComplete="street-address"
                    value={fields.deliveryAddress}
                    onChange={setField("deliveryAddress")}
                    onBlur={onBlur("deliveryAddress")}
                    aria-invalid={!!errors.deliveryAddress}
                    aria-describedby={errors.deliveryAddress ? "pf-addr-err" : undefined}
                  />
                  {errors.deliveryAddress && <span id="pf-addr-err" className="purchase-form__error" role="alert">{errors.deliveryAddress}</span>}
                </div>

                <div className="purchase-form__row purchase-form__row--3">
                  <div className="purchase-form__field">
                    <label htmlFor="pf-city">City *</label>
                    <input
                      id="pf-city"
                      type="text"
                      autoComplete="address-level2"
                      value={fields.city}
                      onChange={setField("city")}
                      onBlur={onBlur("city")}
                      aria-invalid={!!errors.city}
                    />
                    {errors.city && <span className="purchase-form__error" role="alert">{errors.city}</span>}
                  </div>
                  <div className="purchase-form__field">
                    <label htmlFor="pf-state">State *</label>
                    <input
                      id="pf-state"
                      type="text"
                      autoComplete="address-level1"
                      value={fields.state}
                      onChange={setField("state")}
                      onBlur={onBlur("state")}
                      aria-invalid={!!errors.state}
                    />
                    {errors.state && <span className="purchase-form__error" role="alert">{errors.state}</span>}
                  </div>
                  <div className="purchase-form__field">
                    <label htmlFor="pf-pincode">PIN Code *</label>
                    <input
                      id="pf-pincode"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      autoComplete="postal-code"
                      value={fields.pincode}
                      onChange={setField("pincode")}
                      onBlur={onBlur("pincode")}
                      aria-invalid={!!errors.pincode}
                    />
                    {errors.pincode && <span className="purchase-form__error" role="alert">{errors.pincode}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="purchase-form__qty-row">
              <span>Quantity</span>
              <div className="purchase-form__qty-control">
                <button type="button" aria-label="Decrease quantity" disabled={qty <= 1} onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <output aria-live="polite">{qty}</output>
                <button type="button" aria-label="Increase quantity" disabled={qty >= product.maxQuantity} onClick={() => setQty((q) => Math.min(product.maxQuantity, q + 1))}>+</button>
              </div>
            </div>

            <button type="submit" className="purchase-dialog__pay-btn" disabled={submitting}>
              <span>Pay ₹{totalAmount} Securely</span>
              <ArrowUpRight size={20} weight="bold" />
            </button>

            <p className="purchase-dialog__security-note">
              🔒 Secured by Razorpay · UPI, Cards, Net Banking & Wallets accepted
            </p>
          </form>
        )}

        {/* ── PROCESSING STEP ── */}
        {step === "processing" && (
          <div className="purchase-dialog__status">
            <CircleNotch size={48} className="purchase-dialog__spinner" />
            <p>Opening payment gateway…</p>
            <small>Please do not close this window</small>
          </div>
        )}

        {/* ── SUCCESS STEP ── */}
        {step === "success" && (
          <div className="purchase-dialog__status purchase-dialog__status--success">
            <span className="purchase-dialog__status-icon">✓</span>
            <h3>Payment Successful!</h3>
            <p>Order <strong>{successOrder}</strong> confirmed.</p>
            <p>A confirmation email has been sent to {fields.email}.</p>
            <p>Our team will contact you on WhatsApp at +91 {fields.phone} with your dispatch details.</p>
            <button type="button" className="purchase-dialog__close-btn" onClick={handleClose}>
              Close
            </button>
          </div>
        )}

        {/* ── FAILED STEP ── */}
        {step === "failed" && (
          <div className="purchase-dialog__status purchase-dialog__status--failed">
            <span className="purchase-dialog__status-icon purchase-dialog__status-icon--failed">✕</span>
            <h3>Payment Failed</h3>
            <p>{failureMsg}</p>
            <p>You have not been charged. Please try again or contact us on WhatsApp at <a href="https://wa.me/919156996309">+91 91569 96309</a>.</p>
            <div className="purchase-dialog__status-actions">
              <button type="button" className="purchase-dialog__retry-btn" onClick={() => { setStep("form"); setSubmitting(false); }}>
                Try Again
              </button>
              <button type="button" className="purchase-dialog__close-btn" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
