"use client";

export function ExportPanel() {
  return (
    <section className="panel-card export-panel">
      <h3>Export Suite</h3>
      <div className="row">
        <a href="/api/export/pdf" target="_blank">Download PDF</a>
        <a href="/api/export/ebook" target="_blank">Download Interactive E-Book</a>
      </div>
    </section>
  );
}
