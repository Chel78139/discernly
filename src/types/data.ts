export type ConfidenceTier = 1 | 2;

export type AffiliateType = "amazon" | "direct" | "unconfirmed";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
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
