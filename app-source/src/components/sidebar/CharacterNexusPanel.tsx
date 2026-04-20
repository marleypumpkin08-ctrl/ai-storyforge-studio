"use client";

import { useEffect, useMemo, useState } from "react";

type Character = { id: string; name: string; bio: string; eyeColor: string | null; verified: boolean };

const INSPECTOR_TABS = ["Overview", "Appearance", "Personality", "Relationships", "Memory"];

export function CharacterNexusPanel({ characters }: { characters: Character[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(characters[0]?.id ?? null);
  const [inspectorTab, setInspectorTab] = useState("Overview");

  const active = useMemo(() => characters.find((c) => c.id === selectedId) ?? null, [characters, selectedId]);

  useEffect(() => {
    if (!characters.length) {
      setSelectedId(null);
      return;
    }
    if (!selectedId || !characters.some((c) => c.id === selectedId)) {
      setSelectedId(characters[0].id);
    }
  }, [characters, selectedId]);

  if (!characters.length) {
    return (
      <div className="empty-hint">
        No characters yet. Run <code style={{ color: "var(--accent-cyan)" }}>/character</code> to verify lore or onboard a new cast member.
      </div>
    );
  }

  return (
    <div className="nexus-split">
      <div>
        <p className="muted" style={{ margin: "0 0 8px" }}>
          Cast roster
        </p>
        <div className="char-list" role="list">
          {characters.map((char) => (
            <button
              key={char.id}
              type="button"
              className="char-card-mini"
              data-active={selectedId === char.id}
              onClick={() => setSelectedId(char.id)}
              role="listitem"
            >
              <div className="char-card-mini__thumb" aria-hidden />
              <div>
                <div className="char-card-mini__name">{char.name}</div>
                <div className="char-card-mini__role">{char.verified ? "Verified canon" : "Project canon"}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="char-inspector">
        {active ? (
          <>
            <div className="char-inspector__tabs" role="group" aria-label="Character inspector">
              {INSPECTOR_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className="tab-pill"
                  data-active={inspectorTab === tab}
                  onClick={() => setInspectorTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="badge-row">
              {active.verified ? (
                <span className="trait-badge trait-badge--verified">Verified Trait</span>
              ) : (
                <span className="trait-badge">Needs Clarification</span>
              )}
              <span className="trait-badge">Mentioned in live session</span>
            </div>
            <h4 style={{ margin: "4px 0 8px", color: "var(--text-primary)" }}>{active.name}</h4>
            <p className="muted" style={{ margin: 0 }}>
              {inspectorTab === "Overview" && active.bio}
              {inspectorTab === "Appearance" && (
                <>
                  Eye color: <strong style={{ color: "var(--text-secondary)" }}>{active.eyeColor ?? "Unspecified"}</strong>
                  <br />
                  Wardrobe, silhouette, and scars can be expanded in the next data pass.
                </>
              )}
              {inspectorTab === "Personality" && "Motivations, fears, and voice markers will anchor continuity prompts."}
              {inspectorTab === "Relationships" && "Link allies, rivals, and factions once lore graph ships."}
              {inspectorTab === "Memory" && "Canon facts JSON feeds the hybrid search resolver during drafting."}
            </p>
          </>
        ) : (
          <p className="muted">Select a character to inspect continuity.</p>
        )}
      </div>
    </div>
  );
}
