import { getSupabaseServerClient } from "@/lib/supabase/client";
import { searchProductList } from "@/lib/search";
import type {
  Alternative,
  Product,
  ProductResult,
  Suggestion,
} from "@/types/data";

// Mirrors lib/db/local.ts against real Supabase Postgres tables defined in
// supabase/migrations/0001_init.sql. Activated when DATA_BACKEND=supabase.

interface ProductRow {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  image_url: string;
  aliases: string[] | null;
}

interface AlternativeRow {
  id: string;
  slug: string;
  name: string;
  brand: string;
  basis_text: string;
  basis_confidence: 1 | 2;
  basis_sources: string[] | null;
  affiliate_url: string | null;
  affiliate_type: Alternative["affiliateType"];
  category: string;
  image_url: string;
  asin: string | null;
  swap_type: Alternative["swapType"];
}

interface AssociationRow {
  id: string;
  product_id: string;
  claim_text: string;
  source_urls: string[] | null;
  confidence_tier: 1 | 2;
  theme_tag: string | null;
  date_checked: string;
}

interface ProductAlternativeMapRow {
  rank: "primary" | "secondary";
  alternatives: AlternativeRow;
}

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    category: row.category,
    imageUrl: row.image_url,
    aliases: row.aliases ?? undefined,
  };
}

function toAlternative(row: AlternativeRow): Alternative {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    basisText: row.basis_text,
    basisConfidence: row.basis_confidence,
    basisSources: row.basis_sources ?? [],
    affiliateUrl: row.affiliate_url,
    affiliateType: row.affiliate_type,
    category: row.category,
    imageUrl: row.image_url,
    asin: row.asin,
    swapType: row.swap_type,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw error;
  return (data ?? []).map(toProduct);
}

export async function searchProducts(
  query: string,
  limit = 8,
): Promise<Product[]> {
  // Fuzzy/token matching against aliases (e.g. "nyx hd" -> NYX, "&" vs
  // "and") needs per-word substring checks, which isn't a clean single
  // Postgres query. The catalog is small, so fetch everything and filter
  // in JS — keeps this logic identical to lib/db/local.ts.
  const products = await getAllProducts();
  return searchProductList(products, query, limit);
}

export async function getCategories(): Promise<
  { category: string; count: number }[]
> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("products").select("category");
  if (error) throw error;
  const counts = new Map<string, number>();
  for (const row of data ?? []) {
    counts.set(row.category, (counts.get(row.category) ?? 0) + 1);
  }
  return Array.from(counts.entries()).map(([category, count]) => ({
    category,
    count,
  }));
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category);
  if (error) throw error;
  return (data ?? []).map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle<ProductRow>();
  if (error) throw error;
  return data ? toProduct(data) : null;
}

export async function getProductResult(
  slug: string,
): Promise<ProductResult | null> {
  const supabase = getSupabaseServerClient();
  const { data: productRow, error: productError } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle<ProductRow>();
  if (productError) throw productError;
  if (!productRow) return null;

  const { data: associationRow, error: associationError } = await supabase
    .from("associations")
    .select("*")
    .eq("product_id", productRow.id)
    .maybeSingle<AssociationRow>();
  if (associationError) throw associationError;
  if (!associationRow) return null;

  const { data: mapRows, error: mapError } = await supabase
    .from("product_alternative_map")
    .select("rank, alternatives(*)")
    .eq("product_id", productRow.id)
    .overrideTypes<ProductAlternativeMapRow[]>();
  if (mapError) throw mapError;

  const primaryRow = (mapRows ?? []).find((m) => m.rank === "primary");
  const secondaryRows = (mapRows ?? []).filter((m) => m.rank === "secondary");

  return {
    product: toProduct(productRow),
    association: {
      id: associationRow.id,
      productId: associationRow.product_id,
      claimText: associationRow.claim_text,
      sourceUrls: associationRow.source_urls ?? [],
      confidenceTier: associationRow.confidence_tier,
      themeTag: associationRow.theme_tag ?? undefined,
      dateChecked: associationRow.date_checked,
    },
    primaryAlternative: primaryRow
      ? { ...toAlternative(primaryRow.alternatives), rank: "primary" }
      : null,
    secondaryAlternatives: secondaryRows.map((m) => ({
      ...toAlternative(m.alternatives),
      rank: "secondary" as const,
    })),
  };
}

export async function saveEmailSignup(
  email: string,
  sourceProductSlug?: string,
): Promise<void> {
  const supabase = getSupabaseServerClient();
  const { error } = await supabase
    .from("email_signups")
    .upsert(
      { email, source_product_slug: sourceProductSlug },
      { onConflict: "email", ignoreDuplicates: true },
    );
  if (error) throw error;
}

export async function saveSuggestion(
  input: Omit<Suggestion, "id" | "status" | "createdAt">,
): Promise<void> {
  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from("suggestions").insert({
    product_name: input.productName,
    brand: input.brand,
    category: input.category,
    reason: input.reason,
    source_url: input.sourceUrl,
  });
  if (error) throw error;
}
