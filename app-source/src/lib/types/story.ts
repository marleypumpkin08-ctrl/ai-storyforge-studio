export type ChapterOutline = {
  chapterNo: number;
  title: string;
  beatSummary: string;
};

export type CharacterResolveResult =
  | {
      status: "verified";
      name: string;
      facts: Record<string, string>;
      source: string;
    }
  | {
      status: "new_character";
      name: string;
      prompt: string;
    };
