"use client";

import Link from "next/link";

function CategoryCardContent({
  category,
  count,
}: {
  category: string;
  count: number;
}) {
  return (
    <>
      <span className="block font-mono text-[0.7rem]" style={{ color: "var(--gold)" }}>
        {count} {count === 1 ? "entry" : "entries"}
      </span>
      <h4 className="font-serif text-[1.05rem] mt-2" style={{ color: "var(--parchment)" }}>
        {category}
      </h4>
    </>
  );
}

export function CategoryGrid({
  categories,
  onSelect,
}: {
  categories: { category: string; count: number }[];
  // When provided, categories are selected inline instead of navigating —
  // used by the mobile app shell so browsing never leaves the SPA state.
  onSelect?: (category: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
      {categories.map(({ category, count }) =>
        onSelect ? (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            className="cat-card text-left"
          >
            <CategoryCardContent category={category} count={count} />
          </button>
        ) : (
          <Link
            key={category}
            href={`/category/${encodeURIComponent(category)}`}
            className="cat-card"
          >
            <CategoryCardContent category={category} count={count} />
          </Link>
        ),
      )}
    </div>
  );
}
