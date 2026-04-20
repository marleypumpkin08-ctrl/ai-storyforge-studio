import { describe, expect, test } from "vitest";
import { buildStoryPdf } from "@/lib/export/pdfExporter";

describe("pdf exporter", () => {
  test("generates non-empty binary payload", () => {
    const result = buildStoryPdf({
      title: "Test Story",
      chapters: [{ title: "Chapter 1", content: "The story begins." }],
    });
    expect(result.byteLength).toBeGreaterThan(200);
  });
});
