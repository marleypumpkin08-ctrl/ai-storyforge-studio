"use client";

import { useState } from "react";

export function CoverArtTab() {
  const [themes, setThemes] = useState("Sengoku Period, dramatic lighting, swordmaster silhouette");
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    const res = await fetch("/api/image/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ themes }),
    });
    const data = (await res.json()) as { refinedPrompt: string; imageUrl: string };
    setPrompt(data.refinedPrompt);
    setImageUrl(data.imageUrl);
    setLoading(false);
  }

  return (
    <section className="panel-card">
      <h3>Cover Art Lab</h3>
      <label htmlFor="cover-themes-input">Story themes for prompt refining</label>
      <textarea
        id="cover-themes-input"
        value={themes}
        onChange={(e) => setThemes(e.target.value)}
        rows={3}
        placeholder="Example: Sengoku Period, dramatic lighting, wind-swept armor"
      />
      <button onClick={generate} disabled={loading}>{loading ? "Generating..." : "Refine + Generate"}</button>
      {prompt && <p className="muted">{prompt}</p>}
      {imageUrl && <img src={imageUrl} alt="Generated cover art" className="cover-preview" />}
    </section>
  );
}
