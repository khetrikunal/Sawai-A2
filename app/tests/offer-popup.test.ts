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

  test("OfferPopup component uses correct WhatsApp business number and pre-filled message", () => {
    expect(existsSync(componentPath)).toBe(true);
    const content = readFileSync(componentPath, "utf8");

    // Official business WhatsApp number from existing site
    expect(content).toContain("919156996309");
    expect(content).toContain("https://wa.me/");

    // Prefilled message contains offer details
    expect(content).toContain("Diwali Special Combo");
    expect(content).toContain("349");

    // Link targets and security
    expect(content).toContain('target="_blank"');
    expect(content).toContain('rel="noopener noreferrer"');

    // Accessibility attributes
    expect(content).toContain('role="dialog"');
    expect(content).toContain('aria-modal="true"');
    expect(content).toContain('aria-labelledby=');
    expect(content).toContain('aria-label="Close offer popup"');

    // Correct image path
    expect(content).toContain('src="/offer.jpeg"');
  });

  test("index.tsx imports and renders OfferPopup", () => {
    const indexContent = readFileSync(indexPath, "utf8");
    expect(indexContent).toContain('import { OfferPopup } from "@/components/OfferPopup"');
    expect(indexContent).toContain("<OfferPopup />");
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

  test("homepage renders the Offers section with both promotional cards and WhatsApp links", () => {
    const indexContent = readFileSync(indexPath, "utf8");

    // Section structure
    expect(indexContent).toContain('id="offers"');
    expect(indexContent).toContain("Exclusive");
    expect(indexContent).toContain("Festive Offers");
    expect(indexContent).toContain("offers-grid");

    // Both offer images referenced
    expect(indexContent).toContain("/offer%201.jpeg");
    expect(indexContent).toContain("/offer.jpeg");

    // Offer details
    expect(indexContent).toContain("Pavitra Bhet Combo");
    expect(indexContent).toContain("Satvik Sangam Combo");

    // WhatsApp order buttons with specific messages
    expect(indexContent).toContain("Diwali Pavitra Bhet Combo");
    expect(indexContent).toContain("Diwali Satvik Sangam Combo");
    expect(indexContent).toContain("https://wa.me/919156996309?text=");

    // Navigation links updated
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
