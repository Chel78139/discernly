import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="wrap max-w-[1080px] mx-auto px-6 w-full">
      <SiteNav />
      <div className="max-w-[640px] mx-auto pt-16 pb-24">
        <h1 className="font-serif font-medium text-[1.9rem] mb-6">{title}</h1>
        <div className="space-y-4 text-[0.95rem]" style={{ color: "var(--sage)" }}>
          {children}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
