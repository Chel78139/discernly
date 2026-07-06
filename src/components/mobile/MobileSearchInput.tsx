"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "@/types/data";

// Shared debounced-suggestions logic for both the home hero search bar
// and the compact search pill shown on the result/category views — so
// users can start a new search without navigating back home first.
export function MobileSearchInput({
  value,
  onChange,
  onSubmit,
  onPickSuggestion,
  variant,
  placeholder,
  autoFocus,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onPickSuggestion: (slug: string) => void;
  variant: "hero" | "pill";
  placeholder?: string;
  autoFocus?: boolean;
}) {
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      if (!value.trim()) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`, {
          signal: controller.signal,
        });
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
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function pick(slug: string) {
    setOpen(false);
    onPickSuggestion(slug);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setOpen(false);
      if (suggestions.length > 0) {
        pick(suggestions[0].slug);
      } else {
        onSubmit(value);
      }
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {variant === "hero" ? (
        <>
          <svg
            className="absolute left-[18px] top-1/2 -translate-y-1/2 pointer-events-none"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9a8c78"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            className="m-search-bar"
            type="text"
            value={value}
            autoFocus={autoFocus}
            onChange={(e) => {
              onChange(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoComplete="off"
          />
        </>
      ) : (
        <div
          className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm"
          style={{
            background: "var(--m-card)",
            border: "1px solid var(--m-card-border)",
            color: "var(--parchment)",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--sage)"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="flex-shrink-0"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={value}
            autoFocus={autoFocus}
            onChange={(e) => {
              onChange(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder ?? "Search again…"}
            autoComplete="off"
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-sm"
            style={{ color: "var(--parchment)" }}
          />
        </div>
      )}

      {open && suggestions.length > 0 && (
        <ul
          className="absolute left-0 right-0 mt-1.5 rounded-xl overflow-hidden z-30 shadow-lg"
          style={{ background: "var(--ground-mid)", border: "1px solid var(--m-card-border)" }}
        >
          {suggestions.map((product) => (
            <li key={product.id}>
              <button
                type="button"
                onClick={() => pick(product.slug)}
                className="w-full text-left px-4 py-3 text-sm"
                style={{ color: "var(--parchment)" }}
              >
                <span className="font-medium">{product.brand}</span> — {product.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
