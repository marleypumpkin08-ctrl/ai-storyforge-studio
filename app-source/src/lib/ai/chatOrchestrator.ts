import { resolveCharacterName } from "@/lib/ai/characterResolver";
import { expandSummaryToChapters } from "@/lib/ai/chapterArchitect";

export async function orchestrateChat(input: string) {
  const text = input.trim();
  const lower = text.toLowerCase();

  if (lower.startsWith("/expand ")) {
    const summary = text.replace(/^\/expand\s+/i, "");
    return {
      mode: "chapter_outline" as const,
      data: expandSummaryToChapters(summary),
      response: "Generated a 10-chapter architecture from your summary.",
    };
  }

  if (lower.startsWith("/character ")) {
    const name = text.replace(/^\/character\s+/i, "");
    const resolved = await resolveCharacterName(name);
    return {
      mode: "character" as const,
      data: resolved,
      response:
        resolved.status === "verified"
          ? `${resolved.name} verified. Canon facts imported into Character Nexus.`
          : resolved.prompt,
    };
  }

  return {
    mode: "assistant" as const,
    data: null,
    response:
      "Command terminal ready. Try /expand <summary> for chapter architecture or /character <name> for hybrid lore lookup.",
  };
}
