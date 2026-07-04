import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import {
  alternatives,
  associations,
  productAlternativeMap,
  products,
} from "@/data/seed";
import type {
  Alternative,
  EmailSignup,
  Product,
  ProductResult,
  Suggestion,
} from "@/types/data";

const RUNTIME_DIR = path.join(process.cwd(), "data", "runtime");
const SIGNUPS_FILE = path.join(RUNTIME_DIR, "email-signups.json");
const SUGGESTIONS_FILE = path.join(RUNTIME_DIR, "suggestions.json");

function readJsonFile<T>(file: string): T[] {
  if (!fs.existsSync(file)) return [];
  const raw = fs.readFileSync(file, "utf-8").trim();
  if (!raw) return [];
  return JSON.parse(raw) as T[];
}

function writeJsonFile<T>(file: string, data: T[]) {
  fs.mkdirSync(RUNTIME_DIR, { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | null {
  return products.find((p) => p.slug === slug) ?? null;
}

export function searchProducts(query: string, limit = 8): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.aliases?.some((a) => a.toLowerCase().includes(q)),
    )
    .slice(0, limit);
}

export function getCategories(): { category: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of products) {
    counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  }
  return Array.from(counts.entries()).map(([category, count]) => ({
    category,
    count,
  }));
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

function alternativeById(id: string): Alternative | undefined {
  return alternatives.find((a) => a.id === id);
}

export function getProductResult(slug: string): ProductResult | null {
  const product = getProductBySlug(slug);
  if (!product) return null;

  const association = associations.find((a) => a.productId === product.id);
  if (!association) return null;

  const mapEntries = productAlternativeMap.filter(
    (m) => m.productId === product.id,
  );

  const primaryEntry = mapEntries.find((m) => m.rank === "primary");
  const secondaryEntries = mapEntries.filter((m) => m.rank === "secondary");

  const primaryAlternative = primaryEntry
    ? alternativeById(primaryEntry.alternativeId)
    : undefined;

  const secondaryAlternatives = secondaryEntries
    .map((m) => alternativeById(m.alternativeId))
    .filter((a): a is Alternative => Boolean(a));

  return {
    product,
    association,
    primaryAlternative: primaryAlternative
      ? { ...primaryAlternative, rank: "primary" }
      : null,
    secondaryAlternatives: secondaryAlternatives.map((a) => ({
      ...a,
      rank: "secondary",
    })),
  };
}

export async function saveEmailSignup(
  email: string,
  sourceProductSlug?: string,
): Promise<void> {
  const signups = readJsonFile<EmailSignup>(SIGNUPS_FILE);
  if (signups.some((s) => s.email.toLowerCase() === email.toLowerCase())) {
    return;
  }
  signups.push({
    id: randomUUID(),
    email,
    sourceProductSlug,
    createdAt: new Date().toISOString(),
  });
  writeJsonFile(SIGNUPS_FILE, signups);
}

export async function saveSuggestion(
  input: Omit<Suggestion, "id" | "status" | "createdAt">,
): Promise<void> {
  const suggestions = readJsonFile<Suggestion>(SUGGESTIONS_FILE);
  suggestions.push({
    ...input,
    id: randomUUID(),
    status: "pending",
    createdAt: new Date().toISOString(),
  });
  writeJsonFile(SUGGESTIONS_FILE, suggestions);
}

export async function getSuggestions(): Promise<Suggestion[]> {
  return readJsonFile<Suggestion>(SUGGESTIONS_FILE);
}
