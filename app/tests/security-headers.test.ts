import { expect, test } from "bun:test";
import { applySecurityHeaders } from "../src/lib/security-headers.server";

test("allows the host approval iframe and preserves the response", async () => {
  const response = applySecurityHeaders(new Response("ok", { status: 201 }));
  expect(response.status).toBe(201);
  expect(await response.text()).toBe("ok");
  const csp = response.headers.get("content-security-policy") ?? "";
  // Razorpay checkout script (main SDK)
  expect(csp).toContain("https://checkout.razorpay.com");
  // Razorpay CDN (risk-detection bundle and other sub-resources)
  expect(csp).toContain("https://cdn.razorpay.com");
  // Razorpay API (payment and verification calls)
  expect(csp).toContain("https://api.razorpay.com");
  // Higgsfield auth frame (platform preview)
  expect(csp).toContain("https://auth.higgsfield.app");
  // frame-ancestors must not be set here (platform owns it)
  expect(csp).not.toContain("frame-ancestors");
});
