import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SearchBox } from "@/components/SearchBox";
import { AdSlot } from "@/components/AdSlot";
import { ResultTicket } from "@/components/ResultTicket";
import { AlsoConsider } from "@/components/AlsoConsider";
import { MobileHome } from "@/components/mobile/MobileHome";
import { getProductResult, getCategories } from "@/lib/db";
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
  const categories = await getCategories();

  const affiliateUrl = result.primaryAlternative
    ? buildAffiliateUrl(result.primaryAlternative)
    : null;

  return (
    <div className="wrap max-w-[1080px] mx-auto px-6 w-full">
      {/* Real navigation (Safari back/forward, bfcache restore, a shared
          link, a refresh) can land here directly — this route needs its
          own mobile shell, not just "/", or those cases fall through to
          the desktop-only tree below regardless of viewport. */}
      <MobileHome
        initialLocked={locked}
        categories={categories}
        initialView="result"
        initialResult={result}
      />

      <div className="hidden md:block">
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

      <AlsoConsider
        alternatives={result.secondaryAlternatives}
        locked={locked}
        category={result.product.category}
      />

      <div className="my-16">
        <AdSlot />
      </div>

      <SiteFooter />
      </div>
    </div>
  );
}
