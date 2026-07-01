import * as local from "./local";
import * as supabase from "./supabase";
import type { Product, ProductResult, Suggestion } from "@/types/data";

// Swap the entire data backend with one env var. Every call site in the
// app goes through these functions, so switching from the local JSON
// seed to real Supabase Postgres never touches page/component code.
const USE_SUPABASE = process.env.DATA_BACKEND === "supabase";

export async function getAllProducts(): Promise<Product[]> {
  return USE_SUPABASE ? supabase.getAllProducts() : local.getAllProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return USE_SUPABASE
    ? supabase.getProductBySlug(slug)
    : local.getProductBySlug(slug);
}

export async function searchProducts(
  query: string,
  limit = 8,
): Promise<Product[]> {
  return USE_SUPABASE
    ? supabase.searchProducts(query, limit)
    : local.searchProducts(query, limit);
}

export async function getCategories(): Promise<
  { category: string; count: number }[]
> {
  return USE_SUPABASE ? supabase.getCategories() : local.getCategories();
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  return USE_SUPABASE
    ? supabase.getProductsByCategory(category)
    : local.getProductsByCategory(category);
}

export async function getProductResult(
  slug: string,
): Promise<ProductResult | null> {
  return USE_SUPABASE
    ? supabase.getProductResult(slug)
    : local.getProductResult(slug);
}

export async function saveEmailSignup(
  email: string,
  sourceProductSlug?: string,
): Promise<void> {
  return USE_SUPABASE
    ? supabase.saveEmailSignup(email, sourceProductSlug)
    : local.saveEmailSignup(email, sourceProductSlug);
}

export async function saveSuggestion(
  input: Omit<Suggestion, "id" | "status" | "createdAt">,
): Promise<void> {
  return USE_SUPABASE
    ? supabase.saveSuggestion(input)
    : local.saveSuggestion(input);
}
