"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useState } from "react";
import { paginateStory } from "@/lib/book/paginate";
import { PageMesh } from "@/components/preview/PageMesh";

type FlipBookProps = {
  storyText: string;
  /** When omitted, chapter markers fall back to 0 (e.g. legacy snapshots). */
  chapterCount?: number;
};

export function FlipBookCanvas({ storyText, chapterCount = 0 }: FlipBookProps) {
  const pages = useMemo(() => paginateStory(storyText), [storyText]);
  const [pageIndex, setPageIndex] = useState(0);
  const [dragProgress, setDragProgress] = useState(0);
  const [previewMode, setPreviewMode] = useState("book");
  const [synced, setSynced] = useState(true);

  const progress = pages.length ? Math.round(((pageIndex + 1) / pages.length) * 100) : 0;

  return (
    <section className="preview-wrap">
      <div>
        <p className="sidebar-heading">Live publication preview</p>
        <h3 className="panel-title" style={{ marginBottom: 4 }}>
          3D Obsidian Reader
        </h3>
        <p className="panel-sub">Serif book typography, tactile page motion, cinematic lighting.</p>
      </div>

      <div className="preview-toolbar">
        <div className="preview-toolbar__left">
          <label className="sr-only" htmlFor="preview-mode">
            Preview mode
          </label>
          <select
            id="preview-mode"
            className="preview-select"
            value={previewMode}
            onChange={(e) => setPreviewMode(e.target.value)}
          >
            <option value="book">Book</option>
            <option value="flat">Flat Page</option>
            <option value="cover">Cover Only</option>
            <option value="spread">Spread View</option>
          </select>
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => setSynced((s) => !s)}>
            Sync {synced ? "on" : "off"}
          </button>
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => setPageIndex(0)}>
            Refresh
          </button>
        </div>
        <div className="preview-toolbar__right">
          <span className="preview-hint">Drag corner · orbit · range = curl</span>
        </div>
      </div>

      {!synced && (
        <div className="empty-hint" style={{ borderStyle: "solid", borderColor: "rgba(255, 159, 10, 0.35)" }}>
          Draft changed — sync paused. Toggle Sync to pull the latest manuscript into the book block.
        </div>
      )}

      <div className="flip-controls">
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => setPageIndex((p) => Math.max(0, p - 1))}>
          Prev
        </button>
        <span className="muted">
          Page {pageIndex + 1} / {pages.length}
        </span>
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          onClick={() => setPageIndex((p) => Math.min(pages.length - 1, p + 1))}
        >
          Next
        </button>
      </div>

      <label htmlFor="page-flip-progress" className="muted">
        Page flip progress
      </label>
      <input
        id="page-flip-progress"
        type="range"
        min={0}
        max={100}
        title="Adjust page curl / flip progress"
        value={Math.round(dragProgress * 100)}
        onChange={(e) => setDragProgress(Number(e.target.value) / 100)}
      />

      <div className="canvas-shell" data-preview-mode={previewMode}>
        <Canvas camera={{ position: [0, 0.35, 3.35], fov: 48 }}>
          <ambientLight intensity={0.55} />
          <directionalLight intensity={1.05} position={[1.5, 2.5, 2.8]} />
          <directionalLight intensity={0.35} position={[-2, 1, -1]} color="#d4af37" />
          <PageMesh text={pages[pageIndex]} dragProgress={dragProgress} />
          <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.1} minPolarAngle={Math.PI / 3.2} />
        </Canvas>
      </div>

      <div className="preview-footer">
        <span>
          Chapter markers: <strong style={{ color: "var(--text-secondary)" }}>{chapterCount}</strong>
        </span>
        <span>Reading progress · {progress}%</span>
        <span className="font-book" style={{ color: "var(--text-muted)" }}>
          Playfair Display · book body
        </span>
      </div>
    </section>
  );
}
