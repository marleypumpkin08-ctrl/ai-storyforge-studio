"use client";

import { useEffect, useState } from "react";
import { TerminalChat } from "@/components/chat/TerminalChat";
import { CharacterNexusPanel } from "@/components/sidebar/CharacterNexusPanel";
import { ChapterTree } from "@/components/sidebar/ChapterTree";
import { CoverArtTab } from "@/components/image-lab/CoverArtTab";
import { FlipBookCanvas } from "@/components/preview/FlipBookCanvas";
import { ExportPanel } from "@/components/export/ExportPanel";

type ProjectPayload = {
  chapters: { id: string; chapterNo: number; title: string; beatSummary: string }[];
  characters: { id: string; name: string; bio: string; eyeColor: string | null; verified: boolean }[];
};

export function StudioShell() {
  const [project, setProject] = useState<ProjectPayload>({ chapters: [], characters: [] });
  const [storyText, setStoryText] = useState("");

  async function refreshProject() {
    try {
      const res = await fetch("/api/projects", { cache: "no-store" });
      const raw = await res.text();
      if (!res.ok) {
        throw new Error(`Project fetch failed (${res.status}) ${raw}`);
      }
      if (!raw.trim()) {
        throw new Error("Project fetch returned an empty response body.");
      }

      const data = JSON.parse(raw) as ProjectPayload;
      setProject({
        chapters: Array.isArray(data.chapters) ? data.chapters : [],
        characters: Array.isArray(data.characters) ? data.characters : [],
      });
      setStoryText((data.chapters ?? []).map((ch) => `${ch.title}\n${ch.beatSummary}`).join("\n\n"));
    } catch (error) {
      console.error("Unable to refresh project state.", error);
      setProject({ chapters: [], characters: [] });
      setStoryText("");
    }
  }

  useEffect(() => {
    void refreshProject();
  }, []);

  return (
    <main className="studio-grid">
      <aside className="left-sidebar">
        <h2>Project Atlas</h2>
        <ChapterTree chapters={project.chapters} />
        <CharacterNexusPanel characters={project.characters} />
        <CoverArtTab />
      </aside>

      <section className="center-workspace">
        <h1>AI Storyboarding Suite</h1>
        <TerminalChat
          onStoryUpdate={(hint) => setStoryText((prev) => `${prev}\n\n${hint}`)}
          onChaptersGenerated={() => void refreshProject()}
        />
        <ExportPanel />
      </section>

      <aside className="right-preview">
        <FlipBookCanvas storyText={storyText} />
      </aside>
    </main>
  );
}
