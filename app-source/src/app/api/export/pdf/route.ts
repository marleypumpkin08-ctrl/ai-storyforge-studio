import { NextResponse } from "next/server";
import { getOrCreateDefaultProject } from "@/lib/repositories/storyRepository";
import { buildStoryPdf } from "@/lib/export/pdfExporter";

export async function GET() {
  const project = await getOrCreateDefaultProject();
  const pdfBuffer = buildStoryPdf({
    title: project.title,
    chapters: project.chapters.map((ch) => ({ title: `Chapter ${ch.chapterNo}: ${ch.title}`, content: ch.content || ch.beatSummary })),
  });

  return new NextResponse(Buffer.from(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="story.pdf"',
    },
  });
}
