/**
 * GitHub-ready Cloudflare Worker entry (no build required).
 * "Full logic" worker version:
 * - terminal-style story chat
 * - character resolver endpoint
 * - chapter architect endpoint
 * - cover prompt/image endpoint
 * - lightweight export endpoints
 */

const KNOWN_CHARACTERS = {
  batman: {
    alias: "Bruce Wayne",
    city: "Gotham City",
    role: "Vigilante Detective",
  },
};

const EXPORT_NAME = "obsidian-storyforge";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function extractCharacterName(input) {
  return input.replace(/^\/character\s+/i, "").trim();
}

function extractSummary(input) {
  return input.replace(/^\/expand\s+/i, "").trim();
}

function buildChapters(summary) {
  const templates = [
    "Inciting Echo",
    "Fractured Oath",
    "Shadows Gather",
    "Allies In Neon",
    "The First Betrayal",
    "Fire Over The Citadel",
    "Revelation At Dusk",
    "Siege Of Memory",
    "The Final Crossing",
    "Dawn Beyond Steel",
  ];
  return templates.map((title, idx) => ({
    chapterNo: idx + 1,
    title,
    beatSummary: `${summary} Chapter ${idx + 1} escalates the conflict and reshapes character stakes.`,
  }));
}

function refineCoverPrompt(themes) {
  const clean = themes?.trim() || "obsidian fantasy, neon cyan accents, dramatic lighting";
  return `Book cover illustration: ${clean}, cinematic composition, high-detail painting, volumetric atmosphere, premium novel cover layout.`;
}

function htmlPage() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Obsidian Storyforge</title>
  <style>
    :root {
      --bg: #121212;
      --surface: #1c1c1c;
      --text: #ececec;
      --cyan: #2de2e6;
      --gold: #d4af37;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
    }
    .grid {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 260px 1fr 340px;
      gap: 12px;
      padding: 12px;
    }
    .panel {
      background: var(--surface);
      border: 1px solid rgba(45,226,230,.28);
      border-radius: 12px;
      padding: 12px;
    }
    h1,h2,h3 { color: var(--gold); margin: 0 0 10px; }
    .muted { opacity: .8; font-size: 14px; }
    .terminal {
      border: 1px solid rgba(45,226,230,.45);
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 10px;
    }
    #log {
      min-height: 250px;
      max-height: 300px;
      overflow: auto;
      padding: 10px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 13px;
    }
    .line { margin-bottom: 8px; }
    .line span { color: var(--cyan); }
    .toolbar, .stack {
      display: grid;
      gap: 8px;
    }
    textarea, input, button {
      width: 100%;
      border-radius: 8px;
      border: 1px solid rgba(236,236,236,.2);
      background: #111;
      color: #eee;
      padding: 10px;
    }
    button { cursor: pointer; color: var(--cyan); }
    ul { margin: 0; padding-left: 16px; }
    a { color: var(--cyan); text-decoration: none; }
    .badge {
      display: inline-block;
      border: 1px solid rgba(212,175,55,.35);
      border-radius: 999px;
      padding: 4px 8px;
      font-size: 12px;
      margin-bottom: 8px;
    }
  </style>
</head>
<body>
  <main class="grid">
    <section class="panel">
      <h2>Project Atlas</h2>
      <div class="badge">Worker Runtime</div>
      <div class="stack">
        <p class="muted">Use terminal commands:</p>
        <ul>
          <li><code>/character Batman</code></li>
          <li><code>/expand one paragraph summary...</code></li>
        </ul>
      </div>
    </section>

    <section class="panel">
      <h1>Obsidian Storyforge</h1>
      <div class="terminal">
        <div id="log"></div>
      </div>
      <div class="toolbar">
        <label for="cmd">Hybrid Search Terminal</label>
        <input id="cmd" placeholder="Type /character or /expand command" />
        <button id="runCmd">Send</button>
      </div>
      <div class="toolbar" style="margin-top:10px">
        <label for="themes">Cover Art Themes</label>
        <textarea id="themes" rows="3" placeholder="Sengoku period, dramatic lighting"></textarea>
        <button id="coverBtn">Refine Cover Prompt</button>
      </div>
    </section>

    <aside class="panel">
      <h3>Preview & Export</h3>
      <p class="muted">Full 3D canvas is omitted in direct-upload mode, but the core APIs are live.</p>
      <div class="stack">
        <a href="/api/export/pdf">Download PDF JSON stub</a>
        <a href="/api/export/ebook">Download Ebook JSON stub</a>
        <a href="/api/health">Health check</a>
      </div>
    </aside>
  </main>
  <script>
    const log = document.getElementById("log");
    const cmdInput = document.getElementById("cmd");
    const runBtn = document.getElementById("runCmd");
    const themesInput = document.getElementById("themes");
    const coverBtn = document.getElementById("coverBtn");

    function append(role, text) {
      const el = document.createElement("div");
      el.className = "line";
      el.innerHTML = "<span>" + role + "</span> " + text;
      log.appendChild(el);
      log.scrollTop = log.scrollHeight;
    }

    append("suite@obsidian >", "Runtime ready.");

    async function runCommand() {
      const value = (cmdInput.value || "").trim();
      if (!value) return;
      append("writer@obsidian $", value);
      cmdInput.value = "";
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ input: value })
      });
      const data = await res.json();
      append("suite@obsidian >", data.response || "No response");
    }

    runBtn.addEventListener("click", runCommand);
    cmdInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") runCommand();
    });

    coverBtn.addEventListener("click", async () => {
      const themes = themesInput.value || "";
      const res = await fetch("/api/image/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ themes })
      });
      const data = await res.json();
      append("suite@obsidian >", "Cover prompt refined: " + data.refinedPrompt);
    });
  </script>
</body>
</html>`;
}

async function handleChat(request) {
  const body = await request.json().catch(() => ({}));
  const input = String(body.input || "").trim();
  if (!input) return json({ error: "input is required" }, 400);

  if (/^\/character\s+/i.test(input)) {
    const name = extractCharacterName(input);
    const facts = KNOWN_CHARACTERS[name.toLowerCase()];
    if (facts) {
      return json({
        mode: "character",
        response: `${name} verified. Canon facts imported.`,
        data: { status: "verified", name, facts },
      });
    }
    return json({
      mode: "character",
      response: `New Character detected: "${name}". Provide bio, role, eye color, and motivation.`,
      data: { status: "new_character", name },
    });
  }

  if (/^\/expand\s+/i.test(input)) {
    const summary = extractSummary(input) || "A mysterious turning point reshapes the hero's path.";
    return json({
      mode: "chapter_outline",
      response: "Generated a 10-chapter architecture.",
      data: buildChapters(summary),
    });
  }

  return json({
    mode: "assistant",
    response: "Try /character <name> or /expand <summary>.",
  });
}

async function handleCharacterResolve(request) {
  const body = await request.json().catch(() => ({}));
  const name = String(body.name || "").trim();
  if (!name) return json({ error: "name is required" }, 400);

  const facts = KNOWN_CHARACTERS[name.toLowerCase()];
  if (facts) {
    return json({ status: "verified", name, facts, source: "local lore map" });
  }

  return json({
    status: "new_character",
    name,
    prompt: `New Character detected: "${name}". Add bio and canon traits.`,
  });
}

async function handleImageGenerate(request) {
  const body = await request.json().catch(() => ({}));
  const themes = String(body.themes || "");
  const refinedPrompt = refineCoverPrompt(themes);
  const fallbackImage = "/assets/c__Users_zakk2_AppData_Roaming_Cursor_User_workspaceStorage_ad66ba9d075ef3d3e3690b010f8eeda0_images_image-4e33e082-fd97-4311-9a6a-2f5ce506258d.png";
  return json({
    refinedPrompt,
    imageUrl: fallbackImage,
  });
}

function handleExportPdf() {
  return json({
    type: "pdf",
    status: "ready",
    filename: `${EXPORT_NAME}.pdf`,
    note: "Direct-upload worker returns JSON export stub. Use your Next.js app for full binary export.",
  });
}

function handleExportEbook() {
  return json({
    type: "ebook",
    status: "ready",
    filename: `${EXPORT_NAME}.epub.zip`,
    note: "Direct-upload worker returns JSON export stub. Use your Next.js app for full binary export.",
  });
}

function handleAsset(pathname) {
  const safeName = pathname.replace(/^\/assets\//, "");
  const allowed = [
    "c__Users_zakk2_AppData_Roaming_Cursor_User_workspaceStorage_ad66ba9d075ef3d3e3690b010f8eeda0_images_image-4e33e082-fd97-4311-9a6a-2f5ce506258d.png",
    "c__Users_zakk2_AppData_Roaming_Cursor_User_workspaceStorage_ad66ba9d075ef3d3e3690b010f8eeda0_images_image-bf341d53-ba0c-440d-9be7-182cfa01e073.png",
  ];
  if (!allowed.includes(safeName)) {
    return new Response("Not Found", { status: 404 });
  }
  return new Response(
    "Asset exists in repository for Cloudflare static upload path.",
    { headers: { "content-type": "text/plain; charset=utf-8" } },
  );
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const { pathname } = url;

    if (pathname === "/api/health") {
      return json({
        ok: true,
        service: "obsidian-storyforge",
        mode: "github-cloudflare-upload-full-logic",
      });
    }
    if (pathname === "/api/chat" && request.method === "POST") return handleChat(request);
    if (pathname === "/api/characters/resolve" && request.method === "POST") {
      return handleCharacterResolve(request);
    }
    if (pathname === "/api/image/generate" && request.method === "POST") {
      return handleImageGenerate(request);
    }
    if (pathname === "/api/export/pdf") return handleExportPdf();
    if (pathname === "/api/export/ebook") return handleExportEbook();
    if (pathname.startsWith("/assets/")) return handleAsset(pathname);

    return new Response(htmlPage(), {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  },
};
