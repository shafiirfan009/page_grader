# CONVENTIONS.md — Code Style & Naming Rules

## Language & Framework

- TypeScript strict mode (`strict: true` in tsconfig)
- Next.js 14 App Router
- Tailwind CSS — no separate CSS files, no CSS modules
- React functional components with hooks only

## File Naming

- Components: `PascalCase.tsx` (e.g., `CategoryCard.tsx`, `OverallScore.tsx`)
- Hooks: `camelCase.ts` prefixed with `use` (e.g., `usePageAnalyzer.ts`)
- Utilities: `camelCase.ts` (e.g., `scorer.ts`, `extractor.ts`, `feedback.ts`)
- API routes: `route.ts` inside folder (Next.js convention)
- Types: `types.ts` for shared interfaces

## Component Rules

- One component per file
- Export component as `default export`
- Props interface defined in same file, named `{ComponentName}Props`
- Use `'use client'` directive only on components that need interactivity
- Keep components focused — if exceeding 150 lines, split

## State Management

- `useState` for UI state (URL input, current view)
- State machine pattern for analyzer flow: `idle → loading → results | error`
- All state lives in `usePageAnalyzer` hook
- No external state libraries

## Styling

- Tailwind utility classes only
- Responsive prefixes: `md:` for tablet, `lg:` for desktop
- Color tokens:
  - Dark slate: `slate-900` or `#0F172A`
  - Blue: `blue-500` / `#3B82F6`
  - White: `white`
  - Green: `green-500` / `#22C55E`
  - Amber: `amber-500` / `#F59E0B`
  - Red: `red-500` / `#EF4444`
  - Text grays: `slate-800`, `slate-500`, `slate-400`
- Cards: `rounded-xl`, `shadow-sm` or `shadow-md`, `p-6` padding
- Score bars: use width percentage with colored backgrounds

## Score Color Logic

```typescript
function getScoreColor(score: number): 'green' | 'yellow' | 'red' {
  if (score >= 75) return 'green';
  if (score >= 60) return 'yellow';
  return 'red';
}
```

Map to Tailwind classes:
- `green` → `bg-green-500`, `text-green-500`
- `yellow` → `bg-amber-500`, `text-amber-500`
- `red` → `bg-red-500`, `text-red-500`

## API Route Conventions

- `/api/fetch-page/route.ts` handles POST requests only
- Validate input: URL must be a string with a valid format
- Set timeout: 10 seconds for external fetch
- Return structured JSON, never raw HTML to the client
- Use `cheerio` for server-side HTML parsing
- Handle errors gracefully: return `{ error: string }` with appropriate status codes

## Separation of Concerns

- `extractor.ts` — Takes raw HTML string, returns `PageData` object. No scoring logic here.
- `scorer.ts` — Takes `PageData`, returns scores for all 5 categories. Pure functions only.
- `feedback.ts` — Takes category scores, returns feedback text and suggestions. Template-based.
- These three files should be independently testable.

## TypeScript

- Define all shared types in `src/lib/types.ts`
- Use `interface` for data shapes, `type` for unions
- No `any` — use `unknown` then narrow
- All scoring functions must have explicit return types

## Import Order

1. React / Next.js
2. Third-party libraries (cheerio, etc.)
3. Local components
4. Local hooks
5. Local utilities / types

## Comments

- No comments explaining obvious code
- Comments for: heuristic rationale, score threshold explanations, non-obvious parsing decisions
- JSDoc on all exported functions in `lib/`

## Git

- Commit messages: imperative mood, lowercase, no period
  - ✅ `add heuristic scoring for CTA effectiveness`
  - ✅ `fix heading extraction for pages with no h1`
  - ❌ `Updated scorer`
- One logical change per commit
- Branch: work on `main`