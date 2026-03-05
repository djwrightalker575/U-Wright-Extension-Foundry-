import { useMemo, useState } from "react";
import { BLOCK_DEFINITIONS } from "../../domain/workflow";

type LeftPaletteProps = {
  onAddBlock: (blockType: string) => void;
};

export function LeftPalette({ onAddBlock }: LeftPaletteProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return BLOCK_DEFINITIONS;
    }

    return BLOCK_DEFINITIONS.filter((block) => {
      const terms = [block.title, block.type, block.category, block.description ?? ""];
      return terms.some((term) => term.toLowerCase().includes(normalized));
    });
  }, [query]);

  return (
    <aside style={{ width: 280, borderRight: "1px solid #ddd", padding: 12 }}>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search blocks..."
        style={{ width: "100%", marginBottom: 12 }}
      />

      <div style={{ display: "grid", gap: 8 }}>
        {filtered.map((block) => (
          <button
            key={block.type}
            type="button"
            onClick={() => onAddBlock(block.type)}
            style={{ textAlign: "left", padding: 8 }}
          >
            <strong>{block.title}</strong>
            <div style={{ fontSize: 12, opacity: 0.7 }}>{block.category}</div>
          </button>
        ))}
      </div>
    </aside>
  );
}
