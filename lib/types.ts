export type ScoreTone = "green" | "yellow" | "red";
export type ScoreLabel = "Strong" | "Needs improvement" | "Weak";

export type ScoreCategoryKey =
  | "valuePropClarity"
  | "headlineStrength"
  | "ctaEffectiveness"
  | "pageStructure"
  | "trustCredibility";

export interface HeadingData {
  level: number;
  text: string;
}

export interface CtaData {
  text: string;
  tag: string;
  href?: string;
  position: number;
}

export interface PageData {
  url: string;
  title: string;
  metaDescription: string;
  h1: string;
  headings: HeadingData[];
  ctas: CtaData[];
  bodyText: string;
  wordCount: number;
}

export interface CategoryScore {
  key: ScoreCategoryKey;
  name: string;
  score: number;
  tone: ScoreTone;
  label: ScoreLabel;
  rationale: string;
}

export interface FeedbackItem {
  key: ScoreCategoryKey;
  name: string;
  summary: string;
  suggestions: string[];
}

export interface AnalysisSnapshot {
  title: string;
  h1: string;
  metaDescription: string;
  headingCount: number;
  ctaCount: number;
  wordCount: number;
}

export interface AnalysisResult {
  url: string;
  fetchedAt: string;
  snapshot: AnalysisSnapshot;
  overallScore: number;
  overallTone: ScoreTone;
  overallLabel: ScoreLabel;
  scores: CategoryScore[];
  feedback: FeedbackItem[];
  highlights: string[];
  warnings: string[];
}

export interface FetchPageRequest {
  url: string;
}

