import type { Alternative } from "@/types/data";

// Not a secret — affiliate tags are meant to appear in every outbound URL.
// Hardcoded as the default so it works without any Vercel env var setup;
// AMAZON_ASSOCIATE_TAG can still override it if the tag ever changes.
export const AMAZON_ASSOCIATE_TAG =
  process.env.AMAZON_ASSOCIATE_TAG || "discernly-20";

function isAmazonUrl(url: string): boolean {
  try {
    return /(^|\.)amazon\.[a-z.]+$/i.test(new URL(url).hostname);
  } catch {
    return false;
  }
}

// Applies the affiliate tag to any Amazon URL, not just the primary "buy"
// links — e.g. a source citation that happens to link to an Amazon listing
// should still carry the tag since a click there can still earn commission.
export function tagAmazonUrl(url: string): string {
  if (!isAmazonUrl(url)) return url;
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("tag", AMAZON_ASSOCIATE_TAG);
    return parsed.toString();
  } catch {
    return url;
  }
}

// Returns null when there's no working destination yet — an Amazon
// alternative with no confirmed ASIN gets a clearly-marked pending state in
// the UI rather than a guessed or search-fallback link. A wrong product
// link is worse than no link.
export function buildAffiliateUrl(alternative: Alternative): string | null {
  if (alternative.affiliateType === "amazon") {
    if (!alternative.asin) return null;
    return tagAmazonUrl(`https://www.amazon.com/dp/${alternative.asin}`);
  }

  return alternative.affiliateUrl ?? null;
}

// "Get this instead" tested as ambiguous — people read it as "show me another
// option" rather than "buy this." Naming the destination converts better.
export function buildAffiliateLabel(alternative: Alternative): string {
  return alternative.affiliateType === "amazon"
    ? "Shop on Amazon →"
    : `Shop ${alternative.brand} →`;
}
