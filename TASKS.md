# TASKS.md — Build Checklist

## Phase 1: Project Setup

- [ ] Initialize Next.js project with TypeScript + Tailwind
- [ ] Configure `tailwind.config.ts` with custom colors (slate, green, amber, red)
- [ ] Set up Inter font in `layout.tsx`
- [ ] Add metadata (title, description, og tags)
- [ ] Install `cheerio` for HTML parsing (`npm install cheerio`)
- [ ] Verify `npm run dev` starts clean

## Phase 2: Types & Data Layer

- [ ] Create `src/lib/types.ts` with all interfaces (`PageData`, `CategoryResult`, `GradeReport`, `AnalyzerState`)
- [ ] Create `src/data/demo-pages.ts` with 3 pre-analyzed demo page results (fallback data)

## Phase 3: API Route — Page Fetching

- [ ] Create `/api/fetch-page/route.ts`
- [ ] Accept POST with `{ url: string }`
- [ ] Validate URL format
- [ ] Fetch URL server-side with 10s timeout and standard User-Agent
- [ ] Parse HTML with cheerio — extract: title, h1, all headings, body text, CTA texts (buttons + links), meta description, word count
- [ ] Return structured `PageData` JSON
- [ ] Handle errors: invalid URL, fetch timeout, parse failure
- [ ] Test with 2–3 real landing pages

## Phase 4: Scoring Engine

- [ ] Create `src/lib/extractor.ts` — if doing client-side extraction from raw HTML (optional, may be handled in API route)
- [ ] Create `src/lib/scorer.ts` with 5 scoring functions:
  - [ ] `scoreValueProposition(data: PageData): number`
  - [ ] `scoreHeadlineStrength(data: PageData): number`
  - [ ] `scoreCTAEffectiveness(data: PageData): number`
  - [ ] `scorePageStructure(data: PageData): number`
  - [ ] `scoreTrustCredibility(data: PageData): number`
- [ ] Add score smoothing: ±3–5 jitter, clamp to 40–90
- [ ] Add overall score: average of 5 categories
- [ ] Create `src/lib/feedback.ts` with tiered feedback templates per category:
  - [ ] High tier (75+): positive observation + minor refinement
  - [ ] Medium tier (60–74): identified issue + improvement suggestion
  - [ ] Low tier (<60): what's missing + clear action step
- [ ] Add summary paragraph generator (top strength + top weakness)
- [ ] Verify with demo page data: scores should feel realistic (not all 80s, not all 50s)

## Phase 5: State Hook

- [ ] Create `src/hooks/usePageAnalyzer.ts`
- [ ] Implement state machine: `idle → loading → results | error`
- [ ] `analyze(url)` function: calls API, runs scoring, builds `GradeReport`
- [ ] `reset()` function: returns to idle state
- [ ] Handle loading, success, and error states cleanly

## Phase 6: Components — Structure First

- [ ] Build `Hero.tsx` — headline + subtext
- [ ] Build `AnalyzerForm.tsx` — URL input + button + validation + disabled state
- [ ] Build `LoadingState.tsx` — analyzing animation with text
- [ ] Build `ProgressBar.tsx` — reusable, color-coded (green/yellow/red), 0–100 width
- [ ] Build `OverallScore.tsx` — big score number + label + subtitle
- [ ] Build `CategoryCard.tsx` — name + score + progress bar + feedback + suggestion
- [ ] Build `SummaryInsight.tsx` — synthesized paragraph
- [ ] Build `ResultsReport.tsx` — parent rendering OverallScore + 5 CategoryCards + SummaryInsight
- [ ] Build `BottomCTA.tsx` — headline + text + button
- [ ] Build `ErrorState.tsx` — error message + "Try again" button
- [ ] Compose all in `page.tsx` using `usePageAnalyzer` state

## Phase 7: Styling & Polish

- [ ] Apply color palette: dark header area, white cards, blue accents
- [ ] Style URL input: clean border, focus ring, proper sizing
- [ ] Style loading state: skeleton animation or pulsing dots
- [ ] Style overall score: large number, circular or badge display, color-coded
- [ ] Style category cards: score bar, clean typography, subtle borders
- [ ] Style progress bars: smooth fill, rounded, color transitions
- [ ] Green for 75+, amber for 60–74, red for <60 — consistent everywhere
- [ ] Style summary insight: slightly distinct background, clean paragraph
- [ ] Responsive check: 375px, 768px, 1024px, 1440px
- [ ] Mobile: stacked cards, full-width input
- [ ] Desktop: centered container (max-w-3xl), comfortable reading width

## Phase 8: Edge Cases & Error Handling

- [ ] Invalid URL: show inline validation error, keep button disabled
- [ ] Fetch failure: show ErrorState with message + retry button
- [ ] Timeout (>10s): show timeout-specific message
- [ ] Page with no H1: handle gracefully (score headline lower, don't crash)
- [ ] Page with minimal content: scores should reflect thin content
- [ ] "Analyze another" button: resets to idle state cleanly
- [ ] Prevent double-clicks on analyze button

## Phase 9: Demo Mode Fallback

- [ ] If real fetch fails, offer to show demo analysis
- [ ] Pre-load 3 demo pages in `demo-pages.ts`:
  - A strong SaaS landing page (overall ~78)
  - A mediocre startup page (overall ~65)
  - A weak/minimal page (overall ~50)
- [ ] Show "Demo" badge when viewing pre-analyzed results

## Phase 10: Final Polish

- [ ] Subtle entrance animations on result cards (fade/slide in)
- [ ] Score numbers animate from 0 to final value
- [ ] Favicon
- [ ] Final copy review — no typos, no placeholder text, no "lorem ipsum"
- [ ] All feedback text feels specific and useful, not generic
- [ ] Lighthouse check: 90+ Performance, 95+ Accessibility

## Phase 11: Deploy

- [ ] Push to GitHub
- [ ] Connect to Vercel
- [ ] Verify serverless function works in production
- [ ] Test with 5 real landing page URLs
- [ ] Test on mobile device
- [ ] Screenshot for portfolio

## Verification Checklist

- [ ] URL input validates correctly
- [ ] Analyze button is disabled until valid URL
- [ ] Loading state appears and feels intentional
- [ ] All 5 categories render with different scores (not identical)
- [ ] Score colors match thresholds (green/yellow/red)
- [ ] Progress bars fill to correct width
- [ ] Feedback text is specific to the analyzed page, not boilerplate
- [ ] Summary insight references actual strengths and weaknesses
- [ ] Error state handles failures gracefully
- [ ] "Analyze another" resets everything
- [ ] Works on mobile, tablet, desktop
- [ ] No console errors