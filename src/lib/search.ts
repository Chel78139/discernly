type Searchable = { name: string; brand: string; aliases?: string[] };

// Two passes: a fast whole-query substring match (covers most cases,
// including full alias matches), then a token-based fallback so queries
// like "nyx hd" or "hd nyx" still match "nyx hd foundation" regardless
// of word order or which alias contains which word. This is what makes
// search "fuzzy" without needing a real fuzzy-distance algorithm — every
// word in what the user typed just has to appear somewhere in the
// product's combined name/brand/alias text.
export function productMatchesQuery(product: Searchable, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return false;

  const haystack = [product.name, product.brand, ...(product.aliases ?? [])]
    .join(" ")
    .toLowerCase();

  if (haystack.includes(q)) return true;

  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length < 2) return false;
  return tokens.every((token) => haystack.includes(token));
}

export function searchProductList<T extends Searchable>(
  items: T[],
  query: string,
  limit = 8,
): T[] {
  return items.filter((item) => productMatchesQuery(item, query)).slice(0, limit);
}
