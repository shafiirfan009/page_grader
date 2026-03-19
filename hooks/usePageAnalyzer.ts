"use client";

import { startTransition, useState } from "react";

import type { AnalysisResult } from "@/lib/types";

const MIN_LOADING_MS = 1500;

type AnalyzerStatus = "idle" | "loading" | "results" | "error";

interface AnalyzerState {
  status: AnalyzerStatus;
  result: AnalysisResult | null;
  error: string | null;
}

const INITIAL_STATE: AnalyzerState = {
  status: "idle",
  result: null,
  error: null
};

export function usePageAnalyzer() {
  const [state, setState] = useState<AnalyzerState>(INITIAL_STATE);

  async function analyze(url: string) {
    const normalizedUrl = url.trim();

    if (!normalizedUrl) {
      setState({
        status: "error",
        result: null,
        error: "Enter a landing page URL to analyze."
      });
      return;
    }

    setState({
      status: "loading",
      result: null,
      error: null
    });

    const minLoadingDelay = new Promise<void>((resolve) => {
      setTimeout(resolve, MIN_LOADING_MS);
    });

    try {
      const response = await fetch("/api/fetch-page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: normalizedUrl })
      });

      const payload = (await response.json()) as AnalysisResult | { error: string };

      if (!response.ok || "error" in payload) {
        throw new Error("error" in payload ? payload.error : "Analysis failed.");
      }

      await minLoadingDelay;

      startTransition(() => {
        setState({
          status: "results",
          result: payload,
          error: null
        });
      });
    } catch (error) {
      await minLoadingDelay;

      setState({
        status: "error",
        result: null,
        error: error instanceof Error ? error.message : "Analysis failed."
      });
    }
  }

  function reset() {
    setState(INITIAL_STATE);
  }

  return {
    ...state,
    analyze,
    reset
  };
}
