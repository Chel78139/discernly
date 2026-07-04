import { buildAffiliateLabel } from "@/lib/affiliate";
import type { Alternative } from "@/types/data";

// Three states: paywall-locked, working link, or Amazon-link-pending (no
// confirmed ASIN yet). Shared between the main ticket CTA and the
// secondary-alternatives list so the same rules apply everywhere.
export function ShopButton({
  alternative,
  affiliateUrl,
  locked,
}: {
  alternative: Alternative;
  affiliateUrl: string | null;
  locked: boolean;
}) {
  if (locked) {
    return (
      <div className="flex flex-col items-end gap-1">
        <button className="buy-btn" disabled>
          {buildAffiliateLabel(alternative)}
        </button>
        <span className="text-[0.68rem]" style={{ color: "#8a7a5f" }}>
          Unlock above to activate
        </span>
      </div>
    );
  }

  if (!affiliateUrl) {
    return (
      <div className="flex flex-col items-end gap-1">
        <button className="buy-btn" disabled>
          {buildAffiliateLabel(alternative)}
        </button>
        <span className="text-[0.68rem]" style={{ color: "#8a7a5f" }}>
          Amazon link coming soon
        </span>
      </div>
    );
  }

  return (
    <a
      className="buy-btn"
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
    >
      {buildAffiliateLabel(alternative)}
    </a>
  );
}
