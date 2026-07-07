import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { AdSlot } from "@/components/AdSlot";
import { MobileHome } from "@/components/mobile/MobileHome";
import { getProductsByCategory, getCategories } from "@/lib/db";
import { UNLOCK_COOKIE } from "@/lib/unlock";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: rawCategory } = await params;
  const category = decodeURIComponent(rawCategory);
  const products = await getProductsByCategory(category);

  if (products.length === 0) notFound();

  const cookieStore = await cookies();
  const locked = cookieStore.get(UNLOCK_COOKIE)?.value !== "1";
  const categories = await getCategories();

  return (
    <div className="wrap max-w-[1080px] mx-auto px-6 w-full">
      {/* Real navigation (Safari back/forward, bfcache restore, a shared
          link, a refresh) can land here directly — this route needs its
          own mobile shell, not just "/", or those cases fall through to
          the desktop-only tree below regardless of viewport. */}
      <MobileHome
        initialLocked={locked}
        categories={categories}
        initialView="category"
        initialCategoryName={category}
        initialCategoryProducts={products}
      />

      <div className="hidden md:block">
      <SiteNav />

      <div className="pt-14 pb-8">
        <h1 className="font-serif font-medium text-[1.9rem]">{category}</h1>
        <p className="mt-2" style={{ color: "var(--sage)" }}>
          {products.length} entr{products.length === 1 ? "y" : "ies"} in this
          category.
        </p>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/product/${product.slug}`} className="cat-card">
              <span
                className="block font-mono text-[0.7rem]"
                style={{ color: "var(--gold)" }}
              >
                {product.brand}
              </span>
              <h4
                className="font-serif text-[1.05rem] mt-2"
                style={{ color: "var(--parchment)" }}
              >
                {product.name}
              </h4>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mb-16">
        <AdSlot />
      </div>

      <SiteFooter />
      </div>
    </div>
  );
}
