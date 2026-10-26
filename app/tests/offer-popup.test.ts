import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

describe("Offer Popup and WhatsApp Ordering Integration", () => {
  const root = join(import.meta.dir, "..");
  const imagePath = join(root, "public", "offer.jpeg");
  const componentPath = join(root, "src", "components", "OfferPopup.tsx");
  const indexPath = join(root, "src", "routes", "index.tsx");
  const cssPath = join(root, "src", "sawai.css");

  test("locates the existing offer image with .jpeg extension", () => {
    expect(existsSync(imagePath)).toBe(true);
    const stat = statSync(imagePath);
    expect(stat.size).toBeGreaterThan(100000); // verify file is not empty or stub

    // Verify JPEG magic bytes (FF D8 FF)
    const buffer = readFileSync(imagePath);
    expect(buffer[0]).toBe(0xff);
    expect(buffer[1]).toBe(0xd8);
    expect(buffer[2]).toBe(0xff);
  });

  test("OfferPopup component uses Razorpay checkout and correct content", () => {
    expect(existsSync(componentPath)).toBe(true);
    const content = readFileSync(componentPath, "utf8");

    // Offer price still present
    expect(content).toContain("349");

    // Uses onBuyNow callback prop (Razorpay flow) instead of WhatsApp link
    expect(content).toContain("onBuyNow");

    // Accessibility attributes preserved
    expect(content).toContain('role="dialog"');
    expect(content).toContain('aria-modal="true"');
    expect(content).toContain('aria-labelledby=');
    expect(content).toContain('aria-label="Close offer popup"');

    // Correct image path
    expect(content).toContain('src="/offer.jpeg"');
  });

  test("index.tsx imports and renders OfferPopup with Razorpay callback", () => {
    const indexContent = readFileSync(indexPath, "utf8");
    expect(indexContent).toContain('import { OfferPopup } from "@/components/OfferPopup"');
    // OfferPopup is rendered with the onBuyNow callback (opens Razorpay checkout)
    expect(indexContent).toContain("<OfferPopup");
    expect(indexContent).toContain("onBuyNow");
  });

  test("sawai.css includes responsive and styled rules for offer popup", () => {
    const cssContent = readFileSync(cssPath, "utf8");
    expect(cssContent).toContain(".offer-overlay");
    expect(cssContent).toContain(".offer-modal");
    expect(cssContent).toContain(".offer-modal__order-btn");
    expect(cssContent).toContain(".offer-modal__image");
    expect(cssContent).toContain("aspect-ratio: 1 / 1");
  });

  test("locates both offer images in public directory with valid JPEG bytes", () => {
    const offer1Path = join(root, "public", "offer 1.jpeg");
    const offerPath = join(root, "public", "offer.jpeg");

    expect(existsSync(offer1Path)).toBe(true);
    expect(existsSync(offerPath)).toBe(true);

    const buf1 = readFileSync(offer1Path);
    const buf2 = readFileSync(offerPath);

    // JPEG SOI marker
    expect(buf1[0]).toBe(0xff);
    expect(buf1[1]).toBe(0xd8);
    expect(buf1[2]).toBe(0xff);

    expect(buf2[0]).toBe(0xff);
    expect(buf2[1]).toBe(0xd8);
    expect(buf2[2]).toBe(0xff);
  });

  test("homepage renders the Offers section with both promotional cards and Razorpay checkout", () => {
    const indexContent = readFileSync(indexPath, "utf8");

    // Section structure
    expect(indexContent).toContain('id="offers"');
    expect(indexContent).toContain("Exclusive");
    expect(indexContent).toContain("Festive Offers");
    expect(indexContent).toContain("offers-grid");

    // Both offer images referenced
    expect(indexContent).toContain("/offer%201.jpeg");
    expect(indexContent).toContain("/offer.jpeg");

    // Offer details — both combos must be present
    expect(indexContent).toContain("Pavitra Bhet Combo");
    expect(indexContent).toContain("Satvik Sangam Combo");

    // Buttons now open the Razorpay purchase form (not WhatsApp)
    expect(indexContent).toContain("openOfferPurchase");
    expect(indexContent).toContain("PurchaseForm");

    // Navigation links present
    expect(indexContent).toContain('href="#offers"');
  });

  test("sawai.css includes styles for the homepage offers section and cards", () => {
    const cssContent = readFileSync(cssPath, "utf8");
    expect(cssContent).toContain(".offers-section");
    expect(cssContent).toContain(".offers-grid");
    expect(cssContent).toContain(".offer-card");
    expect(cssContent).toContain(".offer-card__image-container");
    expect(cssContent).toContain(".offer-card__btn");
  });
});
