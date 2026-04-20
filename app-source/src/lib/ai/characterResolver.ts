import type { CharacterResolveResult } from "@/lib/types/story";

const KNOWN_CHARACTERS: Record<string, { facts: Record<string, string>; source: string }> = {
  batman: {
    facts: {
      alias: "Bruce Wayne",
      city: "Gotham City",
      role: "Vigilante Detective",
    },
    source: "DC Comics public canon",
  },
};

export async function resolveCharacterName(name: string): Promise<CharacterResolveResult> {
  const normalized = name.trim().toLowerCase();
  const found = KNOWN_CHARACTERS[normalized];

  if (found) {
    return {
      status: "verified",
      name,
      facts: found.facts,
      source: found.source,
    };
  }

  return {
    status: "new_character",
    name,
    prompt: `New Character detected: "${name}". Provide bio, role, eye color, and core motivation.`,
  };
}
