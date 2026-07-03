import Link from "next/link";

export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="30" cy="30" r="27" stroke="#C9A227" strokeWidth="3" />
      <circle cx="24" cy="24" r="11" stroke="#C9A227" strokeWidth="3" />
      <line
        x1="32"
        y1="32"
        x2="43"
        y2="43"
        stroke="#C9A227"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <line
        x1="24"
        y1="16"
        x2="24"
        y2="32"
        stroke="#C9A227"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="22"
        x2="30"
        y2="22"
        stroke="#C9A227"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className="font-serif font-semibold text-2xl tracking-tight"
      style={{ color: dark ? "var(--ink)" : "var(--parchment)" }}
    >
      discern<span style={{ color: "var(--gold)" }}>ly</span>
    </span>
  );
}

export function LogoLockup({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-[10px]">
      <Logo size={32} />
      <Wordmark dark={dark} />
    </Link>
  );
}
