import type { AnalysisResult, CategoryScore, FeedbackItem, PageData, ScoreCategoryKey } from "@/lib/types";

const SUGGESTION_BANK: Record<ScoreCategoryKey, string[]> = {
  valuePropClarity: [
    "Rewrite the hero copy around a concrete outcome, audience, and timeframe instead of broad positioning language.",
    "Add one measurable proof point near the headline so the value proposition feels earned.",
    "Replace generic adjectives with specific verbs, metrics, or operational claims."
  ],
  headlineStrength: [
    "Keep the main headline in the 6 to 12 word range and lead with the result customers want.",
    "Test a version that starts with a verb or a measurable promise instead of a brand-led phrase.",
    "Use the supporting subhead to explain who the offer is for and why it matters now."
  ],
  ctaEffectiveness: [
    "Make the primary CTA action-led and specific, such as 'Book a demo' or 'Start free trial'.",
    "Place the first CTA higher on the page so visitors do not have to scan for the next step.",
    "Reduce competing CTA language if multiple buttons are asking for different actions."
  ],
  pageStructure: [
    "Break the page into clearer sections with supporting H2s so the argument is easier to scan.",
    "Add enough explanatory copy to support the offer without forcing visitors to infer the value.",
    "Tighten heading hierarchy so sections flow from promise, proof, features, and CTA."
  ],
  trustCredibility: [
    "Add customer proof, review language, or recognizable logos close to the decision points.",
    "Include quantified outcomes such as percentages, totals, or timeframe-based improvements.",
    "Support major claims with case study snippets, certifications, or trust badges."
  ]
};

function getSuggestions(score: CategoryScore): string[] {
  if (score.score >= 80) {
    return ["This area is already strong. Preserve the clarity and keep changes incremental."];
  }

  if (score.score >= 65) {
    return SUGGESTION_BANK[score.key].slice(0, 2);
  }

  return SUGGESTION_BANK[score.key];
}

function buildSummary(score: CategoryScore): string {
  if (score.score >= 80) {
    return `${score.name} is a strength on this page. ${score.rationale}`;
  }

  if (score.score >= 60) {
    return `${score.name} is serviceable but not pulling full weight yet. ${score.rationale}`;
  }

  return `${score.name} is currently holding the page back. ${score.rationale}`;
}

export function buildFeedback(scores: CategoryScore[]): FeedbackItem[] {
  return scores.map((score) => ({
    key: score.key,
    name: score.name,
    summary: buildSummary(score),
    suggestions: getSuggestions(score)
  }));
}

export function buildHighlights(pageData: PageData, scores: CategoryScore[]): Pick<AnalysisResult, "highlights" | "warnings" | "snapshot"> {
  const highlights: string[] = [];
  const warnings: string[] = [];

  if (pageData.h1) {
    highlights.push(`Primary headline detected: "${pageData.h1}".`);
  } else {
    warnings.push("No H1 heading was detected on the page.");
  }

  if (pageData.ctas.length > 0) {
    highlights.push(`${pageData.ctas.length} CTA element${pageData.ctas.length === 1 ? "" : "s"} found.`);
  } else {
    warnings.push("No clear CTA elements were detected.");
  }

  if (pageData.wordCount > 0) {
    highlights.push(`Approximate body copy length: ${pageData.wordCount} words.`);
  }

  const weakest = [...scores].sort((left, right) => left.score - right.score)[0];
  warnings.push(`Lowest-scoring category: ${weakest.name} (${weakest.score}/100).`);

  return {
    highlights,
    warnings,
    snapshot: {
      title: pageData.title,
      h1: pageData.h1,
      metaDescription: pageData.metaDescription,
      headingCount: pageData.headings.length,
      ctaCount: pageData.ctas.length,
      wordCount: pageData.wordCount
    }
  };
}

