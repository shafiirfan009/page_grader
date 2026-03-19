import { ScorePill } from "@/components/score-pill";
import type { CategoryScore, FeedbackItem } from "@/lib/types";

interface CategoryCardProps {
  score: CategoryScore;
  feedback: FeedbackItem;
  isWorst?: boolean;
  className?: string;
}

function getCardClasses(score: CategoryScore, isWorst: boolean) {
  if (!isWorst) {
    return "border border-slate-200 bg-white";
  }

  if (score.score < 60) {
    return "border-2 border-red-200 bg-red-50/50";
  }

  if (score.score < 75) {
    return "border-2 border-amber-200 bg-amber-50/50";
  }

  return "border border-slate-200 bg-white";
}

export function CategoryCard({
  score,
  feedback,
  isWorst = false,
  className = ""
}: CategoryCardProps) {
  return (
    <article
      className={`rounded-[28px] p-6 shadow-panel ${getCardClasses(score, isWorst)} ${className}`}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-slate-900">{score.name}</h3>
        <ScorePill score={score.score} tone={score.tone} label={score.label} />
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600">{feedback.summary}</p>

      <p className="mb-2 mt-4 text-xs font-medium tracking-wide text-slate-500">What to fix</p>
      <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 marker:text-slate-400">
        {feedback.suggestions.slice(0, 3).map((suggestion) => (
          <li key={suggestion}>{suggestion}</li>
        ))}
      </ul>
    </article>
  );
}
