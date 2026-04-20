import { NextResponse } from "next/server";
import { getOrCreateDefaultProject } from "@/lib/repositories/storyRepository";
import { buildInteractiveEbook } from "@/lib/export/epubExporter";

export async function GET() {
  const project = await getOrCreateDefaultProject();
  const binary = await buildInteractiveEbook({
    title: project.title,
    chapters: project.chapters.map((ch) => ({ title: `Chapter ${ch.chapterNo}: ${ch.title}`, content: ch.content || ch.beatSummary })),
  });
  return new NextResponse(Buffer.from(binary), {
    headers: {
      "Content-Type": "application/epub+zip",
      "Content-Disposition": 'attachment; filename="story.epub.zip"',
    },
  });
}
