import type { CategoryScore, PageData, ScoreCategoryKey, ScoreLabel, ScoreTone } from "@/lib/types";

const CATEGORY_NAMES: Record<ScoreCategoryKey, string> = {
  valuePropClarity: "Value Prop Clarity",
  headlineStrength: "Headline Strength",
  ctaEffectiveness: "CTA Effectiveness",
  pageStructure: "Page Structure",
  trustCredibility: "Trust & Credibility"
};

const SPECIFICITY_KEYWORDS = [
  "save",
  "reduce",
  "increase",
  "faster",
  "minutes",
  "days",
  "revenue",
  "conversion",
  "pipeline",
  "leads",
  "bookings",
  "cost",
  "demo",
  "compliance",
  "visibility"
];

const BUZZWORDS = [
  "innovative",
  "best-in-class",
  "cutting-edge",
  "revolutionary",
  "synergy",
  "world-class",
  "next-gen",
  "transformative"
];

const OUTCOME_WORDS = [
  "grow",
  "book",
  "convert",
  "launch",
  "reduce",
  "increase",
  "win",
  "capture",
  "accelerate",
  "improve"
];

const ACTION_KEYWORDS = [
  "get",
  "start",
  "book",
  "try",
  "schedule",
  "download",
  "watch",
  "join",
  "claim",
  "talk",
  "request",
  "see"
];

const TRUST_KEYWORDS = [
  "trusted",
  "customers",
  "companies",
  "teams",
  "reviews",
  "case study",
  "proven",
  "certified",
  "security",
  "compliant",
  "testimonial",
  "featured",
  "award",
  "since"
];

function countKeywordHits(text: string, keywords: string[]): number {
  const source = text.toLowerCase();

  return keywords.reduce((total, keyword) => {
    if (!source.includes(keyword)) {
      return total;
    }

    return total + 1;
  }, 0);
}

function clampScore(score: number): number {
  return Math.min(90, Math.max(40, Math.round(score)));
}

function hashString(input: string): number {
  let hash = 0;

  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0;
  }

  return hash;
}

function applyJitter(score: number, seed: string): number {
  const hash = hashString(seed);
  const magnitude = 3 + (hash % 3);
  const direction = hash % 2 === 0 ? 1 : -1;

  return clampScore(score + magnitude * direction);
}

function getTone(score: number): ScoreTone {
  if (score >= 75) {
    return "green";
  }

  if (score >= 60) {
    return "yellow";
  }

  return "red";
}

function getLabel(score: number): ScoreLabel {
  if (score >= 80) {
    return "Strong";
  }

  if (score >= 60) {
    return "Needs improvement";
  }

  return "Weak";
}

function makeCategoryScore(
  key: ScoreCategoryKey,
  baseScore: number,
  rationale: string,
  seedSource: string
): CategoryScore {
  const score = applyJitter(baseScore, `${key}:${seedSource}`);

  return {
    key,
    name: CATEGORY_NAMES[key],
    score,
    tone: getTone(score),
    label: getLabel(score),
    rationale
  };
}

function scoreValueProp(pageData: PageData): CategoryScore {
  const source = [pageData.h1, pageData.title, pageData.metaDescription].join(" ");
  const specificityHits = countKeywordHits(source, SPECIFICITY_KEYWORDS);
  const buzzwordHits = countKeywordHits(source, BUZZWORDS);
  const hasConcreteNumber = /\b\d+([.,]\d+)?(%|x|k|m|\+)?\b/.test(source);
  const baseScore = 60 + specificityHits * 5 + (hasConcreteNumber ? 6 : 0) - buzzwordHits * 4;
  const rationale =
    specificityHits > buzzwordHits
      ? "The primary message uses more concrete, outcome-oriented language than generic positioning."
      : "The primary message leans generic and would benefit from a clearer, more specific promise.";

  return makeCategoryScore(
    "valuePropClarity",
    baseScore,
    rationale,
    `${source}:${specificityHits}:${buzzwordHits}`
  );
}

function scoreHeadline(pageData: PageData): CategoryScore {
  const headline = pageData.h1 || pageData.title;
  const wordCount = headline ? headline.split(/\s+/).length : 0;
  const outcomeHits = countKeywordHits(headline, OUTCOME_WORDS);
  const idealLengthBonus = wordCount >= 6 && wordCount <= 12 ? 12 : wordCount >= 4 && wordCount <= 14 ? 5 : -8;
  const hasVerbLead = /\b(get|grow|book|launch|cut|reduce|boost|capture)\b/i.test(headline);
  const baseScore = 58 + idealLengthBonus + outcomeHits * 5 + (hasVerbLead ? 5 : 0) + (headline ? 4 : -12);
  const rationale =
    wordCount >= 6 && wordCount <= 12
      ? "The headline length is close to the ideal range and signals an outcome."
      : "The headline is either too vague or outside the ideal 6 to 12 word range.";

  return makeCategoryScore(
    "headlineStrength",
    baseScore,
    rationale,
    `${headline}:${wordCount}:${outcomeHits}`
  );
}

function scoreCta(pageData: PageData): CategoryScore {
  const actionHits = pageData.ctas.filter((cta) =>
    ACTION_KEYWORDS.some((keyword) => cta.text.toLowerCase().includes(keyword))
  ).length;
  const firstCta = pageData.ctas[0];
  const earlyPlacementBonus = firstCta && firstCta.position <= 0.3 ? 10 : pageData.ctas.length > 0 ? 4 : -10;
  const countBonus =
    pageData.ctas.length >= 1 && pageData.ctas.length <= 3
      ? 8
      : pageData.ctas.length > 3
        ? 2
        : -8;
  const baseScore = 55 + actionHits * 6 + earlyPlacementBonus + countBonus;
  const rationale =
    pageData.ctas.length > 0
      ? "Calls to action are present, and the strongest ones use direct action language."
      : "There is no clear CTA pattern yet, which makes the next step less obvious for visitors.";

  return makeCategoryScore(
    "ctaEffectiveness",
    baseScore,
    rationale,
    `${pageData.ctas.map((cta) => `${cta.text}:${cta.position}`).join("|")}:${actionHits}`
  );
}

function scoreStructure(pageData: PageData): CategoryScore {
  const headingCount = pageData.headings.length;
  const hasH1 = Boolean(pageData.h1);
  const hasH2 = pageData.headings.some((heading) => heading.level === 2);
  const hierarchyPenalty = pageData.headings.some((heading, index, entries) => {
    if (index === 0) {
      return false;
    }

    return heading.level - entries[index - 1].level > 1;
  })
    ? -6
    : 0;
  const headingBonus = headingCount >= 4 && headingCount <= 8 ? 12 : headingCount >= 2 ? 6 : -8;
  const wordCountBonus =
    pageData.wordCount >= 180 && pageData.wordCount <= 900
      ? 10
      : pageData.wordCount >= 120
        ? 4
        : -10;
  const baseScore =
    56 + headingBonus + wordCountBonus + (hasH1 ? 6 : -10) + (hasH2 ? 4 : -4) + hierarchyPenalty;
  const rationale =
    headingCount >= 4 && headingCount <= 8
      ? "The page has a healthy amount of structure and enough copy to support the pitch."
      : "The page structure is either thin or overly sparse, which weakens scanability.";

  return makeCategoryScore(
    "pageStructure",
    baseScore,
    rationale,
    `${headingCount}:${pageData.wordCount}:${hasH1}:${hasH2}:${hierarchyPenalty}`
  );
}

function scoreTrust(pageData: PageData): CategoryScore {
  const source = [pageData.bodyText, pageData.metaDescription].join(" ");
  const trustHits = countKeywordHits(source, TRUST_KEYWORDS);
  const numericProofHits = (source.match(/\b\d+([.,]\d+)?(%|x|k|m|\+)?\b/g) ?? []).length;
  const baseScore = 52 + trustHits * 5 + Math.min(numericProofHits, 4) * 4;
  const rationale =
    trustHits > 0 || numericProofHits > 0
      ? "The page includes trust signals or proof points that make the claims easier to believe."
      : "Credibility signals are light, so the page relies heavily on assertion over proof.";

  return makeCategoryScore(
    "trustCredibility",
    baseScore,
    rationale,
    `${trustHits}:${numericProofHits}:${source.slice(0, 140)}`
  );
}

export function scorePage(pageData: PageData): CategoryScore[] {
  return [
    scoreValueProp(pageData),
    scoreHeadline(pageData),
    scoreCta(pageData),
    scoreStructure(pageData),
    scoreTrust(pageData)
  ];
}

export function summarizeOverall(scores: CategoryScore[]): Pick<CategoryScore, "score" | "tone" | "label"> {
  const average = scores.reduce((total, score) => total + score.score, 0) / scores.length;
  const overallScore = Math.round(average);

  return {
    score: overallScore,
    tone: getTone(overallScore),
    label: getLabel(overallScore)
  };
}

