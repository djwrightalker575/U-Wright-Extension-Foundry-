import { ChangeEvent } from "react";
import { getBlockDefinition } from "../../domain/workflow";
import { BuilderNode } from "./types";

type RightPropertiesPanelProps = {
  selectedNode: BuilderNode | null;
  onUpdateNodeData: (nodeId: string, key: string, value: unknown) => void;
};

export function RightPropertiesPanel({
  selectedNode,
  onUpdateNodeData,
}: RightPropertiesPanelProps) {
  if (!selectedNode) {
    return (
      <aside style={{ width: 320, borderLeft: "1px solid #ddd", padding: 12 }}>
        Select a node to edit properties.
      </aside>
    );
  }

  const definition = getBlockDefinition(selectedNode.data.blockType);

  const handleFieldChange = (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
    onUpdateNodeData(selectedNode.id, key, event.target.value);
  };

  return (
    <aside style={{ width: 320, borderLeft: "1px solid #ddd", padding: 12 }}>
      <h3 style={{ marginTop: 0 }}>{selectedNode.data.label}</h3>
      <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 12 }}>{selectedNode.data.blockType}</div>

      {!definition || definition.inputs.length === 0 ? (
        <div style={{ fontSize: 14, opacity: 0.8 }}>This node has no editable inputs.</div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {definition.inputs.map((input) => (
            <label key={input.id} style={{ display: "grid", gap: 4 }}>
              <span>{input.label}</span>
              <input
                value={String(selectedNode.data.values[input.key] ?? "")}
                onChange={handleFieldChange(input.key)}
              />
            </label>
          ))}
        </div>
      )}
    </aside>
  );
}
