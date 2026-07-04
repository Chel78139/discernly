"use client";

import { useState, type FormEvent } from "react";

export function MobileUnlockSheet({
  open,
  onClose,
  sourceProductSlug,
  onUnlocked,
}: {
  open: boolean;
  onClose: () => void;
  sourceProductSlug?: string;
  onUnlocked: () => void;
}) {
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
        setStatus("idle");
        return;
      }
      setStatus("idle");
      onUnlocked();
    } catch {
      setError("Something went wrong. Try again.");
      setStatus("idle");
    }
  }

  return (
    <div
      className={`m-sheet-backdrop${open ? " open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="m-sheet">
        <div className="m-sheet-handle" />
        <div className="text-center text-3xl mb-2.5">🙏</div>
        <p className="m-sheet-headline">
          Your swap
          <br />
          is ready.
        </p>
        <p className="m-sheet-sub">
          Enter your email once. Unlock every swap free, forever. No credit
          card, no subscription.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            className="m-sheet-input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            autoComplete="email"
          />
          <button type="submit" className="m-sheet-btn" disabled={status === "loading"}>
            {status === "loading" ? "Unlocking…" : "Unlock free forever"}
          </button>
        </form>
        {error && (
          <p className="text-center text-sm mb-2" style={{ color: "var(--copper)" }}>
            {error}
          </p>
        )}
        <p className="m-sheet-fine">
          No spam. We&apos;ll only email you about new swaps and your account.
        </p>
      </div>
    </div>
  );
}
