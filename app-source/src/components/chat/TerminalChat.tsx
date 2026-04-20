"use client";

import { FormEvent, useState } from "react";

type ChatEntry = { role: "user" | "assistant"; content: string };

export function TerminalChat(props: { onStoryUpdate: (storyHint: string) => void; onChaptersGenerated: () => void }) {
  const [input, setInput] = useState("");
  const [log, setLog] = useState<ChatEntry[]>([
    { role: "assistant", content: "Obsidian terminal online. Use /expand or /character commands." },
  ]);

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

  return (
    <div className="terminal-shell">
      <div className="terminal-log">
        {log.map((entry, idx) => (
          <div key={`${entry.role}-${idx}`} className={`line ${entry.role}`}>
            <span>{entry.role === "user" ? "writer@obsidian $" : "suite@obsidian >"}</span> {entry.content}
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="terminal-form">
        <span>&gt;</span>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type /expand or /character ..." />
      </form>
    </div>
  );
}
