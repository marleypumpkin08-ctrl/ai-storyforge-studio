"use client";

type Chapter = { id: string; chapterNo: number; title: string; beatSummary: string };

function estimateWords(text: string) {
  return Math.max(12, Math.round(text.split(/\s+/).filter(Boolean).length * 1.15));
}

export function ChapterTree({ chapters }: { chapters: Chapter[] }) {
  if (!chapters.length) {
    return (
      <div className="empty-hint">
        No chapters yet. Run <code style={{ color: "var(--accent-cyan)" }}>/expand</code> in chat to generate a 10-chapter architecture.
      </div>
    );
  }

  return (
    <div>
      {chapters.map((ch) => {
        const words = estimateWords(ch.beatSummary);
        return (
          <div key={ch.id} className="chapter-row">
            <div className="chapter-row__no">{String(ch.chapterNo).padStart(2, "0")}</div>
            <div>
              <div className="chapter-row__title">{ch.title}</div>
              <p className="chapter-row__meta">
                {words} words · Beat scaffold · Notes ready
              </p>
            </div>
            <div className="chapter-row__icons" aria-label="Chapter status">
              <span className="pip pip--draft" title="Draft" />
              <span className="pip" title="Review" />
              <span className="pip" title="Approved" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
