import { load } from "cheerio";

import type { CtaData, HeadingData, PageData } from "@/lib/types";

const CTA_TAGS = new Set(["a", "button", "input"]);

function normalizeText(input: string): string {
  return input.replace(/\s+/g, " ").trim();
}

function getNodeText(elementText: string, inputValue?: string | null): string {
  return normalizeText(elementText || inputValue || "");
}

export function extractPageData(html: string, url: string): PageData {
  const $ = load(html);
  const title = normalizeText($("title").first().text());
  const metaDescription = normalizeText(
    $('meta[name="description"]').attr("content") ?? ""
  );

  const headings: HeadingData[] = $("h1, h2, h3, h4, h5, h6")
    .map((_, element) => {
      const tagName = element.tagName.toLowerCase();
      const text = normalizeText($(element).text());

      if (!text) {
        return null;
      }

      return {
        level: Number(tagName.slice(1)),
        text
      };
    })
    .get()
    .filter((entry): entry is HeadingData => entry !== null);

  const bodyElements = $("body *").toArray();
  const totalElements = Math.max(bodyElements.length, 1);

  const ctas = bodyElements.reduce<CtaData[]>((entries, element, index) => {
      const tagName = element.tagName.toLowerCase();

      if (!CTA_TAGS.has(tagName)) {
        return entries;
      }

      const node = $(element);
      const type = node.attr("type");
      const isInputButton =
        tagName !== "input" ||
        type === "submit" ||
        type === "button" ||
        type === "reset";

      if (!isInputButton) {
        return entries;
      }

      const text = getNodeText(node.text(), node.attr("value"));

      if (text.length < 2 || text.length > 80) {
        return entries;
      }

      entries.push({
        text,
        tag: tagName,
        href: node.attr("href"),
        position: Number((index / totalElements).toFixed(2))
      });

      return entries;
    }, []);

  const bodyText = normalizeText($("body").text());
  const wordCount = bodyText ? bodyText.split(/\s+/).length : 0;

  return {
    url,
    title,
    metaDescription,
    h1: headings.find((heading) => heading.level === 1)?.text ?? "",
    headings,
    ctas,
    bodyText,
    wordCount
  };
}
