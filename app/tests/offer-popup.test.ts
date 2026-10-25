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
});
