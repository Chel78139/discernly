import { buildAffiliateUrl, buildAffiliateLabel } from "@/lib/affiliate";
import type { Alternative } from "@/types/data";

export function MobileStickyCta({
  alternative,
  locked,
  onOpenSheet,
}: {
  alternative: Alternative | null;
  locked: boolean;
  onOpenSheet: () => void;
}) {
  if (!alternative) return null;

  const affiliateUrl = buildAffiliateUrl(alternative);

  if (locked) {
    return (
      <div className="m-sticky-cta">
        <button className="m-buy-btn" onClick={onOpenSheet}>
          Get this instead
          <ArrowIcon />
        </button>
      </div>
    );
  }

  if (!affiliateUrl) {
    return (
      <div className="m-sticky-cta">
        <button className="m-buy-btn" disabled>
          Amazon link coming soon
        </button>
      </div>
    );
  }

  return (
    <div className="m-sticky-cta">
      <a
        className="m-buy-btn"
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
      >
        {buildAffiliateLabel(alternative)}
        <ArrowIcon />
      </a>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
