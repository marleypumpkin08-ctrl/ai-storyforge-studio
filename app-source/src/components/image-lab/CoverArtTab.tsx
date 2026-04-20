"use client";

import { useState } from "react";

const LAB_TABS = ["Cover Art", "Portraits", "Scenes", "Moodboard", "Prompt Refiner"] as const;

export function CoverArtTab() {
  const [labTab, setLabTab] = useState<(typeof LAB_TABS)[number]>("Cover Art");
  const [title, setTitle] = useState("Obsidian Storyforge");
  const [subtitle, setSubtitle] = useState("Neon Ronin Chronicles");
  const [genre, setGenre] = useState("Dark fantasy");
  const [themes, setThemes] = useState("Sengoku period, dramatic lighting, swordmaster silhouette");
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    const res = await fetch("/api/image/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ themes: `${title}. ${subtitle}. ${genre}. ${themes}` }),
    });
    const data = (await res.json()) as { refinedPrompt: string; imageUrl: string };
    setPrompt(data.refinedPrompt);
    setImageUrl(data.imageUrl);
    setLoading(false);
  }

  return (
    <div className="image-lab">
      <div className="image-lab-tabs" role="group" aria-label="Image lab modes">
        {LAB_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className="workspace-tab"
            data-active={labTab === tab}
            onClick={() => setLabTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {labTab === "Cover Art" ? (
        <div className="image-lab-grid">
          <div>
            <h4 style={{ margin: "0 0 8px", color: "var(--accent-gold)", fontSize: 14 }}>Prompt builder</h4>
            <label className="muted" htmlFor="cover-title">
              Story title
            </label>
            <input id="cover-title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ marginBottom: 8 }} />
            <label className="muted" htmlFor="cover-subtitle">
              Subtitle
            </label>
            <input id="cover-subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} style={{ marginBottom: 8 }} />
            <label className="muted" htmlFor="cover-genre">
              Genre
            </label>
            <input id="cover-genre" value={genre} onChange={(e) => setGenre(e.target.value)} style={{ marginBottom: 8 }} />
            <label className="muted" htmlFor="cover-themes-input">
              Mood &amp; setting tags
            </label>
            <textarea
              id="cover-themes-input"
              value={themes}
              onChange={(e) => setThemes(e.target.value)}
              rows={4}
              placeholder="Era, lighting, palette, key props…"
            />
            <button type="button" className="btn btn--primary" style={{ marginTop: 10, width: "100%" }} onClick={generate} disabled={loading}>
              {loading ? "Refining prompt…" : "Generate refined cover"}
            </button>
          </div>
          <div>
            <h4 style={{ margin: "0 0 8px", color: "var(--accent-gold)", fontSize: 14 }}>Gallery &amp; refinements</h4>
            {!imageUrl && (
              <div className="asset-placeholder" style={{ minHeight: 160, display: "grid", placeItems: "center" }}>
                <span className="muted">No cover yet — generate to populate the grid.</span>
              </div>
            )}
            {prompt && (
              <p className="muted" style={{ marginTop: 0 }}>
                {prompt}
              </p>
            )}
            {imageUrl && <img src={imageUrl} alt="Generated cover art" className="cover-preview" />}
            <div className="export-actions" style={{ marginTop: 10 }}>
              <button type="button" className="btn btn--ghost btn--sm">
                Variation
              </button>
              <button type="button" className="btn btn--ghost btn--sm">
                Set as cover
              </button>
              <button type="button" className="btn btn--ghost btn--sm">
                Add to assets
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-hint">
          <strong style={{ color: "var(--text-secondary)" }}>{labTab}</strong>
          <p className="muted" style={{ margin: "8px 0 0" }}>
            Tab scaffold for portraits, scene comps, and moodboards. Hook to the same image endpoint with different presets next.
          </p>
        </div>
      )}
    </div>
  );
}
