/**
 * GitHub-ready Cloudflare Worker entry (no build required).
 */
export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return Response.json({
        ok: true,
        service: "obsidian-storyforge",
        mode: "github-cloudflare-upload",
      });
    }

    return new Response(
      `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Obsidian Storyforge</title>
  <style>
    body { margin:0; font-family: Inter, system-ui, sans-serif; background:#121212; color:#ececec; }
    main { max-width:900px; margin:32px auto; padding:20px; border:1px solid rgba(45,226,230,.35); border-radius:12px; background:#1c1c1c; }
    h1 { color:#d4af37; }
    code { color:#2de2e6; }
  </style>
</head>
<body>
  <main>
    <h1>Obsidian Storyforge</h1>
    <p>Cloudflare Worker deployed from a GitHub-ready folder.</p>
    <p>Health endpoint: <code>/api/health</code></p>
  </main>
</body>
</html>`,
      { headers: { "content-type": "text/html; charset=utf-8" } },
    );
  },
};
