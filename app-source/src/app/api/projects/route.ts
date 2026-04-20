import { NextResponse } from "next/server";
import { getOrCreateDefaultProject } from "@/lib/repositories/storyRepository";

export async function GET() {
  try {
    const project = await getOrCreateDefaultProject();
    return NextResponse.json(project);
  } catch (error) {
    console.error("Failed to load project", error);
    return NextResponse.json(
      { error: "Failed to load project data." },
      { status: 500 },
    );
  }
}
