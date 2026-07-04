"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo, Wordmark } from "@/components/Logo";
import { MobileResultView, type MobileResultKind } from "./MobileResultView";
import { MobileUnlockSheet } from "./MobileUnlockSheet";
import { MobileStickyCta } from "./MobileStickyCta";
import { MobileToast } from "./MobileToast";
import type { Product, ProductResult } from "@/types/data";

const POPULAR_CHIPS: { label: string; slug: string }[] = [
  { label: "Method body wash", slug: "method-shower-readings" },
  { label: "Starbucks", slug: "starbucks-coffee" },
  { label: "NYX makeup", slug: "nyx-makeup" },
  { label: "Arm & Hammer", slug: "arm-hammer-baking-soda" },
  { label: "Liquid Death", slug: "liquid-death-water" },
  { label: "7th Generation", slug: "seventh-generation-laundry" },
];

const RECENT_SWAPS: {
  fromLabel: string;
  toLabel: string;
  slug: string;
}[] = [
  { fromLabel: "Starbucks", toLabel: "BOLD3 Coffee", slug: "starbucks-coffee" },
  {
    fromLabel: "Method Shower Readings",
    toLabel: "Boll Weevil Soap",
    slug: "method-shower-readings",
  },
  { fromLabel: "NYX Cosmetics", toLabel: "Toups & Co.", slug: "nyx-makeup" },
];

export function MobileHome({ initialLocked }: { initialLocked: boolean }) {
  const router = useRouter();
  const [view, setView] = useState<"home" | "result">("home");
  const [query, setQuery] = useState("");
  const [resultKind, setResultKind] = useState<MobileResultKind>("loading");
  const [resultData, setResultData] = useState<ProductResult | null>(null);
  const [pickList, setPickList] = useState<Product[]>([]);
  const [locked, setLocked] = useState(initialLocked);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Swapping home/result content replaces large chunks of the DOM, which
  // triggers the browser's scroll-anchoring heuristics and can silently
  // drift the scroll position. Pin it explicitly across the whole
  // transition (including the intermediate "loading" render) and only
  // release the pin once we've settled on a final view.
  const pinnedScrollY = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (pinnedScrollY.current !== null) {
      window.scrollTo(0, pinnedScrollY.current);
      if (!(view === "result" && resultKind === "loading")) {
        pinnedScrollY.current = null;
      }
    }
  });

  async function loadProduct(slug: string) {
    pinnedScrollY.current = window.scrollY;
    setView("result");
    setResultKind("loading");
    try {
      const res = await fetch(`/api/product/${slug}`);
      if (!res.ok) {
        setResultKind("notfound");
        return;
      }
      const data = (await res.json()) as ProductResult;
      setResultData(data);
      setResultKind("detail");
    } catch {
      setResultKind("notfound");
    }
  }

  async function runSearch(raw: string) {
    const q = raw.trim();
    if (!q) return;
    pinnedScrollY.current = window.scrollY;
    setQuery(q);
    setView("result");
    setResultKind("loading");
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      const results: Product[] = data.results ?? [];
      if (results.length === 0) {
        setResultKind("notfound");
      } else if (results.length === 1) {
        await loadProduct(results[0].slug);
      } else {
        setPickList(results);
        setResultKind("picklist");
      }
    } catch {
      setResultKind("notfound");
    }
  }

  function goHome() {
    pinnedScrollY.current = window.scrollY;
    setView("home");
  }

  function handleUnlocked() {
    setLocked(false);
    setSheetOpen(false);
    setToastShow(true);
    setTimeout(() => setToastShow(false), 3500);
  }

  return (
    <div className="md:hidden min-h-screen flex flex-col px-5 pt-3 pb-28">
      <MobileToast show={toastShow} />

      {/* NAV */}
      <nav className="flex items-center justify-between py-2 mb-2 relative">
        <button
          type="button"
          onClick={goHome}
          className="flex items-center gap-2"
          aria-label="Go to home"
        >
          <Logo size={26} />
          <Wordmark />
        </button>
        <button
          type="button"
          className="m-nav-icon"
          aria-label="Menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F2E8D8"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {menuOpen && (
          <div
            className="absolute right-0 top-14 z-30 rounded-xl p-2 flex flex-col gap-1"
            style={{
              background: "var(--ground-mid)",
              border: "1px solid var(--m-card-border)",
              minWidth: 180,
            }}
          >
            <a
              href="#browse"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm"
              style={{ color: "var(--parchment)" }}
            >
              Browse
            </a>
            <a
              href="#trust"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm"
              style={{ color: "var(--parchment)" }}
            >
              How we verify
            </a>
            <Link
              href="/suggest"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm"
              style={{ color: "var(--parchment)" }}
            >
              Suggest a product
            </Link>
          </div>
        )}
      </nav>

      {view === "home" ? (
        <div className="flex flex-col">
          <h1 className="m-hero-headline">
            Know what&apos;s
            <br />
            <em>really</em> in
            <br />
            your cart.
          </h1>
          <p className="text-[0.88rem] mb-6 leading-relaxed" style={{ color: "var(--sage)" }}>
            Search any product. We show you what the brand says about itself,
            and a Christian-made swap.
          </p>

          <div className="relative mb-4">
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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") runSearch(query);
              }}
              placeholder='Try "Method body wash"'
              autoComplete="off"
            />
          </div>

          <p
            className="font-mono text-[0.65rem] uppercase tracking-[0.1em] mb-2.5"
            style={{ color: "var(--sage)" }}
          >
            Popular searches
          </p>
          <div className="flex gap-2 overflow-x-auto mb-7 -mx-5 px-5">
            {POPULAR_CHIPS.map((chip) => (
              <button
                key={chip.slug}
                type="button"
                className="m-chip"
                onClick={() => loadProduct(chip.slug)}
              >
                {chip.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-3">
            <span
              className="font-mono text-[0.65rem] uppercase tracking-[0.1em]"
              style={{ color: "var(--sage)" }}
            >
              Recently swapped
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto -mx-5 px-5">
            {RECENT_SWAPS.map((swap) => (
              <div
                key={swap.slug}
                className="m-swap-card"
                onClick={() => loadProduct(swap.slug)}
              >
                <div
                  className="font-mono text-[0.72rem] uppercase tracking-[0.06em] mb-1"
                  style={{ color: "var(--sage)" }}
                >
                  Flagged
                </div>
                <div
                  className="font-serif text-[0.95rem] mb-2 leading-tight"
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    textDecoration: "line-through",
                    textDecorationColor: "var(--copper)",
                  }}
                >
                  {swap.fromLabel}
                </div>
                <div className="text-[0.85rem] mb-1" style={{ color: "var(--gold)" }}>
                  ↓
                </div>
                <div
                  className="font-serif text-[0.95rem] leading-tight"
                  style={{ color: "var(--parchment)" }}
                >
                  {swap.toLabel}
                </div>
                <div className="m-swap-badge">
                  <span>●</span> Brand&apos;s own words
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col -mx-5">
          <div
            className="flex items-center gap-3 px-5 pb-3 mb-4"
            style={{ borderBottom: "1px solid var(--m-card-border)" }}
          >
            <button
              type="button"
              onClick={goHome}
              className="m-nav-icon"
              style={{ width: 36, height: 36 }}
              aria-label="Back"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--parchment)"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>
            <div
              className="flex-1 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm"
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
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <span className="truncate">
                {resultData
                  ? `${resultData.product.brand} ${resultData.product.name}`
                  : query}
              </span>
            </div>
          </div>

          <MobileResultView
            kind={resultKind}
            query={query}
            result={resultData}
            pickList={pickList}
            locked={locked}
            onPick={loadProduct}
            onOpenSheet={() => setSheetOpen(true)}
            onSuggest={() => router.push("/suggest")}
          />
        </div>
      )}

      {view === "result" && resultKind === "detail" && (
        <MobileStickyCta
          alternative={resultData?.primaryAlternative ?? null}
          locked={locked}
          onOpenSheet={() => setSheetOpen(true)}
        />
      )}

      <MobileUnlockSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        sourceProductSlug={resultData?.product.slug}
        onUnlocked={handleUnlocked}
      />
    </div>
  );
}
