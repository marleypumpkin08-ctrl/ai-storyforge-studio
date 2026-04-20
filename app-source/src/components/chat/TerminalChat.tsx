"use client";

import { FormEvent, useMemo, useState } from "react";

type ChatEntry = { role: "user" | "assistant"; content: string };

type WorkspaceTab = "chat" | "outline" | "draft" | "character" | "image" | "export";

const WORKSPACE_TABS: { id: WorkspaceTab; label: string }[] = [
  { id: "chat", label: "Chat" },
  { id: "outline", label: "Outline" },
  { id: "draft", label: "Draft Editor" },
  { id: "character", label: "Character Nexus" },
  { id: "image", label: "Image Lab" },
  { id: "export", label: "Export" },
];

const COMMAND_CHIPS = [
  "/expand",
  "/character",
  "/verify-name",
  "/generate-cover",
  "/sync-preview",
];

export function TerminalChat(props: { onStoryUpdate: (storyHint: string) => void; onChaptersGenerated: () => void }) {
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("chat");
  const [log, setLog] = useState<ChatEntry[]>([
    {
      role: "assistant",
      content:
        "Hybrid Search terminal online. Try /expand for Chapter Architect or /character for lore verification. Your manuscript memory syncs to Character Nexus.",
    },
  ]);

  const modeLabel = useMemo(() => {
    if (activeTab === "chat") return "Story Assistant";
    if (activeTab === "outline") return "Chapter Architect";
    if (activeTab === "character") return "Character Nexus";
    if (activeTab === "image") return "Cover Art Refiner";
    if (activeTab === "export") return "Export Suite";
    return "Draft Studio";
  }, [activeTab]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const current = input;
    setLog((prev) => [...prev, { role: "user", content: current }]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: current }),
    });
    const data = (await res.json()) as { response?: string; mode?: string };
    const reply = data.response ?? "Command failed.";
    setLog((prev) => [...prev, { role: "assistant", content: reply }]);
    if (data.mode === "chapter_outline") props.onChaptersGenerated();
    props.onStoryUpdate(reply);
  }

  function insertChip(chip: string) {
    setInput((prev) => (prev ? `${prev} ${chip}` : chip));
  }

  return (
    <div>
      <header className="workspace-header">
        <div>
          <p className="sidebar-heading">Center Workspace</p>
          <h2 className="panel-title" style={{ marginBottom: 4 }}>
            Infinite Scroll · Hybrid Search
          </h2>
          <p className="panel-sub">Terminal-grade control with novelist warmth. Commands start with /.</p>
        </div>
        <div className="workspace-meta">
          <span className="pill-quiet">{modeLabel}</span>
          <span className="pill-quiet">API: ready</span>
          <span className="sync-pill">
            <span className="sync-dot" aria-hidden />
            Context memory linked
          </span>
        </div>
      </header>

      <div className="workspace-tabs" role="group" aria-label="Workspace views">
        {WORKSPACE_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className="workspace-tab"
            data-active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "chat" ? (
        <div className="terminal-shell">
          <div className="terminal-log" role="log" aria-live="polite">
            {log.map((entry, idx) => (
              <div
                key={`${entry.role}-${idx}`}
                className={`msg msg--${entry.role}`}
              >
                <span className={`msg__label msg__label--${entry.role === "user" ? "user" : "ai"}`}>
                  {entry.role === "user" ? "You · command" : "Suite · co-writer"}
                </span>
                {entry.content}
              </div>
            ))}
          </div>

          <div className="command-chips" aria-label="Quick commands">
            {COMMAND_CHIPS.map((chip) => (
              <button key={chip} type="button" className="command-chip" onClick={() => insertChip(chip)}>
                {chip}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="terminal-input-dock">
            <label className="sr-only" htmlFor="hybrid-chat-input">
              Hybrid search chat input
            </label>
            <div className="terminal-input-row">
              <span className="prompt-glyph" aria-hidden>
                &gt;
              </span>
              <input
                id="hybrid-chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search lore, run /commands, or describe the next beat…"
                autoComplete="off"
              />
              <button type="submit" className="send-btn">
                Send
              </button>
            </div>
            <p className="muted" style={{ margin: 0 }}>
              Verified lore names surface as canon. Unknown names open the New Character flow.
            </p>
          </form>
        </div>
      ) : (
        <div className="empty-hint">
          <strong style={{ color: "var(--text-secondary)" }}>{WORKSPACE_TABS.find((t) => t.id === activeTab)?.label}</strong>
          <p className="muted" style={{ margin: "8px 0 0" }}>
            This tab is scaffolded for the full manuscript editor, structured outline, and export controls. Keep using Chat for
            now — wiring continues in the next build phase.
          </p>
        </div>
      )}
    </div>
  );
}
