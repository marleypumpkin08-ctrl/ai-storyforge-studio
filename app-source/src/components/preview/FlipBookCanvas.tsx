"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useState } from "react";
import { paginateStory } from "@/lib/book/paginate";
import { PageMesh } from "@/components/preview/PageMesh";

export function FlipBookCanvas({ storyText }: { storyText: string }) {
  const pages = useMemo(() => paginateStory(storyText), [storyText]);
  const [pageIndex, setPageIndex] = useState(0);
  const [dragProgress, setDragProgress] = useState(0);

  return (
    <section className="preview-wrap">
      <h3>3D Book Preview</h3>
      <div className="flip-controls">
        <button onClick={() => setPageIndex((p) => Math.max(0, p - 1))}>Prev</button>
        <span>Page {pageIndex + 1} / {pages.length}</span>
        <button onClick={() => setPageIndex((p) => Math.min(pages.length - 1, p + 1))}>Next</button>
      </div>
      <label htmlFor="page-flip-progress">Page flip progress</label>
      <input
        id="page-flip-progress"
        type="range"
        min={0}
        max={100}
        title="Adjust page flip progress"
        value={Math.round(dragProgress * 100)}
        onChange={(e) => setDragProgress(Number(e.target.value) / 100)}
      />
      <div className="canvas-shell">
        <Canvas camera={{ position: [0, 0.3, 3.3], fov: 50 }}>
          <ambientLight intensity={0.65} />
          <directionalLight intensity={1.1} position={[1, 2, 3]} />
          <PageMesh text={pages[pageIndex]} dragProgress={dragProgress} />
          <OrbitControls enablePan={false} />
        </Canvas>
      </div>
    </section>
  );
}
