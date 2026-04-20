"use client";

export function ExportPanel() {
  return (
    <section className="export-suite">
      <div>
        <p className="sidebar-heading">Publishing</p>
        <h3 className="panel-title" style={{ marginBottom: 4 }}>
          Export Suite
        </h3>
        <p className="panel-sub">Print-ready PDF, interactive EPUB-style bundle, and validation before release.</p>
      </div>

      <div className="export-grid">
        <div className="export-card">
          <h4>Manuscript metadata</h4>
          <label htmlFor="export-title">Title</label>
          <input id="export-title" defaultValue="Untitled Obsidian Story" readOnly />
          <label htmlFor="export-author" style={{ marginTop: 8 }}>
            Author
          </label>
          <input id="export-author" placeholder="Your name" />
          <label htmlFor="export-genre" style={{ marginTop: 8 }}>
            Genre
          </label>
          <input id="export-genre" placeholder="Epic fantasy · noir · literary" />
        </div>
        <div className="export-card">
          <h4>Output presets</h4>
          <p className="muted" style={{ marginTop: 0 }}>
            Choose how the book leaves the studio. Interactive animation toggles ship with the Next.js exporter.
          </p>
          <ul className="muted" style={{ paddingLeft: 18, margin: "8px 0" }}>
            <li>Print-ready PDF</li>
            <li>Digital reader PDF</li>
            <li>EPUB-style interactive bundle</li>
          </ul>
          <p className="muted">Validation: cover art optional · TOC recommended · images embedded when available.</p>
        </div>
      </div>

      <div className="export-actions">
        <a href="/api/export/pdf" target="_blank" rel="noreferrer">
          Export PDF
        </a>
        <a href="/api/export/ebook" target="_blank" rel="noreferrer">
          Export Interactive E-Book
        </a>
        <span className="muted" style={{ alignSelf: "center" }}>
          Est. pages scale with chapter drafts · file size depends on assets
        </span>
      </div>
    </section>
  );
}
