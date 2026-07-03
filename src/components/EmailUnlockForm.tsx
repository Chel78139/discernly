"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export function EmailUnlockForm({
  sourceProductSlug,
}: {
  sourceProductSlug?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, sourceProductSlug }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Try again.");
        setStatus("error");
        return;
      }
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 w-full max-w-xs"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        aria-label="Email address"
        className="flex-1 rounded px-3 py-2 text-sm"
        style={{ color: "var(--ink)", background: "var(--parchment)" }}
      />
      <button type="submit" className="btn-copper" disabled={status === "loading"}>
        {status === "loading" ? "Unlocking…" : "Unlock"}
      </button>
      {error && (
        <p className="text-xs text-red-300 sm:absolute sm:mt-10">{error}</p>
      )}
    </form>
  );
}
