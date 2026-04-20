import { NextResponse } from "next/server";
import { resolveCharacterName } from "@/lib/ai/characterResolver";

export async function POST(req: Request) {
  const body = (await req.json()) as { name?: string };
  if (!body.name) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }
  const result = await resolveCharacterName(body.name);
  return NextResponse.json(result);
}
