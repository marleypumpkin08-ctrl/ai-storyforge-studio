"use client";

type Chapter = { id: string; chapterNo: number; title: string; beatSummary: string };

export function ChapterTree({ chapters }: { chapters: Chapter[] }) {
  return (
    <section className="panel-card">
      <h3>Chapters</h3>
      <ul className="stack-list">
        {chapters.map((ch) => (
          <li key={ch.id}>
            <strong>{ch.chapterNo}. {ch.title}</strong>
            <p>{ch.beatSummary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
