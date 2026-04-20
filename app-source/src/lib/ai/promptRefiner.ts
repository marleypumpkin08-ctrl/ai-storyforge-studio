const BASE_STYLE = "cinematic composition, high-detail painting, dramatic lighting, volumetric fog, sharp focus";

export function refineCoverPrompt(themes: string): string {
  const clean = themes.trim() || "dark fantasy, obsidian palette, neon cyan accents";
  return `Book cover illustration: ${clean}, ${BASE_STYLE}, tasteful gold foil typography space, premium novel cover layout.`;
}
