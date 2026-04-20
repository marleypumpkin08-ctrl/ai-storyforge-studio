import { jsPDF } from "jspdf";

export function buildStoryPdf(params: { title: string; chapters: { title: string; content: string }[] }) {
  const doc = new jsPDF();
  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.text(params.title, 20, 24);
  doc.setFontSize(12);

  let y = 40;
  for (const chapter of params.chapters) {
    if (y > 250) {
      doc.addPage();
      y = 24;
    }
    doc.setFont("times", "bold");
    doc.text(chapter.title, 20, y);
    y += 8;
    doc.setFont("times", "normal");
    const lines = doc.splitTextToSize(chapter.content || "(Draft pending)", 170);
    doc.text(lines, 20, y);
    y += lines.length * 6 + 8;
  }

  return doc.output("arraybuffer");
}
