"use client";

import { useState, type FormEvent } from "react";

export function SuggestForm({ initialProductName = "" }: { initialProductName?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const res = await fetch("/api/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Something went wrong. Try again.");
      setStatus("error");
      return;
    }

    setStatus("done");
    form.reset();
  }

  if (status === "done") {
    return (
      <div
        className="rounded-lg p-6 text-center"
        style={{ background: "var(--parchment)", color: "var(--ink)" }}
      >
        <p className="font-serif text-lg">Thanks — it&apos;s in our review queue.</p>
        <p className="text-sm opacity-80 mt-2">
          We check every claim before it goes live. Nothing is auto-published.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg p-6 space-y-4"
      style={{ background: "var(--parchment)", color: "var(--ink)" }}
    >
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="productName">
          Product name
        </label>
        <input
          id="productName"
          name="productName"
          required
          defaultValue={initialProductName}
          className="w-full rounded px-3 py-2 text-sm border"
          style={{ borderColor: "var(--line)" }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="brand">
          Brand
        </label>
        <input
          id="brand"
          name="brand"
          className="w-full rounded px-3 py-2 text-sm border"
          style={{ borderColor: "var(--line)" }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="category">
          Category
        </label>
        <input
          id="category"
          name="category"
          className="w-full rounded px-3 py-2 text-sm border"
          style={{ borderColor: "var(--line)" }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="reason">
          Why do you think it should be flagged?
        </label>
        <textarea
          id="reason"
          name="reason"
          required
          rows={4}
          className="w-full rounded px-3 py-2 text-sm border"
          style={{ borderColor: "var(--line)" }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="sourceUrl">
          Source URL (optional)
        </label>
        <input
          id="sourceUrl"
          name="sourceUrl"
          type="url"
          className="w-full rounded px-3 py-2 text-sm border"
          style={{ borderColor: "var(--line)" }}
        />
      </div>

      {error && <p className="text-sm text-red-700">{error}</p>}

      <button type="submit" className="btn-copper w-full" disabled={status === "loading"}>
        {status === "loading" ? "Submitting…" : "Submit for review"}
      </button>
    </form>
  );
}
