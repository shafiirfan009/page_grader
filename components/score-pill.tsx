import type { ScoreLabel, ScoreTone } from "@/lib/types";

const TONE_STYLES: Record<ScoreTone, string> = {
  green: "bg-emerald-100 text-emerald-700",
  yellow: "bg-amber-100 text-amber-700",
  red: "bg-red-100 text-red-700"
};

interface ScorePillProps {
  score: number;
  tone: ScoreTone;
  label: ScoreLabel;
}

export function ScorePill({ score, tone, label }: ScorePillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${TONE_STYLES[tone]}`}
    >
      {score} · {label}
    </span>
  );
}
