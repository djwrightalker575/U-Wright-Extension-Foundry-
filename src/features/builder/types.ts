import { Edge, Node } from "reactflow";

export type BuilderNodeData = {
  label: string;
  blockType: string;
  values: Record<string, unknown>;
};

export type BuilderNode = Node<BuilderNodeData>;
export type BuilderEdge = Edge;
