"use client";

import { useEffect, useState } from "react";
import { TerminalChat } from "@/components/chat/TerminalChat";
import { CharacterNexusPanel } from "@/components/sidebar/CharacterNexusPanel";
import { ChapterTree } from "@/components/sidebar/ChapterTree";
import { CoverArtTab } from "@/components/image-lab/CoverArtTab";
import { FlipBookCanvas } from "@/components/preview/FlipBookCanvas";
import { ExportPanel } from "@/components/export/ExportPanel";
import { TopBar } from "@/components/layout/TopBar";
import { CollapsibleSection } from "@/components/layout/CollapsibleSection";
import { LoreVaultPanel } from "@/components/sidebar/LoreVaultPanel";

type ProjectPayload = {
  title?: string;
  chapters: { id: string; chapterNo: number; title: string; beatSummary: string }[];
  characters: { id: string; name: string; bio: string; eyeColor: string | null; verified: boolean }[];
};

export function StudioShell() {
  const [project, setProject] = useState<ProjectPayload>({ chapters: [], characters: [] });
  const [storyText, setStoryText] = useState("");
  const [saveLabel, setSaveLabel] = useState("Auto-saving…");

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
        title: typeof data.title === "string" ? data.title : undefined,
        chapters: Array.isArray(data.chapters) ? data.chapters : [],
        characters: Array.isArray(data.characters) ? data.characters : [],
      });
      setStoryText((data.chapters ?? []).map((ch) => `${ch.title}\n${ch.beatSummary}`).join("\n\n"));
      setSaveLabel("Saved just now");
    } catch (error) {
      console.error("Unable to refresh project state.", error);
      setProject({ chapters: [], characters: [] });
      setStoryText("");
      setSaveLabel("Save failed — working offline");
    }
  }

  useEffect(() => {
    void refreshProject();
  }, []);

  const projectTitle = project.title?.trim() || "Untitled Obsidian Story";

  return (
    <div className="app-shell">
      <TopBar
        projectTitle={projectTitle}
        storyStatus="Draft"
        saveLabel={saveLabel}
        onSyncPreview={() => void refreshProject()}
      />

      <div className="studio-main">
        <aside className="left-sidebar" aria-label="Project management">
          <div>
            <p className="sidebar-heading">Studio</p>
            <h2 className="panel-title">Project Atlas</h2>
            <p className="panel-sub">Structured manuscript, cast, lore, and assets in one glass panel.</p>
          </div>

          <CollapsibleSection title="Chapters" badge={`${project.chapters.length}`} defaultOpen>
            <ChapterTree chapters={project.chapters} />
          </CollapsibleSection>

          <CollapsibleSection title="Character Nexus" badge={`${project.characters.length}`} defaultOpen>
            <CharacterNexusPanel characters={project.characters} />
          </CollapsibleSection>

          <CollapsibleSection title="World-building Lore" defaultOpen={false}>
            <LoreVaultPanel />
          </CollapsibleSection>

          <CollapsibleSection title="Image Lab" defaultOpen={false}>
            <CoverArtTab />
          </CollapsibleSection>

          <CollapsibleSection title="Assets" defaultOpen={false}>
            <div className="asset-placeholder">
              Drop cover art, moodboards, and chapter illustrations here. Wire to storage in Phase 2.
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Publishing" defaultOpen={false}>
            <div className="mini-list">
              <div className="lore-item">
                <span className="muted">Metadata, ISBN placeholder, and copyright page move here for export presets.</span>
              </div>
            </div>
          </CollapsibleSection>
        </aside>

        <section className="center-workspace" aria-label="AI writing workspace">
          <TerminalChat
            onStoryUpdate={(hint) => setStoryText((prev) => `${prev}\n\n${hint}`)}
            onChaptersGenerated={() => void refreshProject()}
          />
          <ExportPanel />
        </section>

        <aside className="right-preview" aria-label="Book preview">
          <FlipBookCanvas storyText={storyText} chapterCount={project.chapters.length} />
        </aside>
      </div>

      <footer className="bottom-bar">
        <span>AI Storyboarding &amp; Publishing Suite · Modern Obsidian</span>
        <div className="bottom-bar__actions">
          <span className="muted">Playfair Display · book preview</span>
          <span className="muted">Inter · interface</span>
        </div>
      </footer>
    </div>
  );
}
