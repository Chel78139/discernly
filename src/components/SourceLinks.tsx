"use client";

import { useState } from "react";
import { tagAmazonUrl } from "@/lib/affiliate";

export function SourceLinks({
  sections,
}: {
  sections: { title: string; urls: string[] }[];
}) {
  const [open, setOpen] = useState(false);
  const total = sections.reduce((sum, s) => sum + s.urls.length, 0);

  if (total === 0) return null;

  if (!open) {
    return (
      <button type="button" className="source-link" onClick={() => setOpen(true)}>
        View {total} source{total === 1 ? "" : "s"} →
      </button>
    );
  }

  return (
    <div className="text-left">
      <button
        type="button"
        className="source-link mb-2 inline-block"
        onClick={() => setOpen(false)}
      >
        Hide sources
      </button>
      <div className="space-y-2">
        {sections
          .filter((s) => s.urls.length > 0)
          .map((section) => (
            <div key={section.title}>
              <p className="text-[0.68rem] uppercase tracking-wider opacity-60 mb-1">
                {section.title}
              </p>
              <ul className="text-[0.78rem] space-y-1">
                {section.urls.map((url) => (
                  <li key={url}>
                    <a
                      href={tagAmazonUrl(url)}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="underline break-all"
                      style={{ color: "#6b5d44" }}
                    >
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}
