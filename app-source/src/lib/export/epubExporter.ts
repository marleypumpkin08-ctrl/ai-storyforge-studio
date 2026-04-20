import JSZip from "jszip";

export async function buildInteractiveEbook(params: {
  title: string;
  chapters: { title: string; content: string }[];
}) {
  const zip = new JSZip();
  zip.file("mimetype", "application/epub+zip");
  zip.file(
    "index.html",
    `<!doctype html><html><head><meta charset="utf-8"><title>${params.title}</title></head><body>${params.chapters
      .map((ch) => `<section><h2>${ch.title}</h2><p>${ch.content || "(Draft pending)"}</p></section>`)
      .join("")}</body></html>`,
  );
  zip.file(
    "style.css",
    "body{font-family:Georgia,serif;background:#121212;color:#f4f1e9;padding:2rem;}h2{color:#d4af37;}",
  );
  return zip.generateAsync({ type: "uint8array" });
}
