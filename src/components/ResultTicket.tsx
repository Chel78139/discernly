import { ConfidenceBadge } from "./ConfidenceBadge";
import { SourceLinks } from "./SourceLinks";
import { EmailUnlockForm } from "./EmailUnlockForm";
import type { Alternative, Association, Product } from "@/types/data";

function ArrowDivider() {
  return (
    <div className="ticket-divider" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#F2E8D8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </div>
  );
}

export function ResultTicket({
  product,
  association,
  alternative,
  affiliateUrl,
  locked,
}: {
  product: Product;
  association: Association;
  alternative: (Alternative & { rank: "primary" | "secondary" }) | null;
  affiliateUrl: string | null;
  locked: boolean;
}) {
  return (
    <div className="ticket">
      <div className="ticket-side from">
        <span className="ticket-kicker">What you searched</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={`${product.brand} ${product.name}`}
          className="ticket-image from"
        />
        <div className="ticket-product strike">
          {product.brand} — {product.name}
        </div>
        <p className="ticket-note">{association.claimText}</p>
        <ConfidenceBadge
          tier={association.confidenceTier}
          detail="company's own marketing"
        />
      </div>

      <ArrowDivider />

      <div className="ticket-side to">
        <span className="ticket-kicker">
          {alternative ? "Verified swap" : "No swap yet"}
        </span>

        {alternative ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={alternative.imageUrl}
              alt={`${alternative.brand} ${alternative.name}`}
              className={`ticket-image${locked ? " paywall-blurred" : " paywall-revealed"}`}
            />
            <div className="ticket-product">
              {alternative.brand} — {alternative.name}
            </div>
            <p className="ticket-note">{alternative.basisText}</p>
            <ConfidenceBadge
              tier={alternative.basisConfidence}
              detail="self-stated by company"
            />
          </>
        ) : (
          <p className="ticket-note">
            We haven&apos;t found a Christian-made alternative for this one yet.
            Know of one?{" "}
            <a href="/suggest" className="underline">
              Suggest it
            </a>
            .
          </p>
        )}

        {alternative && locked && (
          <div className="paywall-overlay">
            <p className="font-serif text-lg" style={{ color: "var(--parchment)" }}>
              Unlock your swap — free forever
            </p>
            <p className="text-sm" style={{ color: "var(--sage)" }}>
              Enter your email once. No credit card. No subscription.
            </p>
            <EmailUnlockForm sourceProductSlug={product.slug} />
            <p className="text-[0.68rem]" style={{ color: "var(--sage)" }}>
              By continuing you agree to our{" "}
              <a href="/terms" className="underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        )}
      </div>

      <div className="cta-row full">
        <SourceLinks
          sections={[
            { title: "About the claim above", urls: association.sourceUrls },
            ...(alternative
              ? [{ title: "About the swap", urls: alternative.basisSources }]
              : []),
          ]}
        />
        {alternative &&
          (locked ? (
            <button className="buy-btn" disabled>
              Get this instead →
            </button>
          ) : (
            <a
              className="buy-btn"
              href={affiliateUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer sponsored"
            >
              Get this instead →
            </a>
          ))}
      </div>
    </div>
  );
}
