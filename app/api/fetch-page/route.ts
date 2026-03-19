import { NextRequest, NextResponse } from "next/server";

import { extractPageData } from "@/lib/extractor";
import { buildFeedback, buildHighlights } from "@/lib/feedback";
import { scorePage, summarizeOverall } from "@/lib/scorer";
import type { FetchPageRequest } from "@/lib/types";

export const runtime = "nodejs";

function isValidHttpUrl(input: string): boolean {
  try {
    const parsed = new URL(input);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  let payload: FetchPageRequest;

  try {
    payload = (await request.json()) as FetchPageRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  if (!payload.url || !isValidHttpUrl(payload.url)) {
    return NextResponse.json(
      { error: "Enter a valid http or https URL." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(payload.url, {
      headers: {
        "User-Agent": "PageGradeBot/1.0 (+https://pagegrade.local)"
      },
      redirect: "follow",
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Unable to fetch the page (status ${response.status}).` },
        { status: 502 }
      );
    }

    const contentType = response.headers.get("content-type") ?? "";

    if (!contentType.includes("text/html")) {
      return NextResponse.json(
        { error: "The target URL did not return an HTML document." },
        { status: 415 }
      );
    }

    const html = await response.text();
    const pageData = extractPageData(html, payload.url);
    const scores = scorePage(pageData);
    const overall = summarizeOverall(scores);
    const feedback = buildFeedback(scores);
    const details = buildHighlights(pageData, scores);

    return NextResponse.json({
      url: payload.url,
      fetchedAt: new Date().toISOString(),
      overallScore: overall.score,
      overallTone: overall.tone,
      overallLabel: overall.label,
      scores,
      feedback,
      ...details
    });
  } catch {
    return NextResponse.json(
      {
        error: "The page could not be fetched. It may block automated requests or be temporarily unavailable."
      },
      { status: 500 }
    );
  }
}
