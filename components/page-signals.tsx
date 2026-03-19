import type { AnalysisResult } from "@/lib/types";

interface PageSignalsProps {
  result: AnalysisResult;
}

export function PageSignals({ result }: PageSignalsProps) {
  const signals = [
    { label: "Title", value: result.snapshot.title || "Not detected" },
    { label: "H1", value: result.snapshot.h1 || "Not detected" },
    { label: "Meta description", value: result.snapshot.metaDescription || "Not detected" },
    { label: "Headings", value: String(result.snapshot.headingCount) },
    { label: "CTAs found", value: String(result.snapshot.ctaCount) },
    { label: "Word count", value: String(result.snapshot.wordCount) }
  ];

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-slate-400">
        Page signals
      </h3>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-3">
        {signals.map((signal) => (
          <div key={signal.label}>
            <div className="text-xs text-slate-400">{signal.label}</div>
            <p
              className={`mt-1 text-sm text-slate-700 ${
                signal.label === "Meta description" ? "line-clamp-2" : "truncate"
              }`}
            >
              {signal.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
