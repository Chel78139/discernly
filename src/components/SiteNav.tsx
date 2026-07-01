import Link from "next/link";
import { LogoLockup } from "./Logo";

export function SiteNav() {
  return (
    <nav className="flex items-center justify-between py-[22px] border-b border-[rgba(242,232,216,0.12)]">
      <LogoLockup />
      <div className="hidden sm:flex gap-7 text-sm text-sage">
        <Link href="/#browse" className="hover:text-parchment">
          Browse
        </Link>
        <Link href="/#trust" className="hover:text-parchment">
          How we verify
        </Link>
        <Link href="/suggest" className="hover:text-parchment">
          Suggest a product
        </Link>
      </div>
    </nav>
  );
}
