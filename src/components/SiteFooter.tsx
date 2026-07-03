import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(242,232,216,0.12)] py-9 pb-14 flex justify-between items-center flex-wrap gap-3">
      <p className="text-[0.8rem] text-sage">
        discernly · sources checked, not guessed
      </p>
      <div className="flex gap-5 text-[0.8rem]">
        <Link href="/suggest" className="text-sage hover:text-parchment">
          Suggest a product
        </Link>
        <Link href="/#trust" className="text-sage hover:text-parchment">
          Methodology
        </Link>
        <Link href="/affiliate-disclosure" className="text-sage hover:text-parchment">
          Affiliate disclosure
        </Link>
      </div>
    </footer>
  );
}
