# BRIEF.md — Original Client Brief (Reference Only)

> This file preserves the original client brief and build spec for reference.
> The actionable build instructions are in AGENT.md and TASKS.md.
> If there's a conflict, AGENT.md is the source of truth.

---

## Project Overview

**Project name:** Landing Page Grader
**Client:** Growth consultancy for SaaS startups
**Project type:** Fixed-scope web app
**Primary goal:** Turn any landing page URL into a clean, structured feedback report

## Business Goal

- Attract founders via a useful tool
- Qualify leads (people who care about conversion)
- Demonstrate expertise without a call
- Give prospects something tangible to react to

The tool should create a moment of: "Ah, I see what's wrong with my page."

## Target User

- SaaS founders
- Indie hackers
- Marketers
- Growth freelancers
- Small product teams

They already have a landing page and want to improve it.

## Core Use Case

User pastes a landing page URL → clicks "Analyze" → gets a structured visual report in seconds.

The report answers:
- Is my messaging clear?
- Is my CTA strong enough?
- Is the structure logical?
- What are the obvious weak points?

## Success Criteria

- Value is clear instantly
- Report looks polished and "worth something"
- Feedback feels structured and useful (not random AI text)
- UI feels premium and modern
- Works as a shareable/demo-worthy output
- Doesn't overpromise deep analysis

## Scope

### Included
- URL input field
- Basic page fetch (title, meta, visible text)
- Fixed grading framework (5 categories)
- Score breakdown (visual)
- Short feedback per category
- Polished report UI
- CTA section
- Deployed live

### Excluded
- Full SEO audit
- Technical performance analysis
- Heatmaps / tracking
- Deep AI reasoning chains
- Multi-page crawl
- Login or saved reports

## Grading Framework (5 Categories)

1. **Value Proposition Clarity** — Is it clear what the product does and for whom?
2. **Headline Strength** — Is the H1 the right length, specific, outcome-oriented?
3. **CTA Effectiveness** — Are CTAs present, action-driven, placed early?
4. **Page Structure & Flow** — Multiple sections, logical heading hierarchy?
5. **Trust & Credibility** — Social proof elements present?

Each gets: score (0–100), short explanation, 1–2 improvement suggestions.

## Scoring Logic

Heuristic-based, not deep AI. Mix of:
- Basic text extraction
- Keyword heuristics
- Simple rules (headline length, CTA word presence, section count, trust keywords)
- Optionally light AI summarization for feedback

**Key principle:** Structured output > "smart" output

## Score Ranges

- Overall score: average of 5 categories
- 80+ → "Strong"
- 60–79 → "Needs improvement"
- <60 → "Weak"
- Color coding: green (75+), yellow (60–74), red (<60)
- Scores clamped to 40–90 range for realism

## Results UI

### Top summary block
- Overall score (big, visual)
- Label: "Strong" / "Needs improvement" / "Weak"

### Category breakdown (5 cards)
Each card: category name, score bar/badge, 1–2 lines feedback, improvement tip

### Example card
**CTA Effectiveness — 62/100**
Your primary call-to-action is present but lacks urgency and specificity.
Suggestion: Use action-driven language like "Start your free trial" instead of generic labels.

### Summary insight block
Short 2–3 sentence paragraph synthesizing strengths and weaknesses.

### Bottom CTA
"Want a deeper conversion review?" → "Book a consult"

## UI Direction

- Clean, structured, report-like, premium SaaS feel
- Centered input, results as stacked cards, clear sections
- Score bars, badges, color coding (green/yellow/red)
- Rounded cards, soft borders, subtle shadows

## Brand

- Name: PageGrade
- Tone: Sharp, helpful, analytical
- Colors: dark slate/charcoal, white, blue accent, green/yellow/red for scoring

## Copy Direction

- Direct, useful, slightly analytical, not fluffy
- Avoid: vague AI language, generic advice, long paragraphs
- Prefer: short insights, actionable suggestions

## Main Risk

**Overpromising intelligence.** Position as "quick review" / "structured feedback" / "first-pass grading" — NOT "complete optimization engine."

## Example Demo Output

For a typical SaaS page:
- Overall: 72/100
- Value Prop: 75
- Headline: 68
- CTA: 62
- Structure: 80
- Trust: 70

## Tech Approach

- Frontend: Next.js / React
- Styling: Tailwind
- Page fetch: serverless proxy or simple fetch
- No database
- Deploy on Vercel

## Portfolio Framing

**Title:** Landing Page Grader with Instant Feedback Report
**Description:** A lightweight audit tool that analyzes a landing page URL and returns a structured, score-based report on messaging, CTA clarity, and page effectiveness.