import { describe, expect, test } from "vitest";
import { resolveCharacterName } from "@/lib/ai/characterResolver";

describe("character resolver", () => {
  test("returns verified for known lore names", async () => {
    const result = await resolveCharacterName("Batman");
    expect(result.status).toBe("verified");
  });

  test("returns onboarding prompt for custom character", async () => {
    const result = await resolveCharacterName("Kenshin the Shadow");
    expect(result.status).toBe("new_character");
  });
});
