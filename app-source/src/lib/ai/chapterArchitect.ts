import type { ChapterOutline } from "@/lib/types/story";

export function expandSummaryToChapters(summary: string): ChapterOutline[] {
  const seed = summary.trim() || "A mysterious turning point reshapes the hero's path.";
  const templates = [
    "Inciting Echo",
    "Fractured Oath",
    "Shadows Gather",
    "Allies In Neon",
    "The First Betrayal",
    "Fire Over The Citadel",
    "Revelation At Dusk",
    "Siege Of Memory",
    "The Final Crossing",
    "Dawn Beyond Steel",
  ];

  return templates.map((title, index) => ({
    chapterNo: index + 1,
    title,
    beatSummary: `${seed} Chapter ${index + 1} advances the central conflict with escalating stakes and a decisive character shift.`,
  }));
}
