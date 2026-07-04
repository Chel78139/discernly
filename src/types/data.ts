export type ConfidenceTier = 1 | 2;

export type AffiliateType = "amazon" | "direct" | "unconfirmed";

// "christian" = a Christian-founded/affirming brand (the default).
// "clean" = no Christian alternative has been found yet; this is offered
// as a clean/non-toxic swap instead, labeled accordingly in the UI.
export type SwapType = "christian" | "clean";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
  // Extra search terms (misspellings, product line names, "&" vs "and")
  // that should also resolve to this product.
  aliases?: string[];
}

export interface Association {
  id: string;
  productId: string;
  claimText: string;
  sourceUrls: string[];
  confidenceTier: ConfidenceTier;
  themeTag?: string;
  dateChecked: string;
}

export interface Alternative {
  id: string;
  slug: string;
  name: string;
  brand: string;
  basisText: string;
  basisConfidence: ConfidenceTier;
  basisSources: string[];
  affiliateUrl: string | null;
  affiliateType: AffiliateType | null;
  category: string;
  imageUrl: string;
  swapType: SwapType;
  // Confirmed Amazon ASIN for a direct amazon.com/dp/<asin> link. Null
  // means affiliateType is "amazon" but no ASIN has been confirmed yet —
  // the UI shows a clearly marked pending state rather than guessing.
  asin: string | null;
}

export interface ProductAlternativeMapEntry {
  productId: string;
  alternativeId: string;
  rank: "primary" | "secondary";
}

export interface IngredientSafety {
  id: string;
  productId: string;
  label: string;
  sourceUrl?: string;
}

export interface ProductResult {
  product: Product;
  association: Association;
  primaryAlternative: (Alternative & { rank: "primary" }) | null;
  secondaryAlternatives: (Alternative & { rank: "secondary" })[];
}

export interface EmailSignup {
  id: string;
  email: string;
  sourceProductSlug?: string;
  createdAt: string;
}

export interface Suggestion {
  id: string;
  productName: string;
  brand?: string;
  category?: string;
  reason: string;
  sourceUrl?: string;
  status: "pending" | "reviewed" | "published" | "rejected";
  createdAt: string;
}
