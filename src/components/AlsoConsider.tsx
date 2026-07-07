"use client";

import { useState } from "react";
import Link from "next/link";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";
import { SourceLinks } from "@/components/SourceLinks";
import { ShopButton } from "@/components/ShopButton";
import { CleanSwapNote } from "@/components/CleanSwapNote";
import { buildAffiliateUrl } from "@/lib/affiliate";
import type { Alternative } from "@/types/data";

// The result card stays clean forever: cap what's shown here regardless of
// how large the catalog gets. Anything beyond the cap links out to the
// category page instead of growing this section.
const CAP = 3;

export function AlsoConsider({
  alternatives,
  locked,
  category,
}: {
  alternatives: (Alternative & { rank: "secondary" })[];
  locked: boolean;
  category: string;
}) {
  const [open, setOpen] = useState(false);
  if (alternatives.length === 0) return null;

  const shown = alternatives.slice(0, CAP);
  const overflow = alternatives.length - shown.length;

  return (
    <section
      className="mt-10 max-w-[720px] pt-6"
      style={{ borderTop: "1px solid rgba(242, 232, 216, 0.15)" }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3"
        aria-expanded={open}
      >
        <span
          className="font-mono text-[0.7rem] uppercase tracking-[0.1em]"
          style={{ color: "var(--sage)" }}
        >
          Also consider
        </span>
        <span className="flex -space-x-2">
          {shown.map((alt) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={alt.id}
              src={alt.imageUrl}
              alt=""
              className="rounded-full"
              style={{
                width: 28,
                height: 28,
                objectFit: "cover",
                border: "2px solid var(--ground)",
              }}
            />
          ))}
        </span>
        <span className="text-sm underline" style={{ color: "var(--gold)" }}>
          {open ? "Hide" : "See options"}
        </span>
      </button>

      {open && (
        <div className="space-y-4 mt-5">
          {shown.map((alt) => (
            <div
              key={alt.id}
              className="rounded-lg p-5 flex gap-4"
              style={{ background: "var(--parchment)", color: "var(--ink)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={alt.imageUrl}
                alt={`${alt.brand} ${alt.name}`}
                className="flex-shrink-0 rounded-md"
                style={{ width: 88, height: 88, objectFit: "cover" }}
              />
              <div className="flex-1 min-w-0">
                <div className="ticket-product">
                  {alt.brand} — {alt.name}
                </div>
                <p className="ticket-note">{alt.basisText}</p>
                {alt.swapType === "clean" && <CleanSwapNote />}
                <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                  <ConfidenceBadge
                    tier={alt.basisConfidence}
                    detail="self-stated by company"
                  />
                  <SourceLinks
                    sections={[{ title: "Sources", urls: alt.basisSources }]}
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <ShopButton
                    alternative={alt}
                    affiliateUrl={buildAffiliateUrl(alt)}
                    locked={locked}
                  />
                </div>
              </div>
            </div>
          ))}
          {overflow > 0 && (
            <Link
              href={`/category/${encodeURIComponent(category)}`}
              className="source-link block"
            >
              +{overflow} more option{overflow === 1 ? "" : "s"} — browse{" "}
              {category} →
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
