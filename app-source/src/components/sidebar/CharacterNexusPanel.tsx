"use client";

type Character = { id: string; name: string; bio: string; eyeColor: string | null; verified: boolean };

export function CharacterNexusPanel({ characters }: { characters: Character[] }) {
  return (
    <section className="panel-card">
      <h3>Character Nexus</h3>
      <ul className="stack-list">
        {characters.map((char) => (
          <li key={char.id}>
            <strong>{char.name}</strong>
            <p>{char.bio}</p>
            <small>
              {char.verified ? "Verified Lore" : "Custom Canon"} · Eye Color: {char.eyeColor ?? "unknown"}
            </small>
          </li>
        ))}
      </ul>
    </section>
  );
}
