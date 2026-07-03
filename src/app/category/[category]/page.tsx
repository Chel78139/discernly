import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { AdSlot } from "@/components/AdSlot";
import { getProductsByCategory } from "@/lib/db";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: rawCategory } = await params;
  const category = decodeURIComponent(rawCategory);
  const products = await getProductsByCategory(category);

  if (products.length === 0) notFound();

  return (
    <div className="wrap max-w-[1080px] mx-auto px-6 w-full">
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
  );
}
