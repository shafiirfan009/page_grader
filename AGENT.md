# AGENT.md — Landing Page Grader (PageGrade)

## Identity

You are building a portfolio project for **Muhammad Irfan Shafi**, a freelance web tool builder based in Faisalabad, Pakistan. Irfan builds production-quality web tools in 48 hours using AI-assisted development (vibe coding). This project is his **5th portfolio piece** — it must look like a real client delivery, not a toy or tutorial project.

## Project Summary

**Project:** Landing Page Grader
**Client (simulated):** PageGrade — a growth consultancy for SaaS startups
**Type:** Single-page web app with URL input → analysis → visual report
**Purpose:** Let founders paste a landing page URL and get instant, structured feedback on messaging, CTA, and page structure
**Stack:** React (Next.js) + Tailwind CSS, deployed to Vercel
**Backend:** Minimal — a lightweight serverless proxy to fetch page content (or client-side fetch if CORS allows). No database.

## What This App Does

1. User pastes a landing page URL
2. Clicks "Analyze page"
3. App fetches the page's HTML (title, H1, visible text, headings, CTA text)
4. A fixed rubric scores the page across 5 categories
5. A polished visual report appears with scores, feedback, and improvement tips

This is NOT a deep CRO audit. It's a **structured first-pass grading tool** — fast, credible, and useful. Position it as "quick review" not "optimization engine."

## Design Direction

- **Visual style:** Report-like, clean, minimal, slightly analytical. Premium SaaS feel.
- **Layout:** Centered input at top. Results as stacked cards below. Strong spacing.
- **Palette:**
  - Dark slate: `#0F172A` (background option / dark accents)
  - White: `#FFFFFF` (card surfaces, light mode)
  - Blue: `#3B82F6` (primary accent, buttons, links)
  - Green: `#22C55E` (good scores, 75+)
  - Yellow/Amber: `#F59E0B` (average scores, 60–74)
  - Red: `#EF4444` (weak scores, <60)
  - Text: neutral gray scale (`#1E293B`, `#64748B`, `#94A3B8`)
- **Typography:** Clean sans-serif (Inter or system). Large score numbers. Clear hierarchy.
- **Tone of copy:** Direct, useful, slightly analytical. Not fluffy. No vague AI language.

## Brand

- **Name:** PageGrade
- **Tone:** Sharp, helpful, analytical
- **Logo:** Text-only is fine for v1

## Page Structure

### Section 1: Hero + Input
- Headline: "Get instant feedback on your landing page"
- Subtext: "Paste your URL and receive a structured review of your messaging, CTA, and page structure."
- URL input field with placeholder: `https://yourlandingpage.com`
- Button: "Analyze page" (disabled until valid URL)

### Section 2: Loading State
- Replaces or overlays the input area after clicking analyze
- Text: "Analyzing your page..."
- Subtext: "Reviewing messaging, structure, and CTA clarity"
- Subtle progress animation or skeleton cards
- Duration: real fetch time + minimum 1.5s for perceived thoroughness

### Section 3: Results Report (main section)
- **Top summary block:** Overall score (large, centered), label ("Strong" / "Needs improvement" / "Weak"), subtitle
- **Category breakdown:** 5 cards with score bars, feedback, and suggestions
- **Summary insight block:** Short paragraph synthesizing the findings
- Appears below hero or replaces the loading state

### Section 4: Bottom CTA
- Headline: "Want a deeper conversion review?"
- Subtext: "Get a full audit with actionable recommendations tailored to your product."
- Button: "Book a consult"

## Grading Framework (5 Categories)

| # | Category | What It Checks |
|---|----------|---------------|
| 1 | Value Proposition Clarity | Does the page clearly communicate what the product does and for whom? |
| 2 | Headline Strength | Is the H1 the right length, specific, and outcome-oriented? |
| 3 | CTA Effectiveness | Are CTAs present, action-driven, and placed early? |
| 4 | Page Structure & Flow | Does the page have multiple sections with logical heading hierarchy? |
| 5 | Trust & Credibility | Are there social proof elements (testimonials, logos, case studies)? |

Each category produces:
- **Score:** 0–100 (practically clamped to 40–90 range for realism)
- **Short feedback:** 1–2 sentences explaining the score
- **Improvement tip:** 1 actionable suggestion

**Overall score:** Average of all 5 category scores.

**Score labels:**
- 80+ → "Strong"
- 60–79 → "Needs improvement"
- <60 → "Weak"

**Color coding:**
- Green (`#22C55E`): 75+
- Yellow (`#F59E0B`): 60–74
- Red (`#EF4444`): <60

## Scoring Logic (Heuristic-Based)

The analysis does NOT need complex AI. Use lightweight, rule-based heuristics on extracted page content.

### What to Extract from the URL
- Page `<title>`
- First `<h1>` text
- All heading tags (`h1`–`h6`) — count and text
- Visible body text (first ~2000 chars)
- All anchor/button text (for CTA detection)
- Meta description

### Heuristic Rules

#### 1. Value Proposition Clarity (target: 40–90)
- **Boost** if H1 or first paragraph contains specificity keywords: "for [audience]", "helps", "build", "manage", "automate", "save", "reduce"
- **Penalize** if dominated by vague words: "innovative", "solution", "better", "next-gen", "cutting-edge"
- **Boost** if meta description exists and is 120–160 chars
- **Penalize** if no clear audience or outcome in first 200 chars

#### 2. Headline Strength (target: 40–90)
- **Ideal H1 length:** 6–12 words → highest score
- **Penalize** if <4 words (too vague) or >15 words (too long)
- **Boost** if contains outcome/result words: "grow", "save", "get", "build", "launch", "increase"
- **Penalize** if H1 is missing entirely (score = 40)
- **Boost** if H1 is different from `<title>` (indicates intentional copywriting)

#### 3. CTA Effectiveness (target: 40–90)
- **Detect CTA text** from buttons and links
- **Strong CTA words:** "Start", "Get", "Try", "Book", "Sign up", "Create", "Download"
- **Weak CTA words:** "Learn more", "Submit", "Click here", "Continue"
- **Boost** if CTA appears in first 25% of page content (above fold)
- **Penalize** if no detectable CTA
- **Boost** if multiple CTAs found (shows intentional funnel design)

#### 4. Page Structure & Flow (target: 40–90)
- **Count headings:** 4–8 headings is ideal for a landing page
- **Boost** if heading hierarchy is logical (h1 → h2 → h3, not jumps)
- **Penalize** if <2 headings (thin content) or >12 (over-structured)
- **Boost** if total visible text is 500–2000 words
- **Penalize** if <200 words (too thin) or >3000 (too dense for a landing page)

#### 5. Trust & Credibility (target: 40–90)
- **Detect trust keywords:** "trusted by", "customers", "testimonial", "review", "case study", "used by", "companies", "teams", "stars", "rating", "logo"
- **Boost** per keyword cluster found (max 3 clusters)
- **Penalize** if zero trust signals detected
- **Boost** if page contains number-based proof ("10,000+", "500 teams", "4.9 stars")

### Score Smoothing
- After raw heuristic scoring, add small random jitter (±3–5 points) for natural feel
- Clamp all scores to 40–90 range (avoid 0 or 100 — neither is credible)
- Round to nearest integer

## Feedback Generation

For each category, prepare 3 tiers of feedback templates:

**High (75+):**
> "Your [category] is strong. [Specific positive observation]. [Minor refinement tip]."

**Medium (60–74):**
> "Your [category] is present but could be stronger. [Specific issue]. [Improvement suggestion]."

**Low (<60):**
> "Your [category] needs attention. [What's missing]. [Clear action to take]."

### Example Feedback (CTA Effectiveness — score 62)

**Feedback:** "Your call-to-action is present but lacks urgency and specificity."
**Suggestion:** "Use action-driven language like 'Start your free trial' instead of generic labels."

### Summary Insight Block

Generate a 2–3 sentence paragraph combining the top strength and top weakness:

> "Your landing page has a clear structure and good use of sections. However, your headline could be more specific and your CTA lacks urgency. Strengthening these two areas could significantly improve conversion."

## Page Fetching Strategy

### Option A: Serverless Proxy (Recommended)
- Create `/api/fetch-page` route in Next.js
- Accepts `{ url: string }` POST body
- Server-side fetches the URL with a standard User-Agent
- Returns extracted data: `{ title, h1, headings, bodyText, ctaTexts, metaDescription }`
- Use `cheerio` or `node-html-parser` for HTML parsing
- Timeout: 10 seconds
- Error handling: return structured error if fetch fails

### Option B: Client-Side Fetch (Fallback)
- Only works if target page has permissive CORS
- Most landing pages will block this
- Use as fallback with graceful error: "Unable to fetch this page. Try a different URL."

### Option C: Demo Mode
- If real fetch is too complex for v1, use a set of pre-analyzed demo pages
- User selects from 3–4 example URLs and gets pre-computed results
- Still shows the full report UI
- Label clearly: "Demo analysis — try with a real URL when the full version launches"

**Recommendation:** Start with Option A (serverless proxy). Fall back to Option C for pages that block fetching.

## Component Checklist

- [ ] Hero with headline + subtext + URL input + analyze button
- [ ] URL validation (basic: must include a dot, starts with http)
- [ ] Loading/analyzing state with animation
- [ ] Overall score badge (large, centered, color-coded)
- [ ] Score label ("Strong" / "Needs improvement" / "Weak")
- [ ] Category card component (score bar + feedback + suggestion)
- [ ] Progress bar component (0–100, color-coded)
- [ ] 5 category cards rendered from data
- [ ] Summary insight block
- [ ] Bottom CTA block
- [ ] Error state (fetch failed, invalid URL, timeout)
- [ ] "Analyze another" button to reset
- [ ] Responsive layout (mobile stacked, desktop centered)

## File Structure

```
landing-page-grader/
├── AGENT.md                    ← You are here
├── README.md                   ← Project overview + setup
├── CONVENTIONS.md              ← Code style + naming rules
├── TASKS.md                    ← Build checklist
├── BRIEF.md                    ← Original client brief
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── public/
│   └── favicon.ico
└── src/
    ├── app/
    │   ├── layout.tsx          ← Root layout with Inter font
    │   ├── page.tsx            ← Main page composing all sections
    │   ├── globals.css         ← Tailwind directives only
    │   └── api/
    │       └── fetch-page/
    │           └── route.ts    ← Serverless proxy for URL fetching
    ├── components/
    │   ├── Hero.tsx            ← Headline + subtext + URL input
    │   ├── AnalyzerForm.tsx    ← URL input + button + validation
    │   ├── LoadingState.tsx    ← Analyzing animation
    │   ├── ResultsReport.tsx   ← Parent: renders all result sections
    │   ├── OverallScore.tsx    ← Big score badge + label
    │   ├── CategoryCard.tsx    ← Reusable: score bar + feedback + tip
    │   ├── ProgressBar.tsx     ← Reusable color-coded progress bar
    │   ├── SummaryInsight.tsx  ← Synthesized paragraph
    │   ├── BottomCTA.tsx       ← Conversion block
    │   └── ErrorState.tsx      ← Fetch failure / timeout message
    ├── hooks/
    │   └── usePageAnalyzer.ts  ← Manages fetch + analysis state machine
    ├── lib/
    │   ├── extractor.ts        ← HTML parsing: extract title, h1, headings, CTAs, body text
    │   ├── scorer.ts           ← Heuristic scoring for all 5 categories
    │   ├── feedback.ts         ← Feedback template selection based on scores
    │   ├── types.ts            ← Shared TypeScript interfaces
    │   └── formatters.ts       ← Score formatting helpers
    └── data/
        └── demo-pages.ts       ← Pre-analyzed fallback data for demo mode
```

## Key Interfaces

```typescript
interface PageData {
  url: string;
  title: string;
  h1: string;
  headings: { level: number; text: string }[];
  bodyText: string;
  ctaTexts: string[];
  metaDescription: string;
  wordCount: number;
}

interface CategoryResult {
  id: string;
  name: string;
  score: number;          // 40–90 clamped
  feedback: string;       // 1–2 sentences
  suggestion: string;     // 1 actionable tip
  color: 'green' | 'yellow' | 'red';
}

interface GradeReport {
  url: string;
  overallScore: number;
  overallLabel: 'Strong' | 'Needs improvement' | 'Weak';
  categories: CategoryResult[];
  summary: string;        // 2–3 sentence synthesis
  analyzedAt: string;     // ISO timestamp
}

type AnalyzerState = 'idle' | 'loading' | 'results' | 'error';
```

## Code Standards

- Use Next.js App Router with TypeScript
- Tailwind CSS for all styling — no separate CSS files
- Scoring logic in pure functions (`scorer.ts`) — easy to test and adjust
- Extraction logic in `extractor.ts` — separated from scoring
- Components in `src/components/` — one file per component
- `'use client'` on interactive components (Hero, AnalyzerForm, ResultsReport parent)
- Server-side route for page fetching (`/api/fetch-page/route.ts`)
- Mobile-first responsive design
- Accessible: proper labels, ARIA, keyboard navigable
- State machine pattern: `idle → loading → results | error`

## Deployment

- Deploy to Vercel via GitHub
- The `/api/fetch-page` route runs as a Vercel serverless function automatically
- No environment variables needed for v1
- Target URL: something like `pagegrader.vercel.app`

## What Is Explicitly Excluded

- No full SEO audit
- No technical performance analysis (Lighthouse, Core Web Vitals)
- No heatmaps or tracking
- No deep AI reasoning chains
- No multi-page crawl
- No login or saved reports
- No database

## Portfolio Context

This is Irfan's 5th portfolio tool. The existing 4 are:
1. SEO Diagnostic Tool — crawl analysis with phased results
2. Brand Explorer — interactive brand identity comparison
3. SimpleCRM Dashboard — pipeline view with live actions
4. StatusFlow ROI Calculator — marketing ROI calculator for SaaS teams

This landing page grader adds a new category: **URL-input → analysis → report tool**. It demonstrates the input → processing → structured output flow, which is the most product-like pattern in the portfolio.

**Portfolio framing:**
- Title: "Landing Page Grader with Instant Feedback Report"
- Description: "A lightweight audit tool that analyzes a landing page URL and returns a structured, score-based report on messaging, CTA clarity, and page effectiveness."