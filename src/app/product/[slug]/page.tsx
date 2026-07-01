import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SearchBox } from "@/components/SearchBox";
import { AdSlot } from "@/components/AdSlot";
import { ResultTicket } from "@/components/ResultTicket";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";
import { SourceLinks } from "@/components/SourceLinks";
import { getProductResult } from "@/lib/db";
import { buildAffiliateUrl } from "@/lib/affiliate";
import { UNLOCK_COOKIE } from "@/lib/unlock";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getProductResult(slug);
  if (!result) notFound();

  const cookieStore = await cookies();
  const locked = cookieStore.get(UNLOCK_COOKIE)?.value !== "1";

  const affiliateUrl = result.primaryAlternative
    ? buildAffiliateUrl(result.primaryAlternative)
    : null;

  return (
    <div className="wrap max-w-[1080px] mx-auto px-6 w-full">
      <SiteNav />

      <div className="pt-14">
        <SearchBox initialQuery={`${result.product.brand} ${result.product.name}`} />
      </div>

      <div className="mt-12 max-w-[720px]">
        <ResultTicket
          product={result.product}
          association={result.association}
          alternative={result.primaryAlternative}
          affiliateUrl={affiliateUrl}
          locked={locked && Boolean(result.primaryAlternative)}
        />
      </div>

      <p className="mt-6">
        <Link href="/" className="source-link">
          Not the right product? Search again →
        </Link>
      </p>

      {result.secondaryAlternatives.length > 0 && (
        <section className="mt-16 max-w-[720px]">
          <h2 className="font-serif font-medium text-[1.4rem] mb-4">
            Other Christian-made options
          </h2>
          <div className="space-y-4">
            {result.secondaryAlternatives.map((alt) => (
              <div
                key={alt.id}
                className="rounded-lg p-5"
                style={{ background: "var(--parchment)", color: "var(--ink)" }}
              >
                <div className="ticket-product">
                  {alt.brand} — {alt.name}
                </div>
                <p className="ticket-note">{alt.basisText}</p>
                <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                  <ConfidenceBadge
                    tier={alt.basisConfidence}
                    detail="self-stated by company"
                  />
                  <SourceLinks
                    sections={[{ title: "Sources", urls: alt.basisSources }]}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="my-16">
        <AdSlot />
      </div>

      <SiteFooter />
    </div>
  );
}
