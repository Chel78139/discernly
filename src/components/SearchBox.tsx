"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/data";

export function SearchBox({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`,
          { signal: controller.signal },
        );
        const data = await res.json();
        setSuggestions(data.results ?? []);
      } catch {
        // ignore aborted/failed fetches
      }
    }, 150);
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function goToProduct(slug: string) {
    setShowSuggestions(false);
    router.push(`/product/${slug}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    if (suggestions.length > 0) {
      goToProduct(suggestions[0].slug);
    } else {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  }

  return (
    <div ref={containerRef} className="relative max-w-[600px] mt-10">
      <form onSubmit={handleSubmit} className="search-rig flex gap-2 rounded-md p-2" style={{ background: "var(--parchment)" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder='Try "Method body wash" or "Arm & Hammer baking soda"'
          aria-label="Search for a product"
          className="flex-1 border-none bg-transparent outline-none px-3.5 py-3 text-base"
          style={{ color: "var(--ink)" }}
        />
        <button className="btn-copper" type="submit">
          Find a swap
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul
          className="absolute left-0 right-0 mt-1 rounded-md overflow-hidden z-10 shadow-lg"
          style={{ background: "var(--parchment)", border: "1px solid var(--line)" }}
        >
          {suggestions.map((product) => (
            <li key={product.id}>
              <button
                type="button"
                onClick={() => goToProduct(product.slug)}
                className="w-full text-left px-4 py-3 hover:bg-[rgba(0,0,0,0.05)] text-sm"
                style={{ color: "var(--ink)" }}
              >
                <span className="font-medium">{product.brand}</span> —{" "}
                {product.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
