import Link from "next/link";

export function CategoryGrid({
  categories,
}: {
  categories: { category: string; count: number }[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
      {categories.map(({ category, count }) => (
        <Link
          key={category}
          href={`/category/${encodeURIComponent(category)}`}
          className="cat-card"
        >
          <span
            className="block font-mono text-[0.7rem]"
            style={{ color: "var(--gold)" }}
          >
            {count} {count === 1 ? "entry" : "entries"}
          </span>
          <h4 className="font-serif text-[1.05rem] mt-2" style={{ color: "var(--parchment)" }}>
            {category}
          </h4>
        </Link>
      ))}
    </div>
  );
}
