import type { ConfidenceTier } from "@/types/data";

export function ConfidenceBadge({
  tier,
  documentedLabel = "documented",
  contestedLabel = "contested",
  detail,
}: {
  tier: ConfidenceTier;
  documentedLabel?: string;
  contestedLabel?: string;
  detail?: string;
}) {
  const isContested = tier === 2;
  return (
    <span className={`seal${isContested ? " contested" : ""}`}>
      <span className="dot" aria-hidden="true" />
      {isContested ? contestedLabel : documentedLabel}
      {detail ? ` · ${detail}` : ""}
    </span>
  );
}
