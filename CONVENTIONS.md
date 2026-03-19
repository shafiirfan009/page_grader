# PageGrade Conventions

## Code Style

- Use strict TypeScript types for data that crosses module boundaries
- Keep scoring logic pure and isolated in `lib/scorer.ts`
- Keep parsing logic isolated in `lib/extractor.ts`
- Keep feedback generation template-based and deterministic apart from score jitter

## UI Rules

- Preserve the current light visual language and score color system
- Keep the app single-page unless product scope changes
- Avoid adding persistence, auth, or AI dependencies without changing the brief

## Naming

- Prefer descriptive names over abbreviations
- Keep exported module APIs small and explicit
- Use `PageData`, `CategoryScore`, and `AnalysisResult` as the canonical domain types
