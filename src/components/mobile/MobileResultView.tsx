"use client";

import { useState } from "react";
import { CleanSwapNote } from "@/components/CleanSwapNote";
import { ShopButton } from "@/components/ShopButton";
import { tagAmazonUrl, buildAffiliateUrl } from "@/lib/affiliate";
import type { Product, ProductResult } from "@/types/data";

function MobileSourceLinks({
  sections,
}: {
  sections: { title: string; urls: string[] }[];
}) {
  const [open, setOpen] = useState(false);
  const total = sections.reduce((sum, s) => sum + s.urls.length, 0);
  if (total === 0) return null;

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-[0.65rem] underline"
        style={{ color: "var(--sage)" }}
      >
        View {total} source{total === 1 ? "" : "s"} →
      </button>
    );
  }

  return (
    <div className="text-left w-full">
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="text-[0.65rem] underline mb-2 inline-block"
        style={{ color: "var(--sage)" }}
      >
        Hide sources
      </button>
      <div className="space-y-2">
        {sections
          .filter((s) => s.urls.length > 0)
          .map((section) => (
            <div key={section.title}>
              <p
                className="text-[0.6rem] uppercase tracking-wider mb-1"
                style={{ color: "var(--sage)", opacity: 0.7 }}
              >
                {section.title}
              </p>
              <ul className="text-[0.72rem] space-y-1">
                {section.urls.map((url) => (
                  <li key={url}>
                    <a
                      href={tagAmazonUrl(url)}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="underline break-all"
                      style={{ color: "var(--sage)" }}
                    >
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}

export type MobileResultKind = "loading" | "detail" | "picklist" | "notfound";

function MobileConfidenceBadge({
  tier,
  detail,
}: {
  tier: 1 | 2;
  detail: string;
}) {
  return (
    <span className={`m-verified-badge${tier === 2 ? " contested" : ""}`}>
      <span className="m-verified-dot" />
      {detail}
    </span>
  );
}

export function MobileResultView({
  kind,
  query,
  result,
  pickList,
  locked,
  onPick,
  onOpenSheet,
  onSuggest,
}: {
  kind: MobileResultKind;
  query: string;
  result: ProductResult | null;
  pickList: Product[];
  locked: boolean;
  onPick: (slug: string) => void;
  onOpenSheet: () => void;
  onSuggest: () => void;
}) {
  if (kind === "loading") {
    return (
      <div className="px-5 py-10 text-center" style={{ color: "var(--sage)" }}>
        Searching…
      </div>
    );
  }

  if (kind === "notfound") {
    return (
      <div className="px-5">
        <div className="m-notfound-card">
          <p className="font-serif text-lg mb-2" style={{ color: "#fff" }}>
            We don&apos;t have &quot;{query}&quot; in the database yet.
          </p>
          <p className="text-sm mb-4" style={{ color: "var(--sage)" }}>
            We only publish a claim once it&apos;s properly sourced — a wrong
            answer is worse than no answer.
          </p>
          <button
            type="button"
            onClick={onSuggest}
            className="m-buy-btn"
            style={{ boxShadow: "none" }}
          >
            Suggest this product →
          </button>
        </div>
      </div>
    );
  }

  if (kind === "picklist") {
    return (
      <div className="px-5 space-y-3">
        <p className="text-sm mb-1" style={{ color: "var(--sage)" }}>
          A few products match &quot;{query}&quot;:
        </p>
        {pickList.map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() => onPick(product.slug)}
            className="m-picklist-item block w-full text-left"
          >
            <span className="font-serif text-base" style={{ color: "var(--parchment)" }}>
              {product.brand} — {product.name}
            </span>
          </button>
        ))}
      </div>
    );
  }

  if (!result) return null;

  const { product, association, primaryAlternative, secondaryAlternatives } = result;

  return (
    <div className="px-5">
      {/* FROM CARD */}
      <div className="m-from-card">
        <div className="m-img from">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.imageUrl} alt={`${product.brand} ${product.name}`} />
        </div>
        <div className="min-w-0 flex-1">
          <div
            className="font-mono text-[0.6rem] uppercase tracking-[0.1em] mb-1"
            style={{ color: "var(--sage)" }}
          >
            What you searched
          </div>
          <div className="m-from-name">
            {product.brand} — {product.name}
          </div>
          <p className="m-claim">{association.claimText}</p>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="m-divider">
        <div className="m-divider-line" />
        <div className="m-divider-icon">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
        <span className="m-divider-label">Your swap</span>
        <div className="m-divider-line" />
      </div>

      {/* TO CARD */}
      {primaryAlternative ? (
        <div
          className="m-to-card"
          onClick={locked ? onOpenSheet : undefined}
          role={locked ? "button" : undefined}
          tabIndex={locked ? 0 : undefined}
        >
          {locked && (
            <div className="m-blur-overlay">
              <div className="m-lock-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>
              <div className="m-lock-label">Unlock your swap</div>
              <div className="m-lock-sub">Free forever, no credit card</div>
            </div>
          )}
          <div className="m-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={primaryAlternative.imageUrl}
              alt={`${primaryAlternative.brand} ${primaryAlternative.name}`}
            />
          </div>
          <div className="min-w-0 flex-1">
            <div
              className="font-mono text-[0.6rem] uppercase tracking-[0.1em] mb-1"
              style={{ color: "var(--gold)" }}
            >
              Verified swap
            </div>
            <div className={`m-to-name${locked ? " blurred" : ""}`}>
              {primaryAlternative.brand} — {primaryAlternative.name}
            </div>
            <p className={`m-basis${locked ? " blurred" : ""}`}>
              {primaryAlternative.basisText}
            </p>
            {primaryAlternative.swapType === "clean" && !locked && (
              <CleanSwapNote />
            )}
            <div className={locked ? "blurred" : ""}>
              <MobileConfidenceBadge
                tier={primaryAlternative.basisConfidence}
                detail="Self-stated by company"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="m-to-card">
          <p className="m-claim">
            We haven&apos;t found a Christian-made alternative for this one
            yet. Know of one?{" "}
            <button
              type="button"
              onClick={onSuggest}
              className="underline"
              style={{ color: "var(--gold)" }}
            >
              Suggest it
            </button>
            .
          </p>
        </div>
      )}

      {/* SOURCES */}
      <div className="m-sources-row">
        <MobileSourceLinks
          sections={[
            { title: "About the claim above", urls: association.sourceUrls },
            ...(primaryAlternative
              ? [{ title: "About the swap", urls: primaryAlternative.basisSources }]
              : []),
          ]}
        />
      </div>

      {/* SECONDARY OPTIONS */}
      {secondaryAlternatives.length > 0 && (
        <div className="mt-8">
          <p
            className="font-mono text-[0.65rem] uppercase tracking-[0.1em] mb-3"
            style={{ color: "var(--sage)" }}
          >
            Other Christian-made options
          </p>
          <div className="space-y-3">
            {secondaryAlternatives.map((alt) => (
              <div key={alt.id} className="m-secondary-card flex gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={alt.imageUrl}
                  alt={`${alt.brand} ${alt.name}`}
                  className="flex-shrink-0 rounded-lg"
                  style={{ width: 64, height: 64, objectFit: "cover" }}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-serif text-base mb-1" style={{ color: "var(--parchment)" }}>
                    {alt.brand} — {alt.name}
                  </div>
                  <p className="m-claim mb-2">{alt.basisText}</p>
                  {alt.swapType === "clean" && <CleanSwapNote />}
                  <div className="flex items-center justify-between flex-wrap gap-3 mt-2">
                    <MobileConfidenceBadge tier={alt.basisConfidence} detail="Self-stated by company" />
                    <MobileSourceLinks sections={[{ title: "Sources", urls: alt.basisSources }]} />
                  </div>
                  <div className="mt-3 flex justify-end">
                    <ShopButton
                      alternative={alt}
                      affiliateUrl={buildAffiliateUrl(alt)}
                      locked={locked}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
