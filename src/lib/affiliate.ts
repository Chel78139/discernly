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

export function buildAffiliateUrl(alternative: Alternative): string {
  if (alternative.affiliateType === "amazon") {
    if (alternative.affiliateUrl) {
      return tagAmazonUrl(alternative.affiliateUrl);
    }
    // No ASIN wired yet — fall back to an Amazon search so the CTA still works.
    const query = encodeURIComponent(`${alternative.brand} ${alternative.name}`);
    return `https://www.amazon.com/s?k=${query}&tag=${AMAZON_ASSOCIATE_TAG}`;
  }

  return alternative.affiliateUrl ?? "#";
}

// "Get this instead" tested as ambiguous — people read it as "show me another
// option" rather than "buy this." Naming the destination converts better.
export function buildAffiliateLabel(alternative: Alternative): string {
  return alternative.affiliateType === "amazon"
    ? "Shop on Amazon →"
    : `Shop ${alternative.brand} →`;
}
