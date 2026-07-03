import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SearchBox } from "@/components/SearchBox";
import { CategoryGrid } from "@/components/CategoryGrid";
import { AdSlot } from "@/components/AdSlot";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";
import { getCategories } from "@/lib/db";

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="wrap max-w-[1080px] mx-auto px-6 w-full">
      <SiteNav />

      <header className="pt-[72px] pb-14">
        <span
          className="eyebrow block font-mono text-[0.72rem] tracking-[0.14em] uppercase mb-[18px]"
          style={{ color: "var(--gold)" }}
        >
          Know what&apos;s in your cart, before you buy it
        </span>
        <h1
          className="font-serif font-medium max-w-[760px]"
          style={{ fontSize: "clamp(2.1rem, 5vw, 3.4rem)", lineHeight: 1.08 }}
        >
          Find the story behind{" "}
          <em
            className="not-italic italic"
            style={{ color: "var(--gold)", fontWeight: 400 }}
          >
            what you already use
          </em>
          , and a Christian-made swap if you want one.
        </h1>
        <p
          className="mt-[18px] max-w-[520px] text-[1.05rem]"
          style={{ color: "var(--sage)" }}
        >
          Type a product. We show you what we found in the brand&apos;s own
          words, sourced and rated for confidence, and a verified alternative
          if one exists.
        </p>

        <SearchBox />

        <div className="mt-[54px] max-w-[720px]">
          <span
            className="block font-mono text-[0.72rem] tracking-[0.08em] uppercase mb-2.5"
            style={{ color: "var(--sage)" }}
          >
            Example result
          </span>
          <div className="ticket">
            <div className="ticket-side from">
              <span className="ticket-kicker">What you searched</span>
              <div className="ticket-product strike">
                Method — Shower Readings Body Wash
              </div>
              <p className="ticket-note">
                Packaging structured as a tarot-style &quot;deck&quot; of
                fortune cards; QR code for a personalized &quot;shower
                reading.&quot; Company&apos;s own copy: &quot;Are you ready
                to hear your fortune?&quot;
              </p>
              <ConfidenceBadge tier={1} detail="company's own marketing" />
            </div>
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
            <div className="ticket-side to">
              <span className="ticket-kicker">Verified swap</span>
              <div className="ticket-product">
                Boll Weevil Soap Co. — Body Wash
              </div>
              <p className="ticket-note">
                Self-identifies as Christian-owned on their own About page,
                cites Colossians 3:17. Confirmed Amazon storefront.
              </p>
              <ConfidenceBadge tier={2} detail="self-stated by company" />
            </div>
            <div className="cta-row full">
              <span className="source-link">View 2 sources →</span>
              <Link className="buy-btn" href="/product/method-shower-readings">
                See the full swap →
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section
        id="trust"
        className="mt-20 py-9 border-t border-b border-[rgba(242,232,216,0.12)] grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div>
          <span
            className="font-mono text-[0.78rem] tracking-[0.08em]"
            style={{ color: "var(--gold)" }}
          >
            01
          </span>
          <h3 className="font-serif font-medium text-[1.05rem] mt-2 mb-1.5">
            Pulled from the brand&apos;s own words
          </h3>
          <p className="text-[0.88rem]" style={{ color: "var(--sage)" }}>
            Every claim comes from a company&apos;s own packaging, marketing
            copy, or founder statements, not a stranger&apos;s blog post.
          </p>
        </div>
        <div>
          <span
            className="font-mono text-[0.78rem] tracking-[0.08em]"
            style={{ color: "var(--gold)" }}
          >
            02
          </span>
          <h3 className="font-serif font-medium text-[1.05rem] mt-2 mb-1.5">
            Rated for confidence
          </h3>
          <p className="text-[0.88rem]" style={{ color: "var(--sage)" }}>
            Documented fact, contested commentary, or unverified. We say
            which, and we leave it blank rather than guess.
          </p>
        </div>
        <div>
          <span
            className="font-mono text-[0.78rem] tracking-[0.08em]"
            style={{ color: "var(--gold)" }}
          >
            03
          </span>
          <h3 className="font-serif font-medium text-[1.05rem] mt-2 mb-1.5">
            Always cited
          </h3>
          <p className="text-[0.88rem]" style={{ color: "var(--sage)" }}>
            Every entry links to its sources. Check our work any time.
          </p>
        </div>
      </section>

      <section id="browse" className="py-[72px]">
        <h2 className="font-serif font-medium text-[1.7rem] mb-1.5">
          Browse by category
        </h2>
        <p className="mb-[34px]" style={{ color: "var(--sage)" }}>
          Looking to swap a whole category at once? Start here.
        </p>
        <CategoryGrid categories={categories} />
      </section>

      <div className="mb-[72px]">
        <AdSlot />
      </div>

      <SiteFooter />
    </div>
  );
}
