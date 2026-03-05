import { useMemo, useState } from "react";
import { Edge, MarkerType, Node } from "reactflow";
import {
  getBlockDefinition,
  serializeWorkflowGraph,
  deserializeWorkflowGraph,
  WorkflowGraph,
} from "../../domain/workflow";
import { CenterCanvas } from "./CenterCanvas";
import { LeftPalette } from "./LeftPalette";
import { RightPropertiesPanel } from "./RightPropertiesPanel";
import { BuilderEdge, BuilderNode } from "./types";

function toBuilderGraph(graph: WorkflowGraph): { nodes: BuilderNode[]; edges: BuilderEdge[] } {
  const nodes: BuilderNode[] = graph.nodes.map((node) => ({
    id: node.id,
    position: node.position,
    data: {
      label: getBlockDefinition(node.type)?.title ?? node.type,
      blockType: node.type,
      values: node.data,
    },
  }));

  const edges: BuilderEdge[] = graph.edges.map((edge) => ({
    ...edge,
    markerEnd: { type: MarkerType.ArrowClosed },
  }));

  return { nodes, edges };
}

function toDomainGraph(nodes: BuilderNode[], edges: BuilderEdge[]): WorkflowGraph {
  return {
    version: 1,
    nodes: nodes.map((node) => ({
      id: node.id,
      type: node.data.blockType,
      position: node.position,
      data: node.data.values,
    })),
    edges: edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      sourceHandle: edge.sourceHandle ?? "",
      target: edge.target,
      targetHandle: edge.targetHandle ?? "",
    })),
  };
}

const INITIAL_GRAPH: WorkflowGraph = {
  version: 1,
  nodes: [],
  edges: [],
};

export function BuilderEditor() {
  const initial = useMemo(() => toBuilderGraph(INITIAL_GRAPH), []);
  const [nodes, setNodes] = useState<BuilderNode[]>(initial.nodes);
  const [edges, setEdges] = useState<BuilderEdge[]>(initial.edges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const selectedNode =
    nodes.find((node) => node.id === selectedNodeId) ?? null;

  const handleAddBlock = (blockType: string) => {
    const definition = getBlockDefinition(blockType);
    if (!definition) {
      return;
    }

    const node: Node = {
      id: `${blockType}-${Date.now()}`,
      position: { x: 200, y: 100 + nodes.length * 60 },
      data: {
        label: definition.title,
        blockType,
        values: { ...(definition.defaultData ?? {}) },
      },
    };

    setNodes((previous) => [...previous, node]);
  };

  const handleUpdateNodeData = (nodeId: string, key: string, value: unknown) => {
    setNodes((previous) =>
      previous.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                values: {
                  ...node.data.values,
                  [key]: value,
                },
              },
            }
          : node,
      ),
    );
  };

  const handleExport = () => {
    const payload = serializeWorkflowGraph(toDomainGraph(nodes, edges));
    console.info(payload);
  };

  const handleImport = (serialized: string) => {
    const graph = deserializeWorkflowGraph(serialized);
    const next = toBuilderGraph(graph);
    setNodes(next.nodes);
    setEdges(next.edges);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <LeftPalette onAddBlock={handleAddBlock} />
      <CenterCanvas
        nodes={nodes}
        edges={edges}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
        onSelectNode={setSelectedNodeId}
      />
      <RightPropertiesPanel
        selectedNode={selectedNode}
        onUpdateNodeData={handleUpdateNodeData}
      />

      <div style={{ position: "absolute", bottom: 12, left: 300, display: "flex", gap: 8 }}>
        <button type="button" onClick={handleExport}>
          Export graph
        </button>
        <button
          type="button"
          onClick={() => handleImport(serializeWorkflowGraph(toDomainGraph(nodes, edges)))}
        >
          Round-trip import
        </button>
      </div>
    </div>
  );
}
