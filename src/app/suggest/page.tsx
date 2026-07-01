import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SuggestForm } from "@/components/SuggestForm";

export default async function SuggestPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product = "" } = await searchParams;

  return (
    <div className="wrap max-w-[1080px] mx-auto px-6 w-full">
      <SiteNav />

      <div className="max-w-[520px] mx-auto pt-16 pb-24">
        <h1 className="font-serif font-medium text-[1.9rem] text-center mb-2">
          Suggest a product
        </h1>
        <p className="text-center mb-8" style={{ color: "var(--sage)" }}>
          Know a brand&apos;s belief association or a Christian-made
          alternative we&apos;re missing? Tell us — every submission goes to a
          private review queue and is never auto-published.
        </p>
        <SuggestForm initialProductName={product} />
      </div>

      <SiteFooter />
    </div>
  );
}
