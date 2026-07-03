import Link from "next/link";
import { redirect } from "next/navigation";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SearchBox } from "@/components/SearchBox";
import { searchProducts } from "@/lib/db";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = await searchProducts(q, 20);

  if (results.length === 1) {
    redirect(`/product/${results[0].slug}`);
  }

  return (
    <div className="wrap max-w-[1080px] mx-auto px-6 w-full">
      <SiteNav />

      <div className="pt-14">
        <SearchBox initialQuery={q} />
      </div>

      <div className="mt-12 max-w-[720px]">
        {results.length === 0 ? (
          <div
            className="rounded-lg p-6"
            style={{ background: "var(--parchment)", color: "var(--ink)" }}
          >
            <p className="font-serif text-lg mb-2">
              We don&apos;t have &quot;{q}&quot; in the database yet.
            </p>
            <p className="text-sm opacity-80 mb-4">
              We only publish a claim once it&apos;s properly sourced — a
              wrong answer is worse than no answer. Know something we should
              look into?
            </p>
            <Link href={`/suggest?product=${encodeURIComponent(q)}`} className="buy-btn inline-block">
              Suggest this product →
            </Link>
          </div>
        ) : (
          <>
            <h1 className="font-serif text-xl mb-4">
              Products matching &quot;{q}&quot;
            </h1>
            <ul className="space-y-3">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/product/${product.slug}`}
                    className="block rounded-lg p-4"
                    style={{ background: "var(--parchment)", color: "var(--ink)" }}
                  >
                    <span className="font-medium">{product.brand}</span> —{" "}
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="my-16" />

      <SiteFooter />
    </div>
  );
}
