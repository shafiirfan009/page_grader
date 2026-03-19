"use client";

import { useState } from "react";

import { CategoryCard } from "@/components/category-card";
import { PageSignals } from "@/components/page-signals";
import { ScorePill } from "@/components/score-pill";
import { usePageAnalyzer } from "@/hooks/usePageAnalyzer";

function LoadingPanel() {
  return (
    <div className="rounded-[28px] border border-white/40 bg-white/80 p-6 shadow-panel backdrop-blur">
      <p className="text-lg font-medium text-slate-700">Analyzing your page...</p>
      <p className="mt-1 text-sm text-slate-400">
        Reviewing messaging, structure, and CTA clarity
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6">
          <div className="h-3 w-28 rounded-full bg-slate-200" />
          <div className="mt-5 h-16 w-24 rounded-2xl bg-[linear-gradient(90deg,#e2e8f0_25%,#f8fafc_50%,#e2e8f0_75%)] bg-[length:200%_100%] animate-shimmer" />
          <div className="mt-4 h-8 w-36 rounded-full bg-[linear-gradient(90deg,#e2e8f0_25%,#f8fafc_50%,#e2e8f0_75%)] bg-[length:200%_100%] animate-shimmer" />
          <div className="mt-3 h-4 w-full rounded-full bg-slate-100" />
        </div>
        <div className="rounded-[28px] border border-slate-200 bg-white p-6">
          <div className="h-3 w-24 rounded-full bg-slate-200" />
          <div className="mt-4 space-y-3">
            <div className="h-14 rounded-xl bg-[linear-gradient(90deg,#e2e8f0_25%,#f8fafc_50%,#e2e8f0_75%)] bg-[length:200%_100%] animate-shimmer" />
            <div className="h-14 rounded-xl bg-[linear-gradient(90deg,#e2e8f0_25%,#f8fafc_50%,#e2e8f0_75%)] bg-[length:200%_100%] animate-shimmer" />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="h-56 rounded-[28px] bg-[linear-gradient(90deg,#e2e8f0_25%,#f8fafc_50%,#e2e8f0_75%)] bg-[length:200%_100%] animate-shimmer" />
        <div className="h-56 rounded-[28px] bg-[linear-gradient(90deg,#e2e8f0_25%,#f8fafc_50%,#e2e8f0_75%)] bg-[length:200%_100%] animate-shimmer" />
        <div className="h-56 rounded-[28px] bg-[linear-gradient(90deg,#e2e8f0_25%,#f8fafc_50%,#e2e8f0_75%)] bg-[length:200%_100%] animate-shimmer" />
        <div className="h-56 rounded-[28px] bg-[linear-gradient(90deg,#e2e8f0_25%,#f8fafc_50%,#e2e8f0_75%)] bg-[length:200%_100%] animate-shimmer" />
        <div className="h-48 rounded-[28px] bg-[linear-gradient(90deg,#e2e8f0_25%,#f8fafc_50%,#e2e8f0_75%)] bg-[length:200%_100%] animate-shimmer md:col-span-2" />
      </div>
    </div>
  );
}

function isCriticalWarning(warning: string) {
  return /no h1/i.test(warning);
}

function ResultsCta() {
  return (
    <section
      className="mt-10 rounded-2xl px-6 py-12 md:px-10"
      style={{ backgroundColor: "#0f172a" }}
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold leading-snug text-white md:text-2xl">
            Want a deeper conversion review?
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Get a full audit with prioritized recommendations tailored to your product.
          </p>
        </div>
        <button
          className="min-h-[44px] flex-shrink-0 rounded-lg px-8 py-3 text-sm font-semibold shadow-sm"
          style={{ backgroundColor: "#ffffff", color: "#0f172a" }}
          type="button"
        >
          Book a consult
        </button>
      </div>
    </section>
  );
}

export function LandingPageGrader() {
  const [url, setUrl] = useState("");
  const { analyze, error, reset, result, status } = usePageAnalyzer();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await analyze(url);
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-8 sm:px-8 lg:px-10">
      <section className="relative overflow-hidden rounded-[36px] border border-white/40 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(245,158,11,0.14),transparent_25%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.94))] p-7 shadow-panel sm:p-10">
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-signal/50 to-transparent" />
        <div className="max-w-2xl animate-fade-up">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">PAGEGRADE</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            Get instant feedback on your landing page
          </h1>
          <p className="mt-4 max-w-lg text-lg text-slate-500">
            Paste your URL and see what&apos;s working, what&apos;s weak, and what to fix
            first.
          </p>
        </div>

        <form className="mt-10 animate-fade-up" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-4 shadow-panel sm:flex-row sm:items-center">
            <label className="sr-only" htmlFor="url">
              Landing page URL
            </label>
            <input
              id="url"
              type="url"
              inputMode="url"
              placeholder="https://example.com"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              className="min-h-14 flex-1 rounded-2xl border border-slate-200 bg-cloud px-5 text-base text-ink outline-none ring-0 transition placeholder:text-slate-400 focus:border-signal"
            />
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={status === "loading"}
                className="min-h-14 rounded-2xl bg-ink px-6 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? "Analyzing..." : "Analyze Page"}
              </button>
              {(status === "results" || status === "error") && (
                <button
                  type="button"
                  onClick={() => {
                    setUrl("");
                    reset();
                  }}
                  className="min-h-[44px] rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </form>

        {error && (
          <div className="mt-4 rounded-2xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger">
            {error}
          </div>
        )}
      </section>

      <section className="mt-8 flex-1">
        {status === "loading" && <LoadingPanel />}

        {status === "results" && result && (
          <div className="space-y-6 animate-fade-up">
            <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
              <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-panel">
                <p className="text-xs uppercase tracking-widest text-slate-400">
                  OVERALL GRADE
                </p>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-6xl font-bold text-slate-900">{result.overallScore}</div>
                    <p className="mt-2 truncate text-sm text-slate-400">{result.url}</p>
                  </div>
                  <ScorePill
                    score={result.overallScore}
                    tone={result.overallTone}
                    label={result.overallLabel}
                  />
                </div>
              </article>

              <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-panel">
                <p className="text-xs uppercase tracking-widest text-slate-400">Top issues</p>
                <div className="mt-4 space-y-3">
                  {result.warnings.map((warning) => {
                    const isCritical = isCriticalWarning(warning);

                    return (
                      <div
                        key={warning}
                        className={`flex items-start gap-3 rounded-lg border p-3 ${
                          isCritical
                            ? "border-red-200 bg-red-50"
                            : "border-amber-200 bg-amber-50"
                        }`}
                      >
                        <span
                          className={`mt-0.5 text-sm ${
                            isCritical ? "text-red-500" : "text-amber-500"
                          }`}
                        >
                          ⚠
                        </span>
                        <p className={`text-sm ${isCritical ? "text-red-800" : "text-amber-800"}`}>
                          {warning}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            <section className="grid gap-6 md:grid-cols-2">
              {[...result.scores].sort((a, b) => a.score - b.score).map((score, index, scores) => {
                const feedback = result.feedback.find((entry) => entry.key === score.key);

                if (!feedback) {
                  return null;
                }

                return (
                  <CategoryCard
                    key={score.key}
                    score={score}
                    feedback={feedback}
                    isWorst={index === 0}
                    className={index === scores.length - 1 ? "md:col-span-2" : ""}
                  />
                );
              })}
            </section>

            <PageSignals result={result} />

            <ResultsCta />
          </div>
        )}
      </section>
    </div>
  );
}
