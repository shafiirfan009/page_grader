# Landing Page Grader

Landing Page Grader is a Next.js 14 app that fetches a URL, parses the HTML on the server, and returns structured heuristic feedback for conversion-oriented landing pages.

## Stack

- Next.js 14 App Router
- TypeScript strict mode
- Tailwind CSS
- cheerio

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000` and submit a landing page URL.

## Core Files

- `app/api/fetch-page/route.ts`
- `lib/extractor.ts`
- `lib/scorer.ts`
- `lib/feedback.ts`
- `hooks/usePageAnalyzer.ts`
- `components/landing-page-grader.tsx`
