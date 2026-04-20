import { NextResponse } from "next/server";
import { refineCoverPrompt } from "@/lib/ai/promptRefiner";
import { generateCoverImage } from "@/lib/image/providers/stabilityProvider";
import { getOrCreateDefaultProject } from "@/lib/repositories/storyRepository";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const body = (await req.json()) as { themes?: string };
  const refinedPrompt = refineCoverPrompt(body.themes ?? "");
  const imageUrl = await generateCoverImage(refinedPrompt);
  const project = await getOrCreateDefaultProject();

  const asset = await prisma.generatedAsset.create({
    data: {
      projectId: project.id,
      type: "cover",
      prompt: refinedPrompt,
      url: imageUrl,
      selected: false,
    },
  });

  return NextResponse.json({ refinedPrompt, imageUrl, assetId: asset.id });
}
