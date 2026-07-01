import type { Alternative } from "@/types/data";

export function buildAffiliateUrl(alternative: Alternative): string {
  const tag = process.env.AMAZON_ASSOCIATE_TAG;

  if (alternative.affiliateType === "amazon") {
    if (alternative.affiliateUrl) {
      try {
        const url = new URL(alternative.affiliateUrl);
        if (tag) url.searchParams.set("tag", tag);
        return url.toString();
      } catch {
        return alternative.affiliateUrl;
      }
    }
    // No ASIN wired yet — fall back to an Amazon search so the CTA still works.
    const query = encodeURIComponent(`${alternative.brand} ${alternative.name}`);
    return `https://www.amazon.com/s?k=${query}${tag ? `&tag=${tag}` : ""}`;
  }

  return alternative.affiliateUrl ?? "#";
}
