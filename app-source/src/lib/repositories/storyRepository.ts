import { prisma } from "@/lib/db";

export async function getOrCreateDefaultProject() {
  const existing = await prisma.project.findFirst({
    include: { chapters: true, characters: true, generated: true, messages: true },
    orderBy: { createdAt: "asc" },
  });
  if (existing) return existing;

  return prisma.project.create({
    data: { title: "Untitled Obsidian Story", summary: "A neon-lit saga awaits." },
    include: { chapters: true, characters: true, generated: true, messages: true },
  });
}

export async function saveChatMessage(projectId: string, role: string, content: string, metadata = {}) {
  return prisma.message.create({
    data: { projectId, role, content, metadata: JSON.stringify(metadata) },
  });
}

export async function upsertCharacter(
  projectId: string,
  data: { name: string; bio: string; eyeColor?: string; verified?: boolean; facts?: Record<string, string> },
) {
  const existing = await prisma.character.findFirst({ where: { projectId, name: data.name } });
  if (existing) {
    return prisma.character.update({
      where: { id: existing.id },
      data: {
        bio: data.bio,
        eyeColor: data.eyeColor ?? existing.eyeColor,
        verified: data.verified ?? existing.verified,
        factsJson: JSON.stringify(data.facts ?? JSON.parse(existing.factsJson)),
      },
    });
  }

  return prisma.character.create({
    data: {
      projectId,
      name: data.name,
      bio: data.bio,
      eyeColor: data.eyeColor,
      verified: data.verified ?? false,
      factsJson: JSON.stringify(data.facts ?? {}),
    },
  });
}
