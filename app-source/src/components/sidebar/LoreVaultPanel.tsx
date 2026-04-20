"use client";

export function LoreVaultPanel() {
  return (
    <div className="mini-list">
      <div className="lore-item">
        <strong style={{ color: "var(--text-secondary)" }}>Locations</strong>
        <p className="muted" style={{ margin: "6px 0 0" }}>
          Add shrines, citadels, and contested borders. Lore links to chapters automatically in Phase 2.
        </p>
      </div>
      <div className="lore-item">
        <strong style={{ color: "var(--text-secondary)" }}>Factions &amp; Timeline</strong>
        <p className="muted" style={{ margin: "6px 0 0" }}>
          Track clans, treaties, and historical events with tagged entries.
        </p>
      </div>
    </div>
  );
}
