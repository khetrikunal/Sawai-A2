// Server-side authoritative product catalog.
// NEVER trust prices from the frontend — always resolve from here.
// This file is the single source of truth for all product prices.

export type ProductType = "physical" | "combo";

export interface CatalogProduct {
  id: string;
  name: string;
  description: string;
  price: number; // Final price in INR (rupees)
  originalPrice?: number; // MRP in INR, if discounted
  productType: ProductType;
  requiresDelivery: boolean; // Whether delivery address is mandatory
  maxQuantity: number;
}

export const PRODUCT_CATALOG: CatalogProduct[] = [
  {
    id: "ghee-200ml",
    name: "Sawai Gir Amrut A2 Gir Cow Bilona Ghee – 200 ml",
    description: "200 ml jar of pure A2 Gir Cow Bilona Ghee from Sawai Gir Farm, Phaltan.",
    price: 640,
    originalPrice: 800,
    productType: "physical",
    requiresDelivery: true,
    maxQuantity: 20,
  },
  {
    id: "ghee-500ml",
    name: "Sawai Gir Amrut A2 Gir Cow Bilona Ghee – 500 ml",
    description: "500 ml jar of pure A2 Gir Cow Bilona Ghee from Sawai Gir Farm, Phaltan.",
    price: 1600,
    originalPrice: 2000,
    productType: "physical",
    requiresDelivery: true,
    maxQuantity: 20,
  },
  {
    id: "ghee-1l",
    name: "Sawai Gir Amrut A2 Gir Cow Bilona Ghee – 1 Litre",
    description: "1 Litre jar of pure A2 Gir Cow Bilona Ghee from Sawai Gir Farm, Phaltan.",
    price: 3200,
    originalPrice: 4000,
    productType: "physical",
    requiresDelivery: true,
    maxQuantity: 20,
  },
  {
    id: "offer-pavitra-bhet",
    name: "Pavitra Bhet Combo",
    description:
      "200 ml Pure A2 Gir Cow Bilona Ghee + 50 ml Gomutra + 1 Cow Dung Govari – Festive Exclusive",
    price: 349,
    productType: "combo",
    requiresDelivery: true,
    maxQuantity: 10,
  },
  {
    id: "offer-satvik-sangam",
    name: "Satvik Sangam Combo",
    description:
      "200 ml Pure A2 Gir Cow Bilona Ghee + 90 ml Gomutra + 1 Cow Dung Govari – Festive Exclusive",
    price: 349,
    productType: "combo",
    requiresDelivery: true,
    maxQuantity: 10,
  },
];

export function getProductById(id: string): CatalogProduct | undefined {
  return PRODUCT_CATALOG.find((p) => p.id === id);
}

/** Calculate the authoritative final amount for an order line.
 *  Returns amount in PAISE (× 100) for use with Razorpay. */
export function calcAmountPaise(productId: string, quantity: number): number {
  const product = getProductById(productId);
  if (!product) throw new Error(`Unknown product: ${productId}`);
  if (quantity < 1 || quantity > product.maxQuantity) {
    throw new Error(`Invalid quantity ${quantity} for product ${productId}`);
  }
  return product.price * quantity * 100; // paise
}
