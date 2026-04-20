import { NextResponse } from "next/server";
import { orchestrateChat } from "@/lib/ai/chatOrchestrator";
import { getOrCreateDefaultProject, saveChatMessage, upsertCharacter } from "@/lib/repositories/storyRepository";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const body = (await req.json()) as { input?: string };
  if (!body.input) return NextResponse.json({ error: "input is required" }, { status: 400 });

  const project = await getOrCreateDefaultProject();
  await saveChatMessage(project.id, "user", body.input);
  const result = await orchestrateChat(body.input);
  await saveChatMessage(project.id, "assistant", result.response, { mode: result.mode });

  if (result.mode === "chapter_outline" && Array.isArray(result.data)) {
    await prisma.chapter.deleteMany({ where: { projectId: project.id } });
    await prisma.chapter.createMany({
      data: result.data.map((ch) => ({
        projectId: project.id,
        chapterNo: ch.chapterNo,
        title: ch.title,
        beatSummary: ch.beatSummary,
      })),
    });
  }

  if (result.mode === "character" && result.data?.status === "verified") {
    await upsertCharacter(project.id, {
      name: result.data.name,
      bio: "Imported from canonical lore source.",
      verified: true,
      facts: result.data.facts,
      eyeColor: result.data.facts.eyeColor,
    });
  }

  return NextResponse.json(result);
}
